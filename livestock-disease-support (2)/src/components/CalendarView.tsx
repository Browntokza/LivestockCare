import React, { useState } from 'react';
import { calendarData, getCategoryColor } from '../data/calendar';
import { ChevronLeft, ChevronRight, Calendar, ClipboardList, Leaf, Syringe, Pill, Bell, Check, Printer } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Management: <ClipboardList className="w-4 h-4" />,
  Feeding: <Leaf className="w-4 h-4" />,
  Veterinary: <Syringe className="w-4 h-4" />,
  Dosing: <Pill className="w-4 h-4" />,
};

const categoryDotColors: Record<string, string> = {
  Management: 'bg-blue-500',
  Feeding: 'bg-green-500',
  Veterinary: 'bg-red-500',
  Dosing: 'bg-purple-500',
};

const CalendarView: React.FC = () => {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [reminders, setReminders] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

  const monthData = calendarData[selectedMonth];
  const filters = ['All', 'Management', 'Feeding', 'Veterinary', 'Dosing'];

  const filteredActivities = activeFilter === 'All'
    ? monthData.activities
    : monthData.activities.filter(a => a.category === activeFilter);

  const toggleComplete = (key: string) => {
    const newSet = new Set(completedTasks);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setCompletedTasks(newSet);
  };

  const toggleReminder = (key: string) => {
    const newSet = new Set(reminders);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setReminders(newSet);
  };

  const completedCount = monthData.activities.filter((_, i) =>
    completedTasks.has(`${selectedMonth}-${i}`)
  ).length;

  if (viewMode === 'year') {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4 lg:p-6 pb-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5" />
                <h1 className="text-xl lg:text-2xl font-bold">Annual Overview</h1>
              </div>
              <p className="text-blue-200 text-sm">Beef management calendar - all 12 months</p>
            </div>
            <button onClick={() => setViewMode('month')}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Monthly View
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calendarData.map((month, i) => (
              <button
                key={i}
                onClick={() => { setSelectedMonth(i); setViewMode('month'); }}
                className={`bg-white border rounded-xl p-4 text-left hover:shadow-lg transition-all ${
                  i === currentMonth ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{month.month}</h3>
                  {i === currentMonth && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Current</span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {month.activities.slice(0, 4).map((activity, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${categoryDotColors[activity.category]}`} />
                      <span className="text-xs text-gray-600 truncate">{activity.activity}</span>
                    </div>
                  ))}
                  {month.activities.length > 4 && (
                    <p className="text-xs text-gray-400 pl-4">+{month.activities.length - 4} more activities</p>
                  )}
                </div>
                <div className="flex gap-1 mt-3">
                  {['Management', 'Feeding', 'Veterinary', 'Dosing'].map(cat => {
                    const count = month.activities.filter(a => a.category === cat).length;
                    if (count === 0) return null;
                    return (
                      <span key={cat} className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${categoryDotColors[cat]}`}>
                        {count}
                      </span>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4 lg:p-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <h1 className="text-xl lg:text-2xl font-bold">Beef Management Calendar</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('year')}
                className="hidden sm:flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                Year View
              </button>
            </div>
          </div>
          <p className="text-blue-200 text-sm">Annual livestock management planner</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Month Selector */}
        <div className="px-4 lg:px-0 -mt-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-3 lg:p-4">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-center">
                <h2 className="text-lg lg:text-xl font-bold text-gray-900">{monthData.month}</h2>
                <p className="text-xs text-gray-500">{completedCount}/{monthData.activities.length} tasks completed</p>
              </div>
              <button onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {calendarData.map((m, i) => (
                <button key={i} onClick={() => setSelectedMonth(i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    i === selectedMonth ? 'bg-blue-600 text-white' :
                    i === currentMonth ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                    'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {m.shortMonth}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 lg:px-0 mt-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Monthly Progress</span>
              <span>{Math.round((completedCount / monthData.activities.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / monthData.activities.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-4 lg:px-0 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}>
                {filter !== 'All' && categoryIcons[filter]}
                {filter}
                <span className="text-xs opacity-70">
                  ({filter === 'All' ? monthData.activities.length : monthData.activities.filter(a => a.category === filter).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="p-4 lg:px-0 lg:py-4 space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          {filteredActivities.map((activity, index) => {
            const taskKey = `${selectedMonth}-${monthData.activities.indexOf(activity)}`;
            const isCompleted = completedTasks.has(taskKey);
            const hasReminder = reminders.has(taskKey);

            return (
              <div key={index}
                className={`bg-white border rounded-xl p-4 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleComplete(taskKey)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                      isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'
                    }`}>
                    {isCompleted && <Check className="w-4 h-4" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${getCategoryColor(activity.category)}`}>
                        {categoryIcons[activity.category]}
                        {activity.category}
                      </span>
                    </div>
                    <p className={`font-medium text-sm ${isCompleted ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                      {activity.activity}
                    </p>
                  </div>
                  <button onClick={() => toggleReminder(taskKey)}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      hasReminder ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:bg-gray-100'
                    }`} title={hasReminder ? 'Reminder set' : 'Set reminder'}>
                    <Bell className={`w-4 h-4 ${hasReminder ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No activities for this filter</p>
          </div>
        )}

        {/* Legend */}
        <div className="px-4 lg:px-0 pb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Activity Categories</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {['Management', 'Feeding', 'Veterinary', 'Dosing'].map(cat => (
                <div key={cat} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${categoryDotColors[cat]}`} />
                  <span className="text-xs text-gray-600">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
