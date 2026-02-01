import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import { users, resumes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ResumeProvider } from "@/context/resume-context";
import { EditorLayout } from "./editor-layout"; // We will create this next

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const [resume] = await db
    .select()
    .from(resumes)
    .where(
      and(eq(resumes.id, Number(id)), eq(resumes.userId, session.user.id)),
    );

  if (!resume) notFound();

  // Fetch true plan status from DB
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) notFound();

  return (
    <ResumeProvider
      initialData={resume.content as any}
      resumeId={resume.id}
      initialTemplate={resume.template}
      initialTitle={resume.title}
    >
      <EditorLayout resumeId={resume.id} isPro={user.plan === "pro"} />
    </ResumeProvider>
  );
}
