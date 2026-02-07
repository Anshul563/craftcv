import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Plus, Trash2, FileText, Crown } from "lucide-react";
import { createResume, deleteResume } from "@/actions/resume";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/sign-in");

  // Fetch resumes sorted by newest first
  const userResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id))
    .orderBy(desc(resumes.updatedAt));

  // const isPro = session.user.plan === "pro";
  // If free, they can only create if they have 0 resumes
  const canCreate = true; 
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600 mb-2">
          Welcome back, {session.user.name.split(" ")[0]}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Ready to land your dream job? Manage your CVs and create new ones
          below.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Create New Card */}
        <form action={createResume} className="h-full">
          <button
            type="submit"
            className="group w-full h-full min-h-72 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-brand-400 hover:bg-brand-50/30 cursor-pointer"
          >
            <div className="p-4 rounded-full bg-brand-50 text-brand-600 group-hover:bg-brand-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Plus className="h-8 w-8" />
            </div>
            <div className="text-center px-4">
              <span className="font-bold text-gray-900 block text-lg group-hover:text-brand-700 transition-colors">
                Create New Resume
              </span>
              <span className="text-sm text-gray-500 mt-1 block">
                Start from scratch with a new template
              </span>
            </div>
          </button>
        </form>

        {/* Existing Resume Cards */}
        {userResumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}

// Import client component
import { ResumeCard } from "@/components/ui/resume-card";
