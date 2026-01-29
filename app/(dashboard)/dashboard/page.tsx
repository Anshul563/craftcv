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
    headers: await headers()
  });

  if (!session) return redirect("/sign-in");

  // Fetch resumes sorted by newest first
  const userResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id))
    .orderBy(desc(resumes.updatedAt));

  const isPro = session.user.plan === "pro";
  // If free, they can only create if they have 0 resumes
  const canCreate = isPro || userResumes.length < 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-500 mt-1">Manage your CVs and cover letters.</p>
        </div>
        {!isPro && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Crown className="h-4 w-4" />
            <span>Free Plan: 1 Resume Limit</span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Create New Card */}
        <form action={createResume}>
          <button
            type="submit"
            disabled={!canCreate}
            className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-all
              ${canCreate 
                ? "border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer" 
                : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
              }`}
          >
            <div className={`p-3 rounded-full ${canCreate ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400"}`}>
              <Plus className="h-8 w-8" />
            </div>
            <div className="text-center">
              <span className="font-semibold text-gray-900 block">Create New Resume</span>
              {!canCreate && <span className="text-xs text-red-500 font-medium mt-1">Limit Reached</span>}
            </div>
          </button>
        </form>

        {/* Existing Resume Cards */}
        {userResumes.map((resume) => (
          <div key={resume.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
            
            {/* Clickable Area */}
            <Link href={`/editor/${resume.id}`} className="block h-full">
              <div className="h-40 bg-gray-100 flex items-center justify-center border-b border-gray-100">
                <FileText className="h-12 w-12 text-gray-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{resume.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Edited {new Date(resume.updatedAt!).toLocaleDateString()}
                </p>
              </div>
            </Link>

            {/* Delete Action */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
              <form action={async () => {
                "use server";
                await deleteResume(resume.id);
              }}>
                <button type="submit" className="p-2 bg-white/90 backdrop-blur text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 shadow-sm transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}