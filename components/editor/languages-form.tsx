import { useResume } from "@/context/resume-context";
import { Plus, Trash2 } from "lucide-react";

export function LanguagesForm() {
  const { resumeData, updateResumeData } = useResume();
  const { languages } = resumeData;

  const addLanguage = () => {
    updateResumeData({
      languages: [
        ...(languages || []),
        {
          id: Date.now().toString(),
          name: "",
          level: "Conversational",
        },
      ],
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    const updated = languages.map((lang) =>
      lang.id === id ? { ...lang, [field]: value } : lang,
    );
    updateResumeData({ languages: updated });
  };

  const removeLanguage = (id: string) => {
    updateResumeData({
      languages: languages.filter((lang) => lang.id !== id),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        <button
          onClick={addLanguage}
          className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Language
        </button>
      </div>

      <div className="space-y-4">
        {languages?.map((lang) => (
          <div
            key={lang.id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 group hover:border-brand-200 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-3">
                <input
                  value={lang.name}
                  onChange={(e) =>
                    updateLanguage(lang.id, "name", e.target.value)
                  }
                  placeholder="Language (e.g. Spanish)"
                  className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all placeholder:text-gray-400"
                />
                <select
                  value={lang.level}
                  onChange={(e) =>
                    updateLanguage(lang.id, "level", e.target.value)
                  }
                  className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm"
                >
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
              </div>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {(!languages || languages.length === 0) && (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
            <p className="text-sm">No languages added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
