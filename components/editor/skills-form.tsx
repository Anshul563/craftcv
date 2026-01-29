"use client";

import { useResume } from "@/context/resume-context";
import { Skill } from "@/lib/types";
import { Plus, X } from "lucide-react";

export function SkillsForm() {
  const { resumeData, updateResumeData } = useResume();
  const { skills } = resumeData;

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: "Intermediate", // Default
    };
    updateResumeData({ skills: [...(skills || []), newSkill] });
  };

  const removeSkill = (id: string) => {
    updateResumeData({
      skills: skills.filter((s) => s.id !== id),
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    updateResumeData({
      skills: skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <button
          onClick={addSkill}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4" /> Add Skill
        </button>
      </div>

      {(!skills || skills.length === 0) && (
        <p className="text-sm text-gray-500 italic">No skills added yet.</p>
      )}

      <div className="flex flex-wrap gap-2">
        {skills?.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md p-2">
            <input
              type="text"
              placeholder="Skill (e.g. React)"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              className="bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none text-sm w-32"
            />
            
            <select
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
              className="bg-transparent text-xs text-gray-500 focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>

            <button
              onClick={() => removeSkill(skill.id)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}