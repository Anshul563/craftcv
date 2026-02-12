export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  linkedin?: string;
  website?: string;
  photo?: string;
}

// The Main Object stored in DB
export interface ResumeContent {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  skills: Skill[];
  sectionOrder: string[]; // Order of sections (e.g., ["education", "experience", "skills", "projects"])
}

export interface Language {
  id: string;
  name: string;
  level: "Basic" | "Conversational" | "Fluent" | "Native";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

// Default empty state
export const initialResumeState: ResumeContent = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  sectionOrder: ["experience", "education", "skills", "projects"],
};
