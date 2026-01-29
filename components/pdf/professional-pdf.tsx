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

const styles = StyleSheet.create({
  // ... existing styles ...
  page: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    fontFamily: "Helvetica",
    fontSize: 11,
  },
  leftPlugin: {
    width: "35%",
    backgroundColor: "#2d3748",
    color: "white",
    padding: 20,
    height: "100%",
  },
  rightPlugin: { width: "65%", padding: 20 },

  // Left Sidebar Styles
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    alignSelf: "center",
    objectFit: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 12,
    color: "#cbd5e0",
    marginBottom: 20,
    textAlign: "center",
  },
  sidebarSection: { marginBottom: 20 },
  // ...
  // ...
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#4a5568",
    paddingBottom: 5,
    marginBottom: 10,
    color: "#a0aec0",
  },
  contactItem: { fontSize: 10, marginBottom: 5, color: "#e2e8f0" },
  skillItem: { fontSize: 10, marginBottom: 3, color: "#e2e8f0" },

  // Right Content Styles
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2d3748",
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 5,
    marginBottom: 10,
  },
  entryTitle: { fontSize: 12, fontWeight: "bold", color: "#1a202c" },
  entrySub: {
    fontSize: 10,
    color: "#718096",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryDesc: { fontSize: 10, lineHeight: 1.5, color: "#4a5568" },

  watermark: {
    position: "absolute",
    top: 300,
    left: 100,
    fontSize: 60,
    color: "rgba(200, 200, 200, 0.3)",
    transform: "rotate(-45deg)",
  },
});

export const ProfessionalPDF = ({
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
        {/* Left Sidebar */}
        <View style={styles.leftPlugin}>
          <View style={{ marginBottom: 20 }}>
            {personalInfo.photo && (
              <Image src={personalInfo.photo} style={styles.profileImage} />
            )}
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.jobTitle}>
              {(personalInfo as any).jobTitle}
            </Text>
          </View>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {personalInfo.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo.address && (
              <Text style={styles.contactItem}>{personalInfo.address}</Text>
            )}
          </View>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skills.map((s) => (
                <Text key={s.id} style={styles.skillItem}>
                  {s.name}
                </Text>
              ))}
            </View>
          )}

          {/* Education (Sidebar) */}
          {education && education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 10, color: "white" }}
                  >
                    {edu.school}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#cbd5e0" }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#a0aec0" }}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Content */}
        <View style={styles.rightPlugin}>
          {/* Watermark for Free Users */}
          {isFreePlan && (
            <Text style={styles.watermark}>Built with CraftCV</Text>
          )}

          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.entryDesc}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <Text style={styles.entryTitle}>{exp.company}</Text>
                  <View style={styles.entrySub}>
                    <Text style={{ fontStyle: "italic" }}>{exp.position}</Text>
                    <Text>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.entryDesc}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 10 }}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>
                  {proj.url && (
                    <Text style={{ color: "blue", fontSize: 9 }}>
                      {proj.url}
                    </Text>
                  )}
                  <Text style={styles.entryDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
