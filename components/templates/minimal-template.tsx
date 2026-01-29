import { ResumeContent } from "@/lib/types";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export function MinimalTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full h-full bg-white text-gray-800 p-10 font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Centered Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2 uppercase tracking-widest">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">
          {(personalInfo as any).jobTitle || "Job Title"}
        </p>

        {/* Contact Separated by Dots */}
        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <span className="before:content-['•'] before:mr-3">
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="before:content-['•'] before:mr-3">
              {personalInfo.address}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8 max-w-2xl mx-auto text-center">
          <p className="text-gray-700 leading-relaxed italic">
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Divider */}
      <hr className="border-t border-gray-200 w-1/3 mx-auto mb-8" />

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="text-gray-500 text-sm md:text-right">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <p className="text-sm italic text-gray-600 mb-2">
                    {exp.position}
                  </p>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="text-gray-500 text-sm md:text-right hidden md:block">
                  {/* No dates for projects usually, keep empty column for alignment */}
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-gray-900">{proj.name}</h3>
                  {proj.url && (
                    <a
                      href={proj.url}
                      className="text-xs text-blue-500 mb-1 block"
                    >
                      {proj.url}
                    </a>
                  )}
                  <p className="text-sm text-gray-700">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="text-gray-500 text-sm md:text-right">
                  {edu.startDate} - {edu.endDate}
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8 text-center">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm text-gray-700 border-b border-gray-300 pb-0.5"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
