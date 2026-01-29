import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

// Standard font, no need to register usually, or register with src if custom.
// For standard 'Courier', we can just use it.

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Courier-Oblique",
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
    paddingBottom: 10,
  },

  // Syntax Highlight Colors
  keyword: { color: "#c586c0" }, // purple
  string: { color: "#ce9178" }, // orange
  variable: { color: "#9cdcfe" }, // light blue
  comment: { color: "#6a9955" }, // green
  function: { color: "#dcdcaa" }, // yellow
  class: { color: "#4ec9b0" }, // teal
  number: { color: "#b5cea8" }, // light green

  nameLine: { fontSize: 16, marginBottom: 5 },
  jobLine: { fontSize: 10, color: "#6a9955", marginBottom: 10 },
  contactLine: { flexDirection: "row", gap: 10, fontSize: 9, color: "#9cdcfe" },

  grid: { flexDirection: "row", gap: 20 },
  mainCol: { width: "65%" },
  sideCol: { width: "35%" },

  block: { marginBottom: 15 },
  blockTitle: { color: "#c586c0", marginBottom: 5 },
  indent: { paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: "#333" },

  expItem: { marginBottom: 10 },
  projItem: {
    marginBottom: 8,
    padding: 5,
    backgroundColor: "#252526",
    borderRadius: 2,
  },

  watermark: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.1)",
  },
  watermarkBig: {
    position: "absolute",
    top: 300,
    left: 100,
    fontSize: 60,
    color: "rgba(255, 255, 255, 0.05)",
    transform: "rotate(-45deg)",
  },
});

export const TechnicalPDF = ({
  data,
  isFreePlan,
}: {
  data: ResumeContent;
  isFreePlan: boolean;
}) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {isFreePlan && (
          <Text style={styles.watermarkBig}>Built with CraftCV</Text>
        )}

        <View style={styles.header}>
          <Text style={styles.nameLine}>
            <Text style={styles.keyword}>const</Text> Developer ={" "}
            <Text style={styles.string}>"{personalInfo.fullName}"</Text>;
          </Text>
          <Text style={styles.jobLine}>
            // {(personalInfo as any).jobTitle}
          </Text>
          <View style={styles.contactLine}>
            {personalInfo.email && <Text>email: "{personalInfo.email}"</Text>}
            {personalInfo.phone && <Text>phone: "{personalInfo.phone}"</Text>}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.mainCol}>
            {experience && experience.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.blockTitle}>
                  function getExperience() {"{"}
                </Text>
                <View style={styles.indent}>
                  {experience.map((exp) => (
                    <View key={exp.id} style={styles.expItem}>
                      <Text>
                        <Text style={styles.class}>{exp.company}</Text>{" "}
                        <Text style={{ color: "#808080" }}>::</Text>{" "}
                        <Text style={styles.function}>{exp.position}</Text>
                      </Text>
                      <Text style={[styles.comment, { fontSize: 8 }]}>
                        // {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </Text>
                      <Text style={styles.string}>"{exp.description}"</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.blockTitle}>{"}"}</Text>
              </View>
            )}

            {projects && projects.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.blockTitle}>const projects = [</Text>
                <View style={styles.indent}>
                  {projects.map((p) => (
                    <View key={p.id} style={styles.projItem}>
                      <Text style={[styles.class, { fontWeight: "bold" }]}>
                        {p.name}
                      </Text>
                      <Text style={styles.string}>"{p.description}"</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.blockTitle}>];</Text>
              </View>
            )}
          </View>

          <View style={styles.sideCol}>
            {skills && skills.length > 0 && (
              <View
                style={[
                  styles.block,
                  { backgroundColor: "#252526", padding: 5 },
                ]}
              >
                <Text style={[styles.variable, { marginBottom: 5 }]}>
                  dependencies: {"{"}
                </Text>
                {skills.map((s) => (
                  <Text key={s.id} style={{ fontSize: 9, marginBottom: 2 }}>
                    <Text style={styles.variable}>"{s.name}"</Text>:{" "}
                    <Text style={styles.number}>"latest"</Text>,
                  </Text>
                ))}
                <Text style={styles.variable}>{"}"}</Text>
              </View>
            )}

            {education && education.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.blockTitle}>class Education {"{"}</Text>
                {education.map((edu) => (
                  <View
                    key={edu.id}
                    style={{ paddingLeft: 5, marginBottom: 5 }}
                  >
                    <Text style={styles.class}>constructor() {"{"}</Text>
                    <View style={{ paddingLeft: 5 }}>
                      <Text style={styles.variable}>
                        this.school = "{edu.school}";
                      </Text>
                      <Text style={styles.variable}>
                        this.degree = "{edu.degree}";
                      </Text>
                    </View>
                    <Text style={styles.class}>{"}"}</Text>
                  </View>
                ))}
                <Text style={styles.blockTitle}>{"}"}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
