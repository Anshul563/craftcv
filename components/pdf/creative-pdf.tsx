import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    borderTopWidth: 8,
    borderTopColor: "#ec4899",
  }, // Pink-500
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "black",
    color: "#db2777",
    textTransform: "lowercase",
    letterSpacing: -1,
  }, // Pink-600
  jobTitle: { fontSize: 12, color: "#666", fontWeight: "medium" },
  contact: { fontSize: 8, textAlign: "right", color: "#999" },

  grid: { flexDirection: "row", gap: 20 },
  leftCol: { width: "35%" },
  rightCol: { width: "65%" },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "black",
    color: "#ec4899",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  skillBadge: {
    backgroundColor: "#fce7f3",
    padding: "4 8",
    borderRadius: 10,
    marginBottom: 4,
    color: "#9d174d",
    fontSize: 8,
    alignSelf: "flex-start",
  }, // Pink-100/800

  expItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#fce7f3",
  },
  expCompany: { fontSize: 11, fontWeight: "bold", color: "#1f2937" },
  expRoleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  expRole: { fontSize: 9, color: "#ec4899", fontWeight: "bold" },
  expDate: { fontSize: 8, color: "#9ca3af" },
  expDesc: { fontSize: 9, color: "#4b5563", lineHeight: 1.4 },

  summaryBox: {
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    border: "0.5 solid #f3f4f6",
  },

  watermark: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 8,
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

export const CreativePDF = ({
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
          <View>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.jobTitle}>
              {(personalInfo as any).jobTitle}
            </Text>
          </View>
          <View style={styles.contact}>
            <Text>{personalInfo.email}</Text>
            <Text>{personalInfo.phone}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.leftCol}>
            {skills && skills.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}
                >
                  {skills.map((s) => (
                    <Text key={s.id} style={styles.skillBadge}>
                      {s.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {education && education.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((e) => (
                  <View key={e.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      {e.school}
                    </Text>
                    <Text
                      style={{ fontSize: 8, color: "#aaa", marginBottom: 2 }}
                    >
                      {e.startDate} - {e.endDate}
                    </Text>
                    <Text style={{ fontSize: 9, color: "#db2777" }}>
                      {e.degree}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightCol}>
            {personalInfo.summary && (
              <View style={styles.summaryBox}>
                <Text style={{ fontSize: 9, color: "#555" }}>
                  {personalInfo.summary}
                </Text>
              </View>
            )}

            {experience && experience.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    <View style={styles.expRoleRow}>
                      <Text style={styles.expRole}>{exp.position}</Text>
                      <Text style={styles.expDate}>
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.expDesc}>{exp.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
