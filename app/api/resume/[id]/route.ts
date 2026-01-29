import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { content } = body;

  await db
    .update(resumes)
    .set({
      content,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(resumes.id, Number(id)),
        eq(resumes.userId, session.user.id), // Security: Ensure ownership
      ),
    );

  return new Response("Saved", { status: 200 });
}
