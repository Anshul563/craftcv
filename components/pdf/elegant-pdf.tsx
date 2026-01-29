import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

// Register Serif Font

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
    backgroundColor: "#fffbf7",
    color: "#1c1917",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d3d1",
    paddingBottom: 20,
  },
  name: { fontSize: 32, color: "#0c4a6e", marginBottom: 5 },
  jobTitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#57534e",
    marginBottom: 15,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 8,
    color: "#78716c",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#0c4a6e",
    textAlign: "center",
    marginBottom: 15,
  },

  // Experience
  expItem: { marginBottom: 15 },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
  },
  expCompany: { fontSize: 12, fontWeight: "bold" },
  expDate: { fontSize: 9, fontStyle: "italic", color: "#a8a29e" },
  expRole: {
    fontSize: 10,
    color: "#0c4a6e",
    marginBottom: 3,
    fontWeight: "bold",
  },
  expDesc: { fontSize: 10, lineHeight: 1.6, color: "#44403c" },

  // Two col bottom
  bottomRow: { flexDirection: "row", gap: 30 },
  col: { width: "50%" },

  eduItem: { alignItems: "center", marginBottom: 10 },

  watermark: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 9,
    color: "rgba(100, 100, 100, 0.4)",
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

export const ElegantPDF = ({
  data,
  isFreePlan,
}: {
  data: ResumeContent;
  isFreePlan: boolean;
}) => {
  const { personalInfo, education, experience, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {isFreePlan && (
          <Text style={styles.watermarkBig}>Built with CraftCV</Text>
        )}

        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{(personalInfo as any).jobTitle}</Text>
          <View style={styles.contact}>
            <Text>{personalInfo.email}</Text>
            <Text>{personalInfo.phone}</Text>
            <Text>{personalInfo.address}</Text>
          </View>
        </View>

        {personalInfo.summary && (
          <View style={[styles.section, { paddingHorizontal: 40 }]}>
            <Text
              style={{
                fontSize: 11,
                textAlign: "center",
                lineHeight: 1.5,
                color: "#44403c",
              }}
            >
              {personalInfo.summary}
            </Text>
          </View>
        )}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDate}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.expRole}>{exp.position}</Text>
                <Text style={styles.expDesc}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.bottomRow}>
          {education && education.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                    {edu.school}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontStyle: "italic",
                      color: "#57534e",
                    }}
                  >
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#a8a29e" }}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {skills && skills.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>Expertise</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {skills.map((s, i) => (
                  <Text key={s.id} style={{ fontSize: 10, color: "#57534e" }}>
                    {s.name}
                    {i < skills.length - 1 ? ", " : ""}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
