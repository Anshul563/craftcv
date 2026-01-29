import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

// Register a standard font (optional, using Helvetica by default)
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf" }, // Regular
    {
      src: "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf",
      fontWeight: 700,
    }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.5 },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#111",
    paddingBottom: 10,
  },
  name: { fontSize: 24, fontWeight: 700, textTransform: "uppercase" },
  jobTitle: { fontSize: 14, color: "#666", marginTop: 4 },
  contact: {
    flexDirection: "row",
    gap: 10,
    fontSize: 10,
    color: "#444",
    marginTop: 8,
  },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bold: { fontWeight: 700 },
  date: { color: "#666", fontSize: 10 },
  text: { marginBottom: 4 },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: "#000",
    borderRadius: "50%",
    marginRight: 5,
    marginTop: 5,
  },
  skillBadge: {
    backgroundColor: "#eee",
    padding: "2 6",
    borderRadius: 4,
    marginRight: 5,
    fontSize: 10,
  },
  watermark: {
    position: "absolute",
    top: 300,
    left: 100,
    fontSize: 60,
    color: "rgba(200, 200, 200, 0.3)",
    transform: "rotate(-45deg)",
  },
});

export const ModernPDF = ({
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
        {/* Watermark for Free Users */}
        {isFreePlan && <Text style={styles.watermark}>Built with CraftCV</Text>}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{(personalInfo as any).jobTitle}</Text>
          <View style={styles.contact}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>• {personalInfo.phone}</Text>}
            {personalInfo.address && <Text>• {personalInfo.address}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={{ fontStyle: "italic", marginBottom: 2 }}>
                  {exp.position}
                </Text>
                <Text>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects (New!) */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 8 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{proj.name}</Text>
                </View>
                {proj.url && (
                  <Text
                    style={{ color: "blue", fontSize: 10, marginBottom: 2 }}
                  >
                    {proj.url}
                  </Text>
                )}
                <Text>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{edu.school}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillBadge}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
