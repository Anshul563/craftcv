"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { resumes, users } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createResume() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const userId = session.user.id;

  // 1. Get User Plan & Resume Count in parallel for speed
  const [userResult, resumeCountResult] = await Promise.all([
    db.select().from(users).where(eq(users.id, userId)),
    db.select({ count: count() }).from(resumes).where(eq(resumes.userId, userId))
  ]);

  const user = userResult[0];
  const resumeCount = resumeCountResult[0].count;

  // 2. Enforce Limit: Free users get max 1 resume
  // (We use >= 1 because the count is existing resumes)
  if (user.plan === "free" && resumeCount >= 1) {
    throw new Error("LIMIT_REACHED"); 
  }

  // 3. Create the Resume
  const [newResume] = await db
    .insert(resumes)
    .values({ 
      userId, 
      title: "Untitled Resume",
      content: {}, // Empty JSON start
    })
    .returning();

  revalidatePath("/dashboard");
  redirect(`/editor/${newResume.id}`);
}

export async function deleteResume(resumeId: number) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/sign-in");

    await db.delete(resumes)
        .where(eq(resumes.id, resumeId) && eq(resumes.userId, session.user.id));
    
    revalidatePath("/dashboard");
}