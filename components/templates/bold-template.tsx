import { ResumeContent } from "@/lib/types";

export function BoldTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills } = data;

  return (
    <div
      className="w-full h-full bg-white text-gray-900 p-10 font-sans border-rose-600"
      style={{ fontFamily: "Impact, sans-serif", borderLeftWidth: "20px" }}
    >
      <header className="mb-12">
        <h1
          className="text-6xl font-black uppercase text-gray-900 tracking-tighter mb-2"
          style={{ fontFamily: "Impact, sans-serif" }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="bg-rose-600 text-white inline-block px-4 py-1 text-xl font-bold uppercase tracking-widest transform -skew-x-12">
          {(personalInfo as any).jobTitle || "ROLE TITLE"}
        </div>

        <div className="mt-6 flex gap-6 text-sm font-bold text-gray-500 uppercase tracking-tight">
          {personalInfo.email} / {personalInfo.phone}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-12">
        <div>
          {personalInfo.summary && (
            <section className="mb-10">
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 inline-block">
                Profile
              </h3>
              <p
                className="text-lg font-medium leading-tight text-gray-600"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section>
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-gray-900 inline-block">
                Experience
              </h3>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-8">
                  <h4 className="text-xl font-black uppercase">
                    {exp.company}
                  </h4>
                  <div className="text-rose-600 font-bold uppercase text-sm mb-2">
                    {exp.position} // {exp.startDate}-{exp.endDate}
                  </div>
                  <p
                    className="text-gray-600 font-medium"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {skills && skills.length > 0 && (
            <section className="mb-10">
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 inline-block">
                Skills
              </h3>
              <div className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-gray-100 p-2 font-bold uppercase text-sm border-l-4 border-rose-600"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-gray-900 inline-block">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-6">
                  <h4 className="font-black uppercase text-lg">{edu.school}</h4>
                  <div className="text-gray-500 font-bold uppercase text-sm">
                    {edu.degree}
                  </div>
                  <div className="text-gray-400 font-bold text-xs">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
