import { ResumeContent } from "@/lib/types";

export function TechnicalTemplate({ data }: { data: ResumeContent }) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-8 font-mono text-sm leading-6"
      style={{ fontFamily: "Courier Prime, monospace" }}
    >
      <header className="border-b border-[#404040] pb-6 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl text-[#569cd6] mb-2">
            <span className="text-[#c586c0]">const</span> Developer ={" "}
            <span className="text-[#ce9178]">{`"${personalInfo.fullName}"`}</span>
            ;
          </h1>
          <p className="text-[#6a9955] text-xs">
            // {(personalInfo as any).jobTitle || "Full Stack Engineer"}
          </p>

          <div className="mt-4 text-xs text-[#9cdcfe] flex flex-wrap gap-4">
            {personalInfo.email && <span>email: "{personalInfo.email}"</span>}
            {personalInfo.phone && <span>phone: "{personalInfo.phone}"</span>}
          </div>
        </div>
        {personalInfo.photo && (
          <div className="border border-[#404040] p-1 bg-[#252526]">
            <img
              src={personalInfo.photo}
              alt="profile"
              className="w-24 h-24 object-cover grayscale opacity-90"
            />
          </div>
        )}
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Col */}
        <div className="col-span-8">
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[#c586c0] mb-4">
                function getExperience() {"{"}
              </h2>
              <div className="pl-4 border-l border-[#333] space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#4ec9b0]">{exp.company}</span>
                      <span className="text-[#808080]">::</span>
                      <span className="text-[#dcdcaa]">{exp.position}</span>
                    </div>
                    <div className="text-[#6a9955] text-xs mb-2">
                      // {exp.startDate} -{" "}
                      {exp.current ? "Present" : exp.endDate}
                    </div>
                    <p className="text-[#ce9178]">"{exp.description}"</p>
                  </div>
                ))}
              </div>
              <div className="text-[#c586c0] mt-4">{"}"}</div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[#c586c0] mb-4">const projects = [</h2>
              <div className="pl-4 space-y-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#252526] p-3 rounded border border-[#333]"
                  >
                    <div className="text-[#4ec9b0] font-bold">{p.name}</div>
                    {p.url && (
                      <a
                        href={p.url}
                        className="text-[#9cdcfe] text-xs underline"
                      >
                        {p.url}
                      </a>
                    )}
                    <p className="text-[#ce9178] mt-1">"{p.description}"</p>
                  </div>
                ))}
              </div>
              <div className="text-[#c586c0] mt-2">];</div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          {skills && skills.length > 0 && (
            <section className="mb-8 bg-[#252526] p-4 rounded border border-[#333]">
              <h2 className="text-[#569cd6] text-xs mb-3">
                dependencies: {"{"}
              </h2>
              <div className="pl-2 space-y-1">
                {skills.map((s) => (
                  <div key={s.id} className="flex justify-between text-xs">
                    <span className="text-[#9cdcfe]">"{s.name}"</span>:{" "}
                    <span className="text-[#b5cea8]">"latest"</span>,
                  </div>
                ))}
              </div>
              <div className="text-[#569cd6] text-xs mt-3">{"}"}</div>
            </section>
          )}

          {education && education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-[#c586c0] mb-2">class Education {"{"}</h2>
              {education.map((edu) => (
                <div key={edu.id} className="pl-2 mb-4">
                  <div className="text-[#4ec9b0]">constructor() {"{"}</div>
                  <div className="pl-4">
                    <div className="text-[#9cdcfe]">
                      this.school = "{edu.school}";
                    </div>
                    <div className="text-[#9cdcfe]">
                      this.degree = "{edu.degree}";
                    </div>
                    <div className="text-[#9cdcfe]">
                      this.year = "{edu.startDate}";
                    </div>
                  </div>
                  <div className="text-[#4ec9b0]">{"}"}</div>
                </div>
              ))}
              <div className="text-[#c586c0]">{"}"}</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
