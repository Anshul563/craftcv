"use client";

import { useResume } from "@/context/resume-context";
import { PersonalInfo } from "@/lib/types";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

export function PersonalInfoForm() {
  const { resumeData, updateResumeData } = useResume();
  const { personalInfo } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    updateResumeData({
      personalInfo: {
        ...personalInfo,
        [name]: value,
      },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        alert("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateResumeData({
          personalInfo: {
            ...personalInfo,
            photo: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateResumeData({
      personalInfo: {
        ...personalInfo,
        photo: undefined,
      },
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
        Personal Information
      </h3>

      {/* Photo Upload */}
      <div className="flex items-center gap-4 mb-4">
        {personalInfo.photo ? (
          <div className="relative">
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
            <button
              onClick={removePhoto}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
            <Upload className="w-6 h-6" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer text-xs bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800 transition inline-block"
          >
            {personalInfo.photo ? "Change Photo" : "Upload Photo"}
          </label>
          <p className="text-[10px] text-gray-400 mt-1">Max 2MB. JPG, PNG.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName || ""}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle" // Note: Add this to your PersonalInfo type if missing, or map to summary/other
            value={(personalInfo as any).jobTitle || ""} // Temporary cast if type not updated
            onChange={handleChange}
            placeholder="Software Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={personalInfo.email || ""}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={personalInfo.phone || ""}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          name="summary"
          value={personalInfo.summary || ""}
          onChange={handleChange}
          rows={4}
          placeholder="Experienced developer with a passion for..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}
