import { ResumeContent } from "@/lib/types";

export function CreativeTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 font-sans border-t-8 border-pink-500">
      <header className="flex justify-between items-end mb-10">
        <div className="flex items-center gap-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-lg object-cover border-4 border-pink-100 shadow-sm"
            />
          )}
          <div>
            <h1 className="text-4xl font-black text-pink-600 mb-2 lowercase tracking-tighter">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {(personalInfo as any).jobTitle || "Creative Developer"}
            </p>
          </div>
        </div>
        <div className="text-right text-xs font-bold text-gray-400">
          {personalInfo.email && (
            <div className="mb-1">{personalInfo.email}</div>
          )}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          {skills && skills.length > 0 && (
            <section className="mb-10">
              <h3 className="text-pink-500 font-black uppercase text-sm mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-pink-100 text-pink-800 px-2 py-1 text-xs font-bold rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section className="mb-10">
              <h3 className="text-pink-500 font-black uppercase text-sm mb-4">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="font-bold text-gray-800 leading-tight">
                    {edu.school}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {edu.startDate} - {edu.endDate}
                  </div>
                  <div className="text-sm text-pink-600">{edu.degree}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-8">
          {personalInfo.summary && (
            <section className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section className="mb-10">
              <h3 className="text-pink-500 font-black uppercase text-sm mb-6">
                Work Experience
              </h3>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="mb-6 relative pl-6 border-l-2 border-pink-100"
                >
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-pink-400"></div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {exp.company}
                  </h4>
                  <div className="text-sm font-bold text-pink-500 mb-2 flex justify-between">
                    <span>{exp.position}</span>
                    <span className="text-gray-400 font-normal text-xs">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
