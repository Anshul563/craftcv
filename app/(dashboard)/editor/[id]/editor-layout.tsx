"use client";
import { EducationForm } from "@/components/editor/education-form";
import { ExperienceForm } from "@/components/editor/experience-form";
import { PersonalInfoForm } from "@/components/editor/personal-info-form";
import { ProjectsForm } from "@/components/editor/projects-form";
import { SkillsForm } from "@/components/editor/skills-form";
import { TemplateSelector } from "@/components/editor/template-selector";
import { Watermark } from "@/components/ui/watermark";
import { CreativeTemplate } from "@/components/templates/creative-template";
import { ElegantTemplate } from "@/components/templates/elegant-template";
import { TechnicalTemplate } from "@/components/templates/technical-template";
import { BoldTemplate } from "@/components/templates/bold-template";
import { AcademicTemplate } from "@/components/templates/academic-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { ProfessionalTemplate } from "@/components/templates/professional-template";
import { useResume } from "@/context/resume-context";
import {
  Download,
  Loader2,
  Save,
  Eye,
  PenLine,
  LayoutTemplate,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
} from "lucide-react";
import { useState } from "react";

export function EditorLayout({
  resumeId,
  isPro,
}: {
  resumeId: number;
  isPro: boolean;
}) {
  const { resumeData, isSaving, templateName, resumeTitle, setResumeTitle } =
    useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  // --- State for Sidebar Navigation ---
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [activeSection, setActiveSection] = useState("templates");

  const handleDownload = async () => {
   

    setIsDownloading(true);
    try {
      const response = await fetch(`/api/resume/${resumeId}/pdf`);
      // ... same logic
      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderTemplate = () => {
    switch (templateName) {
      case "minimal":
        return <MinimalTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "elegant":
        return <ElegantTemplate data={resumeData} />;
      case "technical":
        return <TechnicalTemplate data={resumeData} />;
      case "bold":
        return <BoldTemplate data={resumeData} />;
      case "academic":
        return <AcademicTemplate data={resumeData} />;
      case "modern":
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  // Helper to render the active form section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "templates":
        return <TemplateSelector isPro={true} />; // Always show as unlocked
      case "personal":
        return <PersonalInfoForm />;
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
      case "projects":
        return <ProjectsForm />;
      case "skills":
        return <SkillsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200/60 bg-white/80 backdrop-blur-xl px-4 lg:px-6 shadow-sm z-30 shrink-0">
        <div className="flex items-center gap-3 w-1/2">
          <Link
            href="/dashboard"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <input
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-gray-400 w-full min-w-[200px]"
              placeholder="Untitled Resume"
            />
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap">
              Draft
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Save Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-brand-500" />{" "}
                <span className="text-brand-600">Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3 w-3" /> Saved
              </>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading || isSaving}
            className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-gray-900/10 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            )}
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR (Desktop) */}
        <div className="hidden lg:block relative z-20">
          <EditorSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* EDITOR PANEL (Left/Center) */}
        <div
          className={`w-full lg:w-[450px] xl:w-[500px] flex flex-col bg-white border-r border-gray-200/60 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] z-10 transition-transform duration-300 absolute lg:relative h-full ${
            activeTab === "editor"
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {/* Mobile Navigation (Horizontal Scroll) */}
            <div className="lg:hidden mb-6 -mx-6 px-6 overflow-x-auto flex gap-3 no-scrollbar pb-2">
              {[
                { id: "templates", icon: LayoutTemplate, label: "Templates" },
                { id: "personal", icon: User, label: "Personal" },
                { id: "education", icon: GraduationCap, label: "Education" },
                { id: "experience", icon: Briefcase, label: "Experience" },
                { id: "projects", icon: FolderGit2, label: "Projects" },
                { id: "skills", icon: Wrench, label: "Skills" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                    activeSection === item.id
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={14} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="max-w-md mx-auto animate-fade-in">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 capitalize">
                  {activeSection}
                </h2>
              </div>
              {renderActiveSection()}
            </div>
          </div>
        </div>

        {/* PREVIEW PANEL (Right) */}
        <div
          className={`w-full flex-1 overflow-hidden bg-gray-50/50 relative flex flex-col ${
            activeTab === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          <div className="flex-1 overflow-auto p-4 lg:p-12 flex justify-center items-start">
            {/* A4 Paper Container */}
            <div
              className="bg-white shadow-2xl shadow-gray-900/5 rounded-sm overflow-hidden transform-gpu transition-transform duration-500 origin-top animate-fade-in-up"
              style={{
                width: "210mm",
                minHeight: "297mm",
                transform: "scale(0.85)", // Default scale
              }}
            >
              {renderTemplate()}
              {/* Watermark removed or kept based on preference, assuming removed per 'Free' request */}
              {/* <Watermark /> */}
            </div>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-2xl rounded-full p-1.5 flex gap-1 z-50">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "editor"
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "preview"
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}

// Imports
import { EditorSidebar } from "@/components/ui/editor-sidebar";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
