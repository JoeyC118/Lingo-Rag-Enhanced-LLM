import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Layers, RotateCcw, Check, X, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sampleCards = [
  { id: 1, front: "Hello", back: "Hola", category: "Greetings" },
  { id: 2, front: "Thank you", back: "Gracias", category: "Greetings" },
  { id: 3, front: "Goodbye", back: "Adiós", category: "Greetings" },
  { id: 4, front: "Please", back: "Por favor", category: "Common" },
  { id: 5, front: "Water", back: "Agua", category: "Food & Drink" },
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<number[]>([]);

  const currentCard = sampleCards[currentIndex];
  const progress = ((currentIndex + 1) / sampleCards.length) * 100;

  const handleNext = (didKnow: boolean) => {
    if (didKnow) {
      setMastered([...mastered, currentCard.id]);
    }
    setIsFlipped(false);
    if (currentIndex < sampleCards.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMastered([]);
  };

  return (
    <MainLayout>
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Flashcards
              </h1>
              <p className="text-muted-foreground">
                Review and memorize your vocabulary
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={resetDeck} className="rounded-xl">
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                Card {currentIndex + 1} of {sampleCards.length}
              </span>
              <span className="text-accent font-medium">
                {mastered.length} mastered
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-hero rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={cn(
              "relative w-full aspect-[4/3] cursor-pointer perspective-1000 mb-6",
              "animate-fade-in"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-transform duration-500 transform-style-preserve-3d",
                isFlipped && "rotate-y-180"
              )}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border shadow-medium"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-xs px-3 py-1 rounded-full bg-lingo-blue-light text-primary mb-4">
                  {currentCard.category}
                </span>
                <p className="font-display text-4xl font-bold text-foreground text-center">
                  {currentCard.front}
                </p>
                <p className="text-muted-foreground mt-4">Tap to reveal</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-lingo-lime-light border border-accent/20 shadow-medium"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent-foreground mb-4">
                  Translation
                </span>
                <p className="font-display text-4xl font-bold text-accent-foreground text-center">
                  {currentCard.back}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNext(false)}
              className="flex-1 max-w-[140px] rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <X className="w-5 h-5 mr-2" />
              Again
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsFlipped(!isFlipped)}
              className="rounded-xl"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => handleNext(true)}
              className="flex-1 max-w-[140px] rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Check className="w-5 h-5 mr-2" />
              Got it
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Flashcards;
