import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { resumes, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import ReactPDF from "@react-pdf/renderer";
import { ResumePDF } from "@/components/pdf/resume-pdf";
import { ResumeContent } from "@/lib/types";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new Response("Unauthorized", { status: 401 });

  const userId = session.user.id;
  const resumeId = Number(id);

  // 1. Fetch Resume AND User Plan
  const [resume] = await db
    .select()
    .from(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)));

  if (!resume) return new Response("Not Found", { status: 404 });

  const [user] = await db.select().from(users).where(eq(users.id, userId));

  // 2. Determine Watermark Status
  // Force remove ads/watermark
  let isFreePlan = false;

  // 3. Render PDF Stream
  const stream = await ReactPDF.renderToStream(
    <ResumePDF
      data={resume.content as ResumeContent}
      isFreePlan={isFreePlan}
      template={resume.template}
    />,
  );

  // 4. Return as PDF
  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resume.title || "resume"}.pdf"`,
    },
  });
}
