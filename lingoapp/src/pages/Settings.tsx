import { MainLayout } from "@/components/layout/MainLayout";
import { User, Globe, Bell, Palette, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", description: "Manage your account details" },
      { icon: Globe, label: "Languages", description: "Choose your learning languages" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", description: "Daily reminders and updates" },
      { icon: Palette, label: "Appearance", description: "Customize the app look" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", description: "Get help and support" },
    ],
  },
];

const Settings = () => {
  return (
    <MainLayout>
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your preferences and account
            </p>
          </div>

          {/* Settings groups */}
          <div className="space-y-8">
            {settingsGroups.map((group, groupIndex) => (
              <div
                key={group.title}
                className="animate-fade-in"
                style={{ animationDelay: `${groupIndex * 0.1}s` }}
              >
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {group.title}
                </h2>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-lingo-blue-light">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sign out */}
          <div className="mt-8 pt-8 border-t border-border">
            <Button
              variant="outline"
              className="w-full rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
