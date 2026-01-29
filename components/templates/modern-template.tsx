import { ResumeContent } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export function ModernTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills } = data;

  return (
    <div className="w-full h-full bg-white text-gray-800 p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 font-medium mb-4">
          {(personalInfo as any).jobTitle || "Job Title"}
        </p>

        {/* Contact Info Grid */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{personalInfo.address}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Profile</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <span className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience (Placeholder for when we add the form) */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">{exp.position}</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills (Placeholder) */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}