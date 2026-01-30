"use client";

import { useResume } from "@/context/resume-context";
import { Project } from "@/lib/types";
import { Plus, Trash2, Link as LinkIcon } from "lucide-react";

export function ProjectsForm() {
  const { resumeData, updateResumeData } = useResume();
  const { projects } = resumeData;

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      url: "",
    };
    updateResumeData({ projects: [...(projects || []), newProject] });
  };

  const removeProject = (id: string) => {
    updateResumeData({
      projects: projects.filter((p) => p.id !== id),
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateResumeData({
      projects: projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p,
      ),
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {(!projects || projects.length === 0) && (
        <p className="text-sm text-gray-500 italic">No projects added yet.</p>
      )}

      {projects?.map((project) => (
        <div
          key={project.id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group space-y-3"
        >
          <button
            onClick={() => removeProject(project.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 gap-2">
            <div>
              <input
                value={project.name}
                onChange={(e) =>
                  updateProject(project.id, "name", e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="Project Name"
              />
            </div>

            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-gray-400" />
              <input
                value={project.url || ""}
                onChange={(e) =>
                  updateProject(project.id, "url", e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="Project URL (optional)"
              />
            </div>

            <div>
              <textarea
                value={project.description}
                onChange={(e) =>
                  updateProject(project.id, "description", e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-sm h-20 resize-none focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="Brief description of the project and tech stack used..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
