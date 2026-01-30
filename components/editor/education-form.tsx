"use client";

import { useResume } from "@/context/resume-context";
import { Education } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
  const { resumeData, updateResumeData } = useResume();
  const { education } = resumeData;

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    updateResumeData({ education: [...education, newEdu] });
  };

  const removeEducation = (id: string) => {
    updateResumeData({
      education: education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateResumeData({
      education: education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <Plus className="h-4 w-4" /> Add School
        </button>
      </div>

      {education.length === 0 && (
        <p className="text-sm text-gray-500 italic">No education added yet.</p>
      )}

      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group"
        >
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">
                School / University
              </label>
              <input
                value={edu.school}
                onChange={(e) =>
                  updateEducation(edu.id, "school", e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Harvard University"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">
                Degree
              </label>
              <input
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.id, "degree", e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="Bachelor of Science in CS"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Start Date
                </label>
                <input
                  type="month" // Browser native date picker
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "startDate", e.target.value)
                  }
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">
                  End Date
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "endDate", e.target.value)
                  }
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
