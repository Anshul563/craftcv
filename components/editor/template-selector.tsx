import { useResume } from "@/context/resume-context";
import {
  LayoutTemplate,
  LayoutList,
  AlignCenter,
  Palette,
  Type,
  Terminal,
  Bold,
  BookOpen,
  Lock,
} from "lucide-react";

export function TemplateSelector({ isPro }: { isPro: boolean }) {
  const { templateName, setTemplateName } = useResume();

  const templates = [
    {
      id: "modern",
      name: "Modern",
      icon: LayoutTemplate,
      color: "bg-blue-500",
      isPro: false,
    },
    {
      id: "minimal",
      name: "Minimal",
      icon: AlignCenter,
      color: "bg-gray-500",
      isPro: false,
    },
    {
      id: "professional",
      name: "Professional",
      icon: LayoutList,
      color: "bg-slate-800",
      isPro: false,
    },
    {
      id: "creative",
      name: "Creative",
      icon: Palette,
      color: "bg-pink-500",
      isPro: true,
    },
    {
      id: "elegant",
      name: "Elegant",
      icon: Type,
      color: "bg-emerald-700",
      isPro: true,
    },
    {
      id: "technical",
      name: "Technical",
      icon: Terminal,
      color: "bg-black",
      isPro: true,
    },
    { id: "bold", name: "Bold", icon: Bold, color: "bg-rose-600", isPro: true },
    {
      id: "academic",
      name: "Academic",
      icon: BookOpen,
      color: "bg-indigo-600",
      isPro: true,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Choose Template</h2>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplateName(t.id)}
            className={`relative flex flex-col items-center justify-center p-3 border-2 rounded-lg transition-all ${
              templateName === t.id
                ? "border-brand-600 bg-brand-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {/* Pro Badge/Lock */}
            {t.isPro && !isPro && (
              <div className="absolute top-1 right-1">
                <Lock className="w-3 h-3 text-amber-500" />
              </div>
            )}
            {t.isPro && isPro && (
              <div className="absolute top-1 right-1 text-[10px] font-bold text-amber-500">
                PRO
              </div>
            )}

            <div
              className={`w-8 h-10 mb-2 rounded shadow-sm ${t.color} opacity-80 flex items-center justify-center`}
            >
              <div className="w-6 h-0.5 bg-white/50 mb-4"></div>
            </div>
            <span
              className={`text-xs font-medium ${templateName === t.id ? "text-brand-600" : "text-gray-600"}`}
            >
              {t.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
