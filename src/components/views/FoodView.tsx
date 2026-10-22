import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Plus,
  Trash2,
  Sparkles,
  Heart,
  Clock,
  Smile,
  Check,
  Edit2,
} from 'lucide-react';
import { DailyRecord, MealEntry, MealType } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { TryItExampleCard } from '../common/TryItExampleCard';
import { tryItExamples } from '../../data/demoData';

interface FoodViewProps {
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
}

export const FoodView: React.FC<FoodViewProps> = ({ todayRecord, onUpdateRecord }) => {
  const [activeTab, setActiveTab] = useState<MealType>('breakfast');
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [showDemoExample, setShowDemoExample] = useState(true);

  // New Meal Form State
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [foodName, setFoodName] = useState('');
  const [portion, setPortion] = useState('Comfortable');
  const [mealTime, setMealTime] = useState('08:45');
  const [hungerLevel, setHungerLevel] = useState(3);
  const [feelingAfter, setFeelingAfter] = useState('Nourished & light ♡');
  const [selectedTags, setSelectedTags] = useState<string[]>(['fruits', 'fiber']);

  const nutritionTags = [
    { id: 'fruits', label: 'Fresh Fruits 🍓' },
    { id: 'veggies', label: 'Vibrant Veggies 🥗' },
    { id: 'protein', label: 'Gentle Protein 🍳' },
    { id: 'fiber', label: 'Whole Fiber 🌾' },
    { id: 'hydration', label: 'Warm Broth/Tea 🍵' },
  ];

  const mealSections: { type: MealType; title: string; icon: string; timeHint: string }[] = [
    { type: 'breakfast', title: 'Breakfast', icon: '🥐', timeHint: 'Morning nourishment' },
    { type: 'lunch', title: 'Lunch', icon: '🥗', timeHint: 'Midday vitality' },
    { type: 'dinner', title: 'Dinner', icon: '🍲', timeHint: 'Evening warmth' },
    { type: 'snack', title: 'Snacks & Tea', icon: '🍓', timeHint: 'Mindful treats' },
  ];

  const handleToggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleOpenAddForm = (type: MealType, prefill?: Partial<MealEntry>) => {
    setActiveTab(type);
    setEditingMealId(null);
    setFoodName(prefill?.foodName || '');
    setPortion(prefill?.portion || 'Comfortable');
    setMealTime(prefill?.time || (type === 'breakfast' ? '08:30' : type === 'lunch' ? '13:00' : '19:30'));
    setHungerLevel(prefill?.hungerLevel || 3);
    setFeelingAfter(prefill?.feelingAfter || 'Nourished & energized ♡');
    setSelectedTags(prefill?.tags || ['fruits', 'protein']);
    setIsAddingMeal(true);
  };

  const handleEditMeal = (meal: MealEntry) => {
    setEditingMealId(meal.id);
    setActiveTab(meal.mealType);
    setFoodName(meal.foodName);
    setPortion(meal.portion);
    setMealTime(meal.time);
    setHungerLevel(meal.hungerLevel);
    setFeelingAfter(meal.feelingAfter);
    setSelectedTags(meal.tags);
    setIsAddingMeal(true);
  };

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    if (editingMealId) {
      // Editing existing meal (if it was an example, it becomes a REAL personal record!)
      const updatedMeals = todayRecord.meals.map((m) =>
        m.id === editingMealId
          ? {
              ...m,
              foodName: foodName.trim(),
              portion,
              time: mealTime,
              hungerLevel,
              feelingAfter,
              tags: selectedTags,
              isExample: false, // Now Dhruvi's real personal record!
            }
          : m
      );
      onUpdateRecord({ ...todayRecord, meals: updatedMeals });
    } else {
      // New real entry
      const newEntry: MealEntry = {
        id: `meal_${Date.now()}`,
        mealType: activeTab,
        foodName: foodName.trim(),
        portion,
        time: mealTime,
        hungerLevel,
        feelingAfter,
        tags: selectedTags,
        isExample: false, // Real personal record!
      };
      onUpdateRecord({
        ...todayRecord,
        meals: [...todayRecord.meals, newEntry],
      });
    }

    setFoodName('');
    setIsAddingMeal(false);
    setEditingMealId(null);
  };

  const handleDeleteMeal = (id: string) => {
    onUpdateRecord({
      ...todayRecord,
      meals: todayRecord.meals.filter((m) => m.id !== id),
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-amber-100/90 via-pink-100/60 to-rose-100/70 dark:from-amber-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nourishment & Joy</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Food Journal
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              Honoring your body with joyful, balanced meals. No calorie counting, only love.
            </p>
          </div>

          <button
            onClick={() => handleOpenAddForm(activeTab)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 text-white font-semibold text-xs shadow-soft flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log My Meal ♡</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive "Try It" Demo Card (when breakfast is empty and demo is shown) */}
      {showDemoExample && todayRecord.meals.length === 0 && (
        <TryItExampleCard
          title="Try It Demo: Breakfast"
          exampleText="Oatmeal + berries with chia seeds & almond butter"
          subtitle="This is an interactive example showing how meals look. You can replace it with what you actually ate today!"
          details={[
            { label: 'Time', value: '08:45 AM' },
            { label: 'Portion', value: 'Comfortable' },
            { label: 'Feeling', value: 'Nourished & light ♡' },
          ]}
          onEditExample={() => handleOpenAddForm('breakfast', tryItExamples.food)}
          onReplaceWithMine={() => handleOpenAddForm('breakfast', { foodName: '' })}
          onRemoveExample={() => setShowDemoExample(false)}
          replaceButtonLabel="Replace with My Meal"
        />
      )}

      {/* 3. Add/Edit Meal Form Drawer */}
      {isAddingMeal && (
        <form
          onSubmit={handleSaveMeal}
          className="glass-card rounded-3xl p-6 bg-white/95 dark:bg-gray-900/95 border border-pink-200 dark:border-pink-900 shadow-soft-lg space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
              <span>🌸</span> {editingMealId ? 'Edit Meal' : `Log ${activeTab.toUpperCase()}`}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAddingMeal(false);
                setEditingMealId(null);
              }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Meal Category
              </label>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as MealType)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snacks & Tea</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                What did you enjoy?
              </label>
              <input
                type="text"
                placeholder="e.g. Avocado toast with poached egg, warm chai..."
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Portion Size
              </label>
              <input
                type="text"
                placeholder="Light, Comforting, Generous..."
                value={portion}
                onChange={(e) => setPortion(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                How did your body feel afterward?
              </label>
              <input
                type="text"
                placeholder="Satisfied, cozy, energized, light..."
                value={feelingAfter}
                onChange={(e) => setFeelingAfter(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-2">
              Nourishment Goodness
            </label>
            <div className="flex flex-wrap gap-2">
              {nutritionTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggleTag(tag.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                        : 'bg-pink-50/50 dark:bg-gray-800 border-pink-100 text-gray-700 dark:text-pink-200'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft transition-all"
          >
            Save as My Real Meal ♡
          </button>
        </form>
      )}

      {/* 4. Meal Categories Tabs & List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mealSections.map((sec) => {
          const mealsOfThisType = todayRecord.meals.filter((m) => m.mealType === sec.type);
          return (
            <div
              key={sec.type}
              className="glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft"
            >
              <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-pink-950 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{sec.icon}</span>
                  <div>
                    <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
                      {sec.title}
                    </h3>
                    <p className="text-[11px] text-gray-400">{sec.timeHint}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddForm(sec.type)}
                  className="p-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 hover:bg-pink-100 transition-colors"
                  title="Add meal"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {mealsOfThisType.length === 0 ? (
                <div className="py-6 text-center text-gray-400 text-xs italic">
                  No {sec.title.toLowerCase()} logged yet today ♡
                </div>
              ) : (
                <div className="space-y-3">
                  {mealsOfThisType.map((meal) => (
                    <div
                      key={meal.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        meal.isExample
                          ? 'bg-gradient-to-r from-pink-50/50 to-purple-50/40 border-pink-200/80 border-dashed'
                          : 'bg-white/80 dark:bg-gray-800/80 border-pink-100 dark:border-pink-900/40 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-pink-100">
                              {meal.foodName}
                            </span>
                            {meal.isExample ? (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 font-bold">
                                ✨ Example
                              </span>
                            ) : (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold">
                                💗 My Meal
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                            {meal.feelingAfter}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400">
                            <span>Portion: {meal.portion}</span>
                            <span>•</span>
                            <span>{meal.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {meal.isExample ? (
                            <button
                              onClick={() => handleEditMeal(meal)}
                              className="px-2.5 py-1 rounded-xl bg-pink-500 text-white text-[11px] font-semibold hover:bg-pink-600 transition-colors shadow-sm"
                            >
                              Replace with Mine
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditMeal(meal)}
                              className="p-1.5 text-gray-400 hover:text-pink-600 transition-colors"
                              title="Edit meal"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMeal(meal.id)}
                            className="p-1.5 text-gray-300 hover:text-rose-500 transition-colors"
                            title="Delete meal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
