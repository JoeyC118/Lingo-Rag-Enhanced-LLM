import { MainLayout } from "@/components/layout/MainLayout";
import { ClipboardCheck, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tests = [
  {
    id: 1,
    title: "Vocabulary Quiz",
    description: "Test your knowledge of common words",
    questions: 10,
    time: "5 min",
    difficulty: "Easy",
    bestScore: 8,
  },
  {
    id: 2,
    title: "Phrase Matching",
    description: "Match phrases with their translations",
    questions: 15,
    time: "10 min",
    difficulty: "Medium",
    bestScore: null,
  },
  {
    id: 3,
    title: "Listening Comprehension",
    description: "Test your listening skills",
    questions: 8,
    time: "8 min",
    difficulty: "Medium",
    bestScore: 6,
  },
  {
    id: 4,
    title: "Grammar Challenge",
    description: "Practice sentence structure and grammar rules",
    questions: 20,
    time: "15 min",
    difficulty: "Hard",
    bestScore: null,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-lingo-lime-light text-accent-foreground",
  Medium: "bg-lingo-blue-light text-primary",
  Hard: "bg-destructive/10 text-destructive",
};

const Tests = () => {
  return (
    <MainLayout>
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Tests
            </h1>
            <p className="text-muted-foreground">
              Challenge yourself and track your progress
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-gradient-hero text-primary-foreground">
              <ClipboardCheck className="w-6 h-6 mb-2" />
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm opacity-90">Tests completed</p>
            </div>
            <div className="p-5 rounded-xl bg-lingo-lime-light border border-accent/10">
              <Star className="w-6 h-6 text-accent mb-2" />
              <p className="text-3xl font-bold text-foreground">82%</p>
              <p className="text-sm text-muted-foreground">Average score</p>
            </div>
          </div>

          {/* Tests list */}
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Available Tests
          </h2>
          <div className="space-y-3">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-lingo-blue-light">
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{test.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[test.difficulty]}`}
                    >
                      {test.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {test.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{test.questions} questions</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.time}
                    </span>
                    {test.bestScore !== null && (
                      <span className="flex items-center gap-1 text-accent">
                        <Star className="w-3 h-3" />
                        Best: {test.bestScore}/{test.questions}
                      </span>
                    )}
                  </div>
                </div>
                <Button className="rounded-xl">
                  Start
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tests;
