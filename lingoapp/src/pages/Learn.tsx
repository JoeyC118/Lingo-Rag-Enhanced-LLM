import { MainLayout } from "@/components/layout/MainLayout";
import { BookOpen, Play, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const lessons = [
  {
    id: 1,
    title: "Common Phrases",
    description: "Learn everyday greetings and expressions",
    progress: 75,
    duration: "10 min",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Numbers & Counting",
    description: "Master numbers from 1 to 100",
    progress: 40,
    duration: "15 min",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Food & Dining",
    description: "Vocabulary for restaurants and meals",
    progress: 0,
    duration: "20 min",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Travel Essentials",
    description: "Navigate airports and hotels with confidence",
    progress: 0,
    duration: "25 min",
    level: "Intermediate",
  },
];

const Learn = () => {
  return (
    <MainLayout>
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Learn
            </h1>
            <p className="text-muted-foreground">
              Continue your language learning journey
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-lingo-blue-light border border-primary/10">
              <Trophy className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Day streak</p>
            </div>
            <div className="p-4 rounded-xl bg-lingo-lime-light border border-accent/10">
              <BookOpen className="w-6 h-6 text-accent-foreground mb-2" />
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-sm text-muted-foreground">Words learned</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary border border-border">
              <Clock className="w-6 h-6 text-muted-foreground mb-2" />
              <p className="text-2xl font-bold text-foreground">2.5h</p>
              <p className="text-sm text-muted-foreground">Total time</p>
            </div>
          </div>

          {/* Lessons */}
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Lessons
          </h2>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-lingo-blue-light">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{lesson.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {lesson.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {lesson.description}
                  </p>
                  {lesson.progress > 0 && (
                    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-hero rounded-full transition-all"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  <Button size="icon" className="rounded-xl">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Learn;
