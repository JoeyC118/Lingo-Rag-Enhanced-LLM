import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Bookmark, Search, Volume2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const savedWords = [
  { id: 1, word: "Hello", translation: "Hola", category: "Greetings", mastered: true },
  { id: 2, word: "Thank you", translation: "Gracias", category: "Common", mastered: true },
  { id: 3, word: "Goodbye", translation: "Adiós", category: "Greetings", mastered: false },
  { id: 4, word: "Please", translation: "Por favor", category: "Common", mastered: false },
  { id: 5, word: "Water", translation: "Agua", category: "Food & Drink", mastered: true },
  { id: 6, word: "Coffee", translation: "Café", category: "Food & Drink", mastered: false },
  { id: 7, word: "Friend", translation: "Amigo", category: "People", mastered: true },
  { id: 8, word: "Family", translation: "Familia", category: "People", mastered: false },
];

const categories = ["All", "Greetings", "Common", "Food & Drink", "People"];

const SavedWords = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredWords = savedWords.filter((word) => {
    const matchesSearch =
      word.word.toLowerCase().includes(search.toLowerCase()) ||
      word.translation.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || word.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Saved Words
              </h1>
              <p className="text-muted-foreground">
                {savedWords.length} words saved • {savedWords.filter((w) => w.mastered).length} mastered
              </p>
            </div>
            <Button className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Word
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search words..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredWords.map((word, index) => (
              <div
                key={word.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors animate-slide-in group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    word.mastered ? "bg-lingo-lime-light" : "bg-lingo-blue-light"
                  )}
                >
                  <Bookmark
                    className={cn(
                      "w-5 h-5",
                      word.mastered ? "text-accent" : "text-primary"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{word.word}</p>
                  <p className="text-sm text-muted-foreground">{word.translation}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive/60 hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bookmark className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No words found</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SavedWords;
