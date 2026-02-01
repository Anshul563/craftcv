"use client";

import Link from "next/link";
import { FileText, Trash2 } from "lucide-react";
import { deleteResume } from "@/actions/resume"; // You might need to change how this is imported in client components

// We need to pass the resume object.
// Defining a simple interface here or importing it would be best.
interface ResumeCardProps {
  resume: {
    id: number;
    title: string;
    updatedAt: Date | null;
  };
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-brand-200 hover:-translate-y-1">
      {/* Clickable Area */}
      <Link href={`/editor/${resume.id}`} className="block h-full">
        <div className="h-48 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-100 group-hover:from-brand-50/50 group-hover:to-brand-100/30 transition-colors">
          <div className="bg-white p-4 rounded-xl shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-110 duration-300">
            <FileText className="h-10 w-10 text-brand-600/80" />
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-gray-900 truncate text-lg group-hover:text-brand-700 transition-colors">
            {resume.title}
          </h3>
          <p className="text-xs font-medium text-gray-400 mt-2 uppercase tracking-wider">
            Edited{" "}
            {new Date(resume.updatedAt!).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </Link>

      {/* Delete Action - Top Right */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to delete this resume?")) {
              await deleteResume(resume.id);
            }
          }}
          className="p-2 bg-white/90 backdrop-blur text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg border border-gray-200 shadow-sm transition-colors"
          title="Delete Resume"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
