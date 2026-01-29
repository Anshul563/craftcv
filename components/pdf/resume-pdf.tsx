import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeContent } from "@/lib/types";
import { ModernPDF } from "./modern-pdf";
import { MinimalPDF } from "./minimal-pdf";
import { ProfessionalPDF } from "./professional-pdf";
import { CreativePDF } from "./creative-pdf";
import { ElegantPDF } from "./elegant-pdf";
import { TechnicalPDF } from "./technical-pdf";
import { BoldPDF } from "./bold-pdf";
import { AcademicPDF } from "./academic-pdf";

// Register fonts globally
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

interface ResumePDFProps {
  data: ResumeContent;
  isFreePlan: boolean;
  template?: string;
}

export const ResumePDF = ({
  data,
  isFreePlan,
  template = "modern",
}: ResumePDFProps) => {
  switch (template) {
    case "minimal":
      return <MinimalPDF data={data} isFreePlan={isFreePlan} />;
    case "professional":
      return <ProfessionalPDF data={data} isFreePlan={isFreePlan} />;
    case "creative":
      return <CreativePDF data={data} isFreePlan={isFreePlan} />;
    case "elegant":
      return <ElegantPDF data={data} isFreePlan={isFreePlan} />;
    case "technical":
      return <TechnicalPDF data={data} isFreePlan={isFreePlan} />;
    case "bold":
      return <BoldPDF data={data} isFreePlan={isFreePlan} />;
    case "academic":
      return <AcademicPDF data={data} isFreePlan={isFreePlan} />;
    case "modern":
    default:
      return <ModernPDF data={data} isFreePlan={isFreePlan} />;
  }
};
