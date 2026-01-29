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
import { Download, Loader2, Save } from "lucide-react";
import { useState } from "react";

export function EditorLayout({
  resumeId,
  isPro,
}: {
  resumeId: number;
  isPro: boolean;
}) {
  const { resumeData, isSaving, templateName } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    // Check for Paid Templates
    const proTemplates = [
      "creative",
      "elegant",
      "technical",
      "bold",
      "academic",
    ];
    if (proTemplates.includes(templateName) && !isPro) {
      alert("This is a PRO template. Please upgrade to download.");
      return;
    }

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

  return (
    <div className="flex h-screen flex-col bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm z-10">
        <h1 className="text-lg font-bold text-gray-800">Resume Editor</h1>

        <div className="flex items-center gap-4">
          {/* Save Status Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Saved
              </>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading || isSaving}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Form Panel */}
        <div className="w-1/2 overflow-y-auto border-r bg-white p-8">
          <TemplateSelector isPro={isPro} />
          <hr className="my-6 border-gray-100" />
          <PersonalInfoForm />
          <EducationForm />
          <ExperienceForm />
          <ProjectsForm />
          <SkillsForm />
        </div>

        {/* RIGHT: Preview Panel */}
        <div className="w-1/2 overflow-y-auto bg-gray-100 p-8 flex justify-center">
          {/* A4 Paper Container */}
          <div
            className="w-[210mm] min-h-[297mm] bg-white shadow-xl rounded-sm overflow-hidden transform scale-90 origin-top relative"
            style={{
              // Ensure it keeps A4 aspect ratio look
              aspectRatio: "210/297",
            }}
          >
            {renderTemplate()}
            <Watermark />
          </div>
        </div>
      </div>
    </div>
  );
}
