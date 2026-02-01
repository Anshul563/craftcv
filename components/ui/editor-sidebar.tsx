"use client";

import { cn } from "@/lib/utils";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  LayoutTemplate,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function EditorSidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const navItems = [
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "personal", label: "Personal", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Wrench },
  ];

  return (
    <div className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 shrink-0 z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-4 w-full px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group relative",
              activeSection === item.id
                ? "text-brand-600 bg-brand-50 shadow-sm"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
            )}
            title={item.label}
          >
            <item.icon
              size={22}
              className={cn(
                "transition-transform duration-300",
                activeSection === item.id
                  ? "scale-110"
                  : "group-hover:scale-105",
              )}
            />
            <span className="text-[10px] font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute top-full bg-gray-900 text-white px-2 py-1 rounded pointer-events-none z-50 whitespace-nowrap translate-y-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
