import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Star,
  Sparkles,
  Trash2,
  Calendar,
  Smile,
  Tag,
  PenTool,
  Heart,
} from 'lucide-react';
import { JournalEntry, MoodType } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { formatDatePretty, getTodayDateString } from '../../services/storage';
import { TryItExampleCard } from '../common/TryItExampleCard';
import { tryItExamples } from '../../data/demoData';

interface JournalViewProps {
  entries: JournalEntry[];
  onSaveEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  entries,
  onSaveEntry,
  onDeleteEntry,
}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showDemoExample, setShowDemoExample] = useState(true);

  // New Entry Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>(['calm']);
  const [tagsInput, setTagsInput] = useState('gratitude, peace');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const prompts = [
    'What made you smile today, Dhruvi?',
    'What are you grateful for in this exact moment?',
    'What are you proud of yourself for lately?',
    'What does your body or heart need more of right now?',
    'What gentle words would you whisper to your future self?',
  ];

  const allMoods: { id: MoodType; emoji: string; label: string }[] = [
    { id: 'great', emoji: '😊', label: 'Great' },
    { id: 'happy', emoji: '🙂', label: 'Happy' },
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'loved', emoji: '🥰', label: 'Loved' },
    { id: 'okay', emoji: '😐', label: 'Okay' },
    { id: 'emotional', emoji: '😭', label: 'Sensitive' },
    { id: 'exhausted', emoji: '😴', label: 'Tired' },
  ];

  const handleApplyPrompt = (p: string) => {
    setActivePrompt(p);
    setTitle(p);
    setIsWriting(true);
  };

  const handleToggleMood = (m: MoodType) => {
    if (selectedMoods.includes(m)) {
      if (selectedMoods.length > 1) {
        setSelectedMoods(selectedMoods.filter((item) => item !== m));
      }
    } else {
      setSelectedMoods([...selectedMoods, m]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const newEntry: JournalEntry = {
      id: `journal_${Date.now()}`,
      date: getTodayDateString(),
      title: title.trim() || 'A Gentle Thought ♡',
      content: content.trim(),
      moods: selectedMoods,
      tags: parsedTags,
      isFavorite: false,
      promptUsed: activePrompt || undefined,
      createdAt: new Date().toISOString(),
      isExample: false, // Dhruvi's real personal diary entry!
    };

    onSaveEntry(newEntry);
    setTitle('');
    setContent('');
    setIsWriting(false);
    setActivePrompt(null);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? entry.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-purple-100/90 via-pink-100/70 to-rose-100/70 dark:from-purple-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-purple-600 dark:text-purple-300 border border-purple-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Private Soul Sanctuary</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Dear Diary & Reflections
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              A private, paper-like space for your dreams, gratitude, and quiet musings.
            </p>
          </div>

          <button
            onClick={() => setIsWriting(!isWriting)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white font-semibold text-xs shadow-soft flex items-center gap-2 shrink-0"
          >
            <PenTool className="w-4 h-4" />
            <span>{isWriting ? 'Close Journal' : 'Write in Diary ♡'}</span>
          </button>
        </div>
      </div>

      {/* 2. Try It Demo when empty */}
      {showDemoExample && entries.length === 0 && (
        <TryItExampleCard
          title="Try It Demo: Diary Entry"
          exampleText="A gentle morning & fresh lavender breeze — Brewed matcha by the window watching quiet clouds..."
          subtitle="This is an example entry. Pour your thoughts, memories, or reflections into your personal diary whenever you like!"
          details={[
            { label: 'Prompt', value: 'Peaceful moments ♡' },
            { label: 'Moods', value: 'Calm 😌, Happy 🙂' },
          ]}
          onReplaceWithMine={() => setIsWriting(true)}
          onRemoveExample={() => setShowDemoExample(false)}
          replaceButtonLabel="Write My Real Entry"
        />
      )}

      {/* 3. Writing Prompts Carousel */}
      <div className="glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Loving Prompts for Dhruvi</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPrompt(p)}
              className="px-3.5 py-2 rounded-2xl bg-pink-50/70 dark:bg-pink-950/40 hover:bg-pink-100/80 text-xs font-medium text-pink-900 dark:text-pink-200 border border-pink-100 dark:border-pink-900/50 whitespace-nowrap shrink-0 transition-all text-left"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

      {/* 4. Paper-Style Writing Desk */}
      {isWriting && (
        <form
          onSubmit={handleSave}
          className="rounded-3xl p-6 md:p-8 bg-[#FFFDF9] dark:bg-gray-900 border-2 border-pink-200/80 dark:border-pink-900 shadow-soft-lg space-y-4 relative animate-fadeIn"
          style={{
            backgroundImage:
              'radial-gradient(rgba(244, 114, 182, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-pink-950">
            <span className="font-handwritten text-xl text-pink-600 dark:text-pink-300">
              {formatDatePretty(getTodayDateString())}
            </span>
            <div className="flex items-center gap-1">
              {allMoods.map((m) => {
                const isSelected = selectedMoods.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleToggleMood(m.id)}
                    className={`text-lg p-1 rounded-lg transition-transform ${
                      isSelected ? 'scale-125 bg-pink-100 dark:bg-pink-950' : 'opacity-50 hover:opacity-100'
                    }`}
                    title={m.label}
                  >
                    {m.emoji}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Entry Title (e.g. Afternoon tea & quiet sunset...)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full font-serif text-lg md:text-xl font-bold bg-transparent border-b border-pink-100 dark:border-pink-900 pb-2 text-gray-800 dark:text-pink-100 focus:outline-none focus:border-pink-400 placeholder:text-gray-300"
            />
          </div>

          <div>
            <textarea
              rows={8}
              required
              placeholder="Pour your thoughts, feelings, hopes, and memories here without pressure..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-sm md:text-base leading-relaxed bg-transparent text-gray-800 dark:text-pink-100 focus:outline-none placeholder:text-gray-300 resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-pink-100 dark:border-pink-950">
            <div className="w-full sm:w-auto flex items-center gap-2">
              <Tag className="w-4 h-4 text-pink-400" />
              <input
                type="text"
                placeholder="tags (e.g. sunset, tea, calm)"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-white/60 dark:bg-gray-800 w-full sm:w-60"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all"
              >
                Save My Diary Entry ♡
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 5. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search diary entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-2xl border border-pink-200 dark:border-pink-900 bg-white/80 dark:bg-gray-800 text-gray-800 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {selectedTag && (
          <div className="flex items-center gap-1.5 text-xs text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            <span>Filtering by #{selectedTag}</span>
            <button onClick={() => setSelectedTag(null)} className="font-bold">
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 6. Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="glass-card rounded-3xl p-10 text-center bg-white/70 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950">
            <span className="text-3xl">📖</span>
            <h4 className="font-serif font-bold text-gray-700 dark:text-pink-200 mt-2">
              No journal entries yet ♡
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              "Your story starts today. Whenever you're ready, we'll keep track together."
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className={`glass-card rounded-3xl p-6 border shadow-soft hover:shadow-soft-lg transition-all group ${
                entry.isExample
                  ? 'bg-gradient-to-r from-pink-50/50 to-purple-50/40 border-pink-200/80 border-dashed dark:bg-pink-950/20'
                  : 'bg-white/80 dark:bg-gray-900/70 border-pink-100 dark:border-pink-950'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-pink-300/70">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDatePretty(entry.date)}</span>
                    {entry.isExample ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold">
                        ✨ Example Entry
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        💗 My Diary
                      </span>
                    )}
                    {entry.promptUsed && (
                      <>
                        <span>•</span>
                        <span className="italic text-pink-500">"{entry.promptUsed}"</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100 mt-1">
                    {entry.title}
                  </h3>
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-gray-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs md:text-sm text-gray-700 dark:text-pink-100/90 leading-relaxed whitespace-pre-line mt-2">
                {entry.content}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-pink-50 dark:border-pink-950">
                <div className="flex items-center gap-1.5">
                  {entry.moods.map((m) => (
                    <span
                      key={m}
                      className="text-sm px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-950/60"
                    >
                      {allMoods.find((item) => item.id === m)?.emoji || '🌸'}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {entry.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-pink-50 dark:bg-gray-800 text-pink-600 dark:text-pink-300 hover:bg-pink-100 border border-pink-100"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
