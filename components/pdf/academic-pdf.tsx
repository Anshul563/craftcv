import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";

// Standard fonts (Times-Roman) are built-in.

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    textTransform: "uppercase",
    marginBottom: 5,
    fontFamily: "Times-Bold",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 10,
  },

  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bold: { fontFamily: "Times-Bold" },
  italic: { fontStyle: "italic" },

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

export const AcademicPDF = ({
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
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contact}>
            <Text>{personalInfo.address}</Text>
            <Text> | </Text>
            <Text>{personalInfo.email}</Text>
            <Text> | </Text>
            <Text>{personalInfo.phone}</Text>
          </View>
        </View>

        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 5 }}>
                <View style={styles.row}>
                  <Text>
                    <Text style={styles.bold}>{edu.school}</Text>,{" "}
                    <Text style={styles.italic}>{edu.degree}</Text>
                  </Text>
                  <Text>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{exp.company}</Text>
                  <Text>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={[styles.italic, { marginBottom: 2 }]}>
                  {exp.position}
                </Text>
                <Text style={{ textAlign: "justify" }}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p) => (
              <View key={p.id} style={{ marginBottom: 4 }}>
                <Text>
                  <Text style={styles.bold}>{p.name}</Text>
                  {p.url && (
                    <Text style={{ color: "blue", fontSize: 9 }}>
                      {" "}
                      [{p.url}]
                    </Text>
                  )}
                  <Text> - {p.description}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {skills.map((s, i) => (
                <Text key={s.id}>
                  {s.name}
                  {i < skills.length - 1 ? "; " : ""}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
