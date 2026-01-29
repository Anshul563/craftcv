import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v40/TK3iWkUHHAIjg75oxSD03E0.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Oswald",
    borderLeftWidth: 15,
    borderLeftColor: "#e11d48",
    paddingLeft: 25,
  },
  header: { marginBottom: 30 },
  name: { fontSize: 40, textTransform: "uppercase", marginBottom: 5 },
  jobBox: {
    backgroundColor: "#e11d48",
    padding: "5 10",
    alignSelf: "flex-start",
    transform: "skew(-10deg)",
  },
  jobTitle: { color: "white", fontSize: 14, textTransform: "uppercase" },
  contact: {
    marginTop: 15,
    fontSize: 10,
    color: "#666",
    textTransform: "uppercase",
    flexDirection: "row",
    gap: 10,
  },

  colRow: { flexDirection: "row", gap: 25 },
  left: { width: "55%" },
  right: { width: "45%" },

  sectionTitle: {
    fontSize: 16,
    textTransform: "uppercase",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    marginBottom: 15,
    alignSelf: "flex-start",
    paddingBottom: 2,
  },

  expItem: { marginBottom: 15 },
  expComp: { fontSize: 14, textTransform: "uppercase" },
  expRole: {
    fontSize: 10,
    color: "#e11d48",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#444",
    lineHeight: 1.4,
  },

  skillItem: {
    backgroundColor: "#f3f4f6",
    padding: 5,
    marginBottom: 5,
    borderLeftWidth: 3,
    borderLeftColor: "#e11d48",
    fontSize: 10,
    textTransform: "uppercase",
  },

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

export const BoldPDF = ({
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
          <View style={styles.jobBox}>
            <Text style={styles.jobTitle}>
              {(personalInfo as any).jobTitle}
            </Text>
          </View>
          <View style={styles.contact}>
            <Text>{personalInfo.email}</Text>
            <Text>/</Text>
            <Text>{personalInfo.phone}</Text>
          </View>
        </View>

        <View style={styles.colRow}>
          <View style={styles.left}>
            {personalInfo.summary && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Helvetica",
                    lineHeight: 1.5,
                  }}
                >
                  {personalInfo.summary}
                </Text>
              </View>
            )}

            {experience && experience.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.expComp}>{exp.company}</Text>
                    <Text style={styles.expRole}>
                      {exp.position} // {exp.startDate}-{exp.endDate}
                    </Text>
                    <Text style={styles.expDesc}>{exp.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.right}>
            {skills && skills.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {skills.map((s) => (
                  <Text key={s.id} style={styles.skillItem}>
                    {s.name}
                  </Text>
                ))}
              </View>
            )}

            {education && education.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 12 }}>{edu.school}</Text>
                    <Text style={{ fontSize: 10, color: "#666" }}>
                      {edu.degree}
                    </Text>
                    <Text style={{ fontSize: 9, color: "#999" }}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
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
