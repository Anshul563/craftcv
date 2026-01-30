"use client";
import { useResume } from "@/context/resume-context";
import { Experience } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export function ExperienceForm() {
  const { resumeData, updateResumeData } = useResume();
  const { experience } = resumeData;

  const addExperience = () => {
    updateResumeData({
      experience: [
        ...(experience || []),
        {
          id: crypto.randomUUID(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const updateExp = (id: string, field: keyof Experience, value: any) => {
    updateResumeData({
      experience: experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e,
      ),
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between border-b pb-2">
        <h3 className="text-lg font-semibold">Experience</h3>
        <button
          onClick={addExperience}
          className="text-brand-600 text-sm flex items-center gap-1 hover:text-brand-700 font-medium"
        >
          <Plus size={16} /> Add Job
        </button>
      </div>
      {experience?.map((exp) => (
        <div
          key={exp.id}
          className="p-4 border rounded bg-gray-50 space-y-3 relative group"
        >
          <button
            onClick={() =>
              updateResumeData({
                experience: experience.filter((e) => e.id !== exp.id),
              })
            }
            className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
          <input
            placeholder="Company"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-500 focus:outline-none"
            value={exp.company}
            onChange={(e) => updateExp(exp.id, "company", e.target.value)}
          />
          <input
            placeholder="Position"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-500 focus:outline-none"
            value={exp.position}
            onChange={(e) => updateExp(exp.id, "position", e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-500 focus:outline-none"
            value={exp.description}
            onChange={(e) => updateExp(exp.id, "description", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
