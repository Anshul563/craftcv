import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

// Fonts already registered in ResumePDF mainly, but we can re-use or re-register.
// Ideally we register fonts once at app root or in the main PDF generator,
// but React-PDF registers globally so it should be fine if main ResumePDF is initialized.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.6,
    color: "#333",
  },
  header: { marginBottom: 20, textAlign: "center" },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    objectFit: "cover",
    alignSelf: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "light",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 10,
    color: "#777",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 9,
    color: "#555",
  },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  row: { flexDirection: "row", marginBottom: 3 },
  leftCol: {
    width: "20%",
    textAlign: "right",
    paddingRight: 10,
    fontSize: 9,
    color: "#777",
  },
  rightCol: { width: "80%" },
  bold: { fontWeight: "bold", color: "#000", fontSize: 12 },
  italic: { fontStyle: "italic", fontSize: 10, color: "#555", marginBottom: 2 },
  text: { marginBottom: 4 },
  skill: { marginRight: 8, fontSize: 10 },
  watermark: {
    position: "absolute",
    bottom: 30, // Bottom right as requested for template watermark? Or global?
    // User asked for "particular template and watermark show in bottom right corner"
    // The previous watermark was big and center. Let's make this one small bottom right as requested.
    right: 30,
    fontSize: 10,
    color: "rgba(100, 100, 100, 0.5)",
  },
  watermarkBig: {
    position: "absolute",
    top: 300,
    left: 100,
    fontSize: 60,
    color: "rgba(200, 200, 200, 0.3)",
    transform: "rotate(-45deg)",
  },
});

export const MinimalPDF = ({
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
        {/* Watermark */}
        {isFreePlan && (
          <Text style={styles.watermarkBig}>Built with CraftCV</Text>
        )}

        {/* Header */}
        <View style={styles.header}>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.profileImage} />
          )}
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{(personalInfo as any).jobTitle}</Text>
          <View style={styles.contact}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.address && <Text>{personalInfo.address}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={[styles.section, { alignItems: "center" }]}>
            <Text
              style={{
                textAlign: "center",
                fontStyle: "italic",
                maxWidth: "80%",
              }}
            >
              {personalInfo.summary}
            </Text>
            <View
              style={{
                width: 50,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                marginTop: 10,
              }}
            />
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.row}>
                <Text style={styles.leftCol}>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </Text>
                <View style={styles.rightCol}>
                  <Text style={styles.bold}>{exp.company}</Text>
                  <Text style={styles.italic}>{exp.position}</Text>
                  <Text>{exp.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.row}>
                <View style={styles.leftCol}></View>
                <View style={styles.rightCol}>
                  <Text style={styles.bold}>{proj.name}</Text>
                  {proj.url && (
                    <Text style={{ color: "blue", fontSize: 9 }}>
                      {proj.url}
                    </Text>
                  )}
                  <Text>{proj.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.row}>
                <Text style={styles.leftCol}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                <View style={styles.rightCol}>
                  <Text style={styles.bold}>{edu.school}</Text>
                  <Text>{edu.degree}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>
                  {skill.name} •
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
