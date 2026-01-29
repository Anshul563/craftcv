import { ResumeContent } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export function ProfessionalTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full h-full bg-slate-50 text-gray-800 flex"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-slate-800 text-white p-6 flex flex-col gap-6">
        {/* Photo */}
        {personalInfo.photo && (
          <div className="mb-4 flex justify-center">
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-600 shadow-lg"
            />
          </div>
        )}

        {/* Header in Sidebar */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold leading-tight mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-slate-300 font-medium">
            {(personalInfo as any).jobTitle || "Job Title"}
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-sm space-y-3">
          {personalInfo.email && (
            <div className="break-all">
              <span className="block text-xs uppercase text-slate-400 mb-1">
                Email
              </span>
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <span className="block text-xs uppercase text-slate-400 mb-1">
                Phone
              </span>
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div>
              <span className="block text-xs uppercase text-slate-400 mb-1">
                Address
              </span>
              {personalInfo.address}
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-600 pb-1">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education in Sidebar */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-600 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-white text-sm">
                    {edu.school}
                  </div>
                  <div className="text-xs text-slate-300">{edu.degree}</div>
                  <div className="text-xs text-slate-400">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-1">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-slate-900">
                      {exp.company}
                    </h3>
                    <span className="text-xs text-gray-500 font-mono">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-2">
                    {exp.position}
                  </div>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-slate-900">{proj.name}</h3>
                  {proj.url && (
                    <a
                      href={proj.url}
                      className="text-xs text-blue-600 mb-1 block"
                    >
                      {proj.url}
                    </a>
                  )}
                  <p className="text-sm text-gray-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
