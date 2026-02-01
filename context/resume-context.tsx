"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ResumeContent, initialResumeState } from "@/lib/types";
// import { useDebounce } from "@/lib/hooks";

interface ResumeContextType {
  resumeData: ResumeContent;
  updateResumeData: (newData: Partial<ResumeContent>) => void;
  isSaving: boolean;
  templateName: string;
  setTemplateName: (name: string) => void;
  resumeTitle: string;
  setResumeTitle: (title: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
  initialData,
  resumeId,
  initialTemplate,
  initialTitle,
}: {
  children: React.ReactNode;
  initialData: ResumeContent;
  resumeId: number;
  initialTemplate?: string;
  initialTitle?: string;
}) {
  const [resumeData, setResumeData] = useState<ResumeContent>({
    ...initialResumeState,
    ...initialData,
    personalInfo: {
      ...initialResumeState.personalInfo,
      ...(initialData?.personalInfo || {}),
    },
  });
  const [resumeTitle, setResumeTitle] = useState(
    initialTitle || "Untitled Resume",
  );
  const [templateName, setTemplateName] = useState(initialTemplate || "modern");
  const [isSaving, setIsSaving] = useState(false);

  // Auto-Save Logic using Debounce
  // We don't want to save on every keystroke, but 1s after the user stops typing.
  useEffect(() => {
    const saveToDb = async () => {
      setIsSaving(true);
      try {
        await fetch(`/api/resume/${resumeId}`, {
          method: "PATCH",
          body: JSON.stringify({
            content: resumeData,
            template: templateName,
            title: resumeTitle,
          }),
        });
      } catch (error) {
        console.error("Failed to save", error);
      } finally {
        setIsSaving(false);
      }
    };

    const timeout = setTimeout(saveToDb, 1000); // 1 second debounce
    return () => clearTimeout(timeout);
  }, [resumeData, templateName, resumeTitle, resumeId]);

  const updateResumeData = useCallback((newData: Partial<ResumeContent>) => {
    setResumeData((prev) => ({ ...prev, ...newData }));
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        isSaving,
        templateName,
        setTemplateName,
        resumeTitle,
        setResumeTitle,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
