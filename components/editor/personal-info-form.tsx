"use client";

import { useResume } from "@/context/resume-context";
import { PersonalInfo } from "@/lib/types";

export function PersonalInfoForm() {
  const { resumeData, updateResumeData } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData({
      personalInfo: {
        ...personalInfo,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName || ""}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle" // Note: Add this to your PersonalInfo type if missing, or map to summary/other
            value={(personalInfo as any).jobTitle || ""} // Temporary cast if type not updated
            onChange={handleChange}
            placeholder="Software Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email || ""}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={personalInfo.phone || ""}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={personalInfo.summary || ""}
          onChange={handleChange}
          rows={4}
          placeholder="Experienced developer with a passion for..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}