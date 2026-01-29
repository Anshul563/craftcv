import { ResumeContent } from "@/lib/types";

export function ElegantTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills } = data;

  return (
    <div
      className="w-full h-full bg-[#fdfbf7] text-[#1c1917] p-12 font-serif text-center"
      style={{ fontFamily: "Georgia, serif" }}
    >
      <header className="mb-10 border-b border-[#d6d3d1] pb-10">
        <h1 className="text-5xl font-normal mb-4 tracking-tight text-[#0c4a6e]">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg italic text-[#57534e]">
          {(personalInfo as any).jobTitle || "Professional Title"}
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm text-[#78716c] uppercase tracking-widest text-[10px]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-12 max-w-xl mx-auto">
          <p className="text-base leading-relaxed text-[#44403c]">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl italic text-[#0c4a6e] mb-8 relative inline-block px-4">
            <span className="relative z-10 bg-[#fdfbf7] px-4">Experience</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#d6d3d1] -z-10"></div>
          </h2>
          <div className="space-y-10 text-left max-w-2xl mx-auto">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-[#292524]">
                    {exp.company}
                  </h3>
                  <span className="text-xs italic text-[#a8a29e]">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-[#0c4a6e] font-bold text-sm mb-2">
                  {exp.position}
                </div>
                <p className="text-sm text-[#57534e] leading-7">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex justify-between max-w-2xl mx-auto text-left gap-10">
        {education && education.length > 0 && (
          <div className="flex-1">
            <h2 className="text-lg italic text-[#0c4a6e] mb-6 text-center">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4 text-center">
                <div className="font-bold text-[#292524]">{edu.school}</div>
                <div className="text-sm italic text-[#57534e]">
                  {edu.degree}
                </div>
                <div className="text-xs text-[#a8a29e] mt-1">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="flex-1">
            <h2 className="text-lg italic text-[#0c4a6e] mb-6 text-center">
              Expertise
            </h2>
            <div className="text-center">
              {skills.map((s, i) => (
                <span key={s.id} className="text-sm text-[#57534e]">
                  {s.name}
                  {i < skills.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
