import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MessageSquare,
  BookOpen,
  Layers,
  ClipboardCheck,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "../../../logos/lingologo.png"; // adjust path


const navItems = [
  { title: "Chat", url: "/", icon: MessageSquare },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "Flashcards", url: "/flashcards", icon: Layers },
  { title: "Tests", url: "/tests", icon: ClipboardCheck },
  { title: "Saved Words", url: "/saved", icon: Bookmark },
];

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
<div
  className={cn(
    "border-b border-sidebar-border flex items-center justify-center overflow-hidden",
    collapsed ? "h-16" : "h-32"
  )}
>
  <img
    src={logo}
    alt="Lingo logo"
    className={cn(
      "object-contain transition-all duration-300",
      collapsed ? "h-10" : "h-full w-full"
    )}
  />
</div>






      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "hover:bg-secondary",
              isActive(item.url)
                ? "bg-lingo-blue-light text-primary font-medium"
                : "text-sidebar-foreground"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive(item.url) ? "text-primary" : "text-sidebar-muted"
              )}
            />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "hover:bg-secondary",
              isActive(item.url)
                ? "bg-lingo-blue-light text-primary font-medium"
                : "text-sidebar-foreground"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive(item.url) ? "text-primary" : "text-sidebar-muted"
              )}
            />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-start gap-3 px-3 py-2.5 text-sidebar-muted hover:text-foreground",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
