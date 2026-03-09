import React, { useState, useMemo } from 'react';
import { businessTips, tipCategories } from '../data/businessTips';
import { ChevronLeft, Bookmark, Search, TrendingUp, Shield, Leaf, BookOpen, GitBranch, DollarSign, AlertTriangle, Home, X } from 'lucide-react';

const categoryIconMap: Record<string, React.ReactNode> = {
  'Cattle Fattening': <TrendingUp className="w-5 h-5" />,
  'Mortality Reduction': <Shield className="w-5 h-5" />,
  'Feed Optimization': <Leaf className="w-5 h-5" />,
  'Record Keeping': <BookOpen className="w-5 h-5" />,
  'Breeding Management': <GitBranch className="w-5 h-5" />,
  'Market Access': <DollarSign className="w-5 h-5" />,
  'Disease Risk': <AlertTriangle className="w-5 h-5" />,
  'Goat Farming': <Home className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  'Cattle Fattening': 'from-orange-500 to-orange-600',
  'Mortality Reduction': 'from-red-500 to-red-600',
  'Feed Optimization': 'from-green-500 to-green-600',
  'Record Keeping': 'from-blue-500 to-blue-600',
  'Breeding Management': 'from-purple-500 to-purple-600',
  'Market Access': 'from-amber-500 to-amber-600',
  'Disease Risk': 'from-rose-500 to-rose-600',
  'Goat Farming': 'from-teal-500 to-teal-600',
};

const BusinessTipsView: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTips = useMemo(() => {
    let result = businessTips;
    if (activeCategory !== 'All') result = result.filter(t => t.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(bookmarks);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setBookmarks(newSet);
  };

  const tip = selectedTip ? businessTips.find(t => t.id === selectedTip) : null;

  if (tip) {
    const gradientClass = categoryColors[tip.category] || 'from-gray-500 to-gray-600';
    return (
      <div className="min-h-full bg-gray-50">
        <div className={`bg-gradient-to-r ${gradientClass} text-white p-4 lg:p-5 flex items-center gap-3`}>
          <button onClick={() => setSelectedTip(null)} className="p-2 hover:bg-white/20 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg lg:text-xl font-bold leading-tight">{tip.title}</h1>
            <span className="text-xs opacity-80">{tip.category}</span>
          </div>
          <button onClick={(e) => toggleBookmark(tip.id, e)} className="p-2 hover:bg-white/20 rounded-lg">
            <Bookmark className={`w-5 h-5 ${bookmarks.has(tip.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4 lg:p-6 max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-8">
            <div className="prose prose-sm max-w-none">
              {tip.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={i} className="text-base lg:text-lg font-bold text-gray-900 mt-6 mb-2 first:mt-0">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={i} className="flex items-start gap-2 ml-2 my-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm lg:text-base">{line.substring(2)}</span>
                    </div>
                  );
                }
                if (line.trim() === '') return <div key={i} className="h-3" />;
                return <p key={i} className="text-gray-700 text-sm lg:text-base leading-relaxed">{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white p-4 lg:p-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold mb-1">Business Tips</h1>
          <p className="text-indigo-200 text-sm lg:text-base mb-4">Livestock entrepreneurship advice for Zimbabwean farmers</p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search tips..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Categories */}
        <div className="px-4 lg:px-0 -mt-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tipCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors ${
                  activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="p-4 lg:px-0 lg:py-4 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          {filteredTips.map(tip => {
            const gradientClass = categoryColors[tip.category] || 'from-gray-500 to-gray-600';
            return (
              <button key={tip.id} onClick={() => setSelectedTip(tip.id)}
                className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden text-left hover:shadow-md transition-all group">
                <div className={`bg-gradient-to-r ${gradientClass} p-3 flex items-center gap-3`}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                    {categoryIconMap[tip.category]}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-white/80">{tip.category}</span>
                  </div>
                  <button onClick={(e) => toggleBookmark(tip.id, e)} className="p-1.5 hover:bg-white/20 rounded-lg text-white">
                    <Bookmark className={`w-4 h-4 ${bookmarks.has(tip.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{tip.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tip.summary}</p>
                </div>
              </button>
            );
          })}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No tips found for this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessTipsView;
