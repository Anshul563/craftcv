import { ResumeContent } from "@/lib/types";

export function AcademicTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full h-full bg-white text-black p-12 font-serif text-sm leading-normal"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <header className="text-center mb-8 border-b-2 border-black pb-4 relative min-h-[140px]">
        {personalInfo.photo && (
          <div className="absolute top-0 right-0 hidden md:block">
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-24 h-32 object-cover border border-gray-300 p-1 bg-white"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold uppercase mb-2 pt-4">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-2">
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </header>

      {/* Education First for Academic */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold uppercase border-b border-black mb-4">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 grid grid-cols-12">
              <div className="col-span-12 md:col-span-9 font-bold">
                {edu.school},{" "}
                <span className="font-normal italic">{edu.degree}</span>
              </div>
              <div className="col-span-12 md:col-span-3 text-right">
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
          ))}
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold uppercase border-b border-black mb-4">
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-bold">{exp.company}</div>
                <div>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
              </div>
              <div className="italic mb-1">{exp.position}</div>
              <p className="text-justify">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold uppercase border-b border-black mb-4">
            Projects
          </h2>
          {projects.map((p) => (
            <div key={p.id} className="mb-3">
              <div className="font-bold inline-block mr-2">{p.name}</div>
              {p.url && (
                <a
                  href={p.url}
                  className="text-brand-800 underline inline-block mr-2 text-xs"
                >
                  [{p.url}]
                </a>
              )}
              <span className="">- {p.description}</span>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section>
          <h2 className="font-bold uppercase border-b border-black mb-4">
            Skills
          </h2>
          <div>
            {skills.map((s, i) => (
              <span key={s.id}>
                {s.name}
                {i < skills.length - 1 ? "; " : ""}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
