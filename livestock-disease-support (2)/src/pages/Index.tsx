import React, { useMemo, useState } from 'react';
import { Download, Upload, RotateCcw, Undo2, Sparkles } from 'lucide-react';

type Cell = string | number | boolean | null;
type Row = Record<string, Cell>;
type SheetData = { name: string; rows: Row[]; columns: string[] };
type ActionLog = { action: string; columns: string; changed: number; at: string };

declare global { interface Window { XLSX: any } }

const toTitleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase());
const toSentenceCase = (s: string) => s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
const normalizeSpace = (v: string) => v.replace(/\s+/g, ' ').trim();
const isBlank = (v: Cell) => v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

const levenshtein = (a: string, b: string) => {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    const c = a[i - 1] === b[j - 1] ? 0 : 1;
    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + c);
  }
  return dp[m][n];
};

const Index = () => {
  const [fileName, setFileName] = useState('');
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [sheetName, setSheetName] = useState('');
  const [current, setCurrent] = useState<Row[]>([]);
  const [original, setOriginal] = useState<Row[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<Row[][]>([]);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [spellingColumn, setSpellingColumn] = useState('');

  const pushHistory = (rows: Row[]) => setHistory((h) => [...h, JSON.parse(JSON.stringify(rows))]);
  const logAction = (action: string, columnsChanged: string, changed: number) => setLogs((l) => [{ action, columns: columnsChanged, changed, at: new Date().toLocaleString() }, ...l]);

  const loadFile = async (file: File) => {
    const arr = await file.arrayBuffer();
    const wb = window.XLSX.read(arr, { type: 'array' });
    const parsed: SheetData[] = wb.SheetNames.map((name: string) => {
      const ws = wb.Sheets[name];
      const json = window.XLSX.utils.sheet_to_json(ws, { defval: '' });
      const cols = json.length ? Object.keys(json[0]) : [];
      return { name, rows: json, columns: cols };
    });
    setFileName(file.name); setSheets(parsed);
    if (parsed[0]) {
      setSheetName(parsed[0].name); setCurrent(parsed[0].rows); setOriginal(JSON.parse(JSON.stringify(parsed[0].rows))); setColumns(parsed[0].columns);
    }
  };

  const filtered = useMemo(() => current.filter((r) => !search || columns.some((c) => String(r[c] ?? '').toLowerCase().includes(search.toLowerCase()))), [current, search, columns]);

  const removeDuplicates = () => {
    pushHistory(current);
    const seen = new Set<string>();
    let removed = 0;
    const rows = current.filter((r) => {
      const key = JSON.stringify(columns.map((c) => r[c]));
      if (seen.has(key)) { removed++; return false; }
      seen.add(key); return true;
    });
    setCurrent(rows); logAction('Remove duplicates', 'All columns', removed);
  };

  const trimSpaces = () => {
    pushHistory(current); let changed = 0;
    const rows = current.map((r) => {
      const n = { ...r };
      columns.forEach((c) => { if (typeof n[c] === 'string') { const nv = normalizeSpace(String(n[c])); if (nv !== n[c]) changed++; n[c] = nv; } });
      return n;
    });
    setCurrent(rows); logAction('Trim white spaces', 'All text columns', changed);
  };

  const removeBlankRows = () => {
    pushHistory(current);
    const before = current.length;
    const rows = current.filter((r) => columns.some((c) => !isBlank(r[c])));
    setCurrent(rows); logAction('Remove blank rows', 'All columns', before - rows.length);
  };

  const changeCase = (mode: string) => {
    pushHistory(current); let changed = 0;
    const fn = mode === 'lower' ? (s: string) => s.toLowerCase() : mode === 'upper' ? (s: string) => s.toUpperCase() : mode === 'sentence' ? toSentenceCase : toTitleCase;
    const rows = current.map((r) => { const n = { ...r }; columns.forEach((c) => { if (typeof n[c] === 'string') { const nv = fn(String(n[c])); if (nv !== n[c]) changed++; n[c] = nv; } }); return n; });
    setCurrent(rows); logAction(`Change case (${mode})`, 'All text columns', changed);
  };

  const standardiseDates = () => {
    pushHistory(current); let changed = 0;
    const rows = current.map((r) => { const n = { ...r }; columns.forEach((c) => { const v = n[c]; if (typeof v === 'string' && /\d/.test(v)) { const d = new Date(v); if (!Number.isNaN(d.getTime())) { const nv = dateFormat === 'DD/MM/YYYY' ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}` : d.toISOString().slice(0, 10); if (nv !== v) changed++; n[c] = nv; } } }); return n; });
    setCurrent(rows); logAction('Standardise dates', 'Detected date-like columns', changed);
  };

  const spellingSuggestions = useMemo(() => {
    if (!spellingColumn) return [] as any[];
    const values = Array.from(new Set(current.map((r) => String(r[spellingColumn] ?? '').trim()).filter(Boolean)));
    const groups: { canonical: string; variants: string[] }[] = [];
    values.forEach((v) => {
      const norm = v.toLowerCase();
      const existing = groups.find((g) => levenshtein(g.canonical.toLowerCase(), norm) <= Math.max(1, Math.floor(norm.length * 0.22)) || g.canonical.toLowerCase().includes(norm) || norm.includes(g.canonical.toLowerCase()));
      if (existing) existing.variants.push(v);
      else groups.push({ canonical: v, variants: [v] });
    });
    return groups.filter((g) => g.variants.length > 1);
  }, [current, spellingColumn]);

  const applySpelling = (canonical: string, variants: string[]) => {
    pushHistory(current); let changed = 0;
    const s = new Set(variants);
    const rows = current.map((r) => { const n = { ...r }; if (s.has(String(n[spellingColumn] ?? '')) && n[spellingColumn] !== canonical) { n[spellingColumn] = canonical; changed++; } return n; });
    setCurrent(rows); logAction('Fix spelling inconsistencies', spellingColumn, changed);
  };

  const exportFile = (type: 'xlsx' | 'csv') => {
    const ws = window.XLSX.utils.json_to_sheet(current);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName || 'CleanedData');
    window.XLSX.writeFile(wb, `cleaned_${fileName.replace(/\.[^.]+$/, '')}.${type}`);
  };

  return <div className="min-h-screen bg-slate-50 p-4 md:p-6">
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="rounded-xl bg-white p-4 shadow-sm flex flex-wrap gap-3 items-center justify-between"><h1 className="text-xl font-bold">Excel Data Cleaner Pro</h1><div className="text-sm">{fileName || 'No file uploaded'}</div></div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1 rounded-xl bg-white p-4 shadow-sm space-y-2">
          <label className="block text-sm font-semibold">Upload file</label>
          <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} className="w-full text-sm" />
          <button className="w-full rounded bg-slate-900 text-white px-3 py-2 text-sm" onClick={removeDuplicates}>Remove repeated records</button>
          <button className="w-full rounded bg-slate-900 text-white px-3 py-2 text-sm" onClick={trimSpaces}>Fix extra spaces</button>
          <button className="w-full rounded bg-slate-900 text-white px-3 py-2 text-sm" onClick={removeBlankRows}>Remove empty rows</button>
          <div className="grid grid-cols-2 gap-2"><button className="rounded bg-slate-700 text-white px-2 py-1 text-xs" onClick={() => changeCase('lower')}>lowercase</button><button className="rounded bg-slate-700 text-white px-2 py-1 text-xs" onClick={() => changeCase('upper')}>UPPERCASE</button><button className="rounded bg-slate-700 text-white px-2 py-1 text-xs" onClick={() => changeCase('sentence')}>Sentence</button><button className="rounded bg-slate-700 text-white px-2 py-1 text-xs" onClick={() => changeCase('title')}>Proper</button></div>
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className="w-full border rounded p-2 text-sm"><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option></select>
          <button className="w-full rounded bg-indigo-700 text-white px-3 py-2 text-sm" onClick={standardiseDates}>Make all dates look the same</button>
          <div className="flex gap-2"><button className="flex-1 rounded bg-emerald-700 text-white px-2 py-2 text-sm flex items-center justify-center gap-1" onClick={() => exportFile('xlsx')}><Download size={14}/>Export XLSX</button><button className="flex-1 rounded bg-emerald-700 text-white px-2 py-2 text-sm" onClick={() => exportFile('csv')}>CSV</button></div>
          <div className="flex gap-2"><button className="flex-1 border rounded px-2 py-2 text-sm flex items-center justify-center gap-1" onClick={() => { const prev = history[history.length - 1]; if (prev) { setCurrent(prev); setHistory(history.slice(0, -1)); } }}><Undo2 size={14}/>Undo</button><button className="flex-1 border rounded px-2 py-2 text-sm flex items-center justify-center gap-1" onClick={() => setCurrent(JSON.parse(JSON.stringify(original)))}><RotateCcw size={14}/>Reset</button></div>
        </div>
        <div className="md:col-span-3 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-3"><input placeholder="Search in table" value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded px-3 py-2 text-sm w-full md:w-64" />
          <select value={sheetName} onChange={(e) => { const s = sheets.find((x) => x.name === e.target.value); if (s) { setSheetName(s.name); setCurrent(s.rows); setOriginal(JSON.parse(JSON.stringify(s.rows))); setColumns(s.columns); } }} className="border rounded px-2 py-2 text-sm">{sheets.map((s) => <option key={s.name}>{s.name}</option>)}</select>
          </div>
          <div className="overflow-auto max-h-[420px] border rounded"><table className="min-w-full text-xs"><thead className="bg-slate-100 sticky top-0"><tr><th className="p-2">#</th>{columns.map((c) => <th key={c} className="p-2 text-left">{c}</th>)}</tr></thead><tbody>{filtered.slice(0, 100).map((r, i) => <tr key={i} className="border-t"><td className="p-2">{i + 1}</td>{columns.map((c) => <td key={c} className="p-2 whitespace-nowrap">{String(r[c] ?? '')}</td>)}</tr>)}</tbody></table></div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="border rounded p-3"><h3 className="font-semibold mb-2">Fix inconsistent spellings</h3><select value={spellingColumn} onChange={(e) => setSpellingColumn(e.target.value)} className="border rounded p-2 w-full text-sm"><option value="">Select column</option>{columns.map((c) => <option key={c}>{c}</option>)}</select>
              <div className="space-y-2 mt-2 max-h-40 overflow-auto">{spellingSuggestions.map((g, idx) => <div key={idx} className="bg-slate-50 border rounded p-2 text-xs"><div><Sparkles size={12} className="inline mr-1"/>Suggested: <b>{toTitleCase(g.canonical)}</b></div><div>{g.variants.join(', ')}</div><button className="mt-1 text-xs bg-slate-900 text-white rounded px-2 py-1" onClick={() => applySpelling(toTitleCase(g.canonical), g.variants)}>Apply to all</button></div>)}</div></div>
            <div className="border rounded p-3"><h3 className="font-semibold mb-2">Cleaning history</h3><div className="max-h-40 overflow-auto space-y-1 text-xs">{logs.map((l, i) => <div key={i} className="border-b pb-1">{l.action} | {l.columns} | {l.changed} cells | {l.at}</div>)}</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Index;
