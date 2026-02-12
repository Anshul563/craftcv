import { useResume } from "@/context/resume-context";
import { Plus, Trash2 } from "lucide-react";

export function CertificationsForm() {
  const { resumeData, updateResumeData } = useResume();
  const { certifications } = resumeData;

  const addCertification = () => {
    updateResumeData({
      certifications: [
        ...(certifications || []),
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          date: "",
        },
      ],
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    const updated = certifications.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert,
    );
    updateResumeData({ certifications: updated });
  };

  const removeCertification = (id: string) => {
    updateResumeData({
      certifications: certifications.filter((cert) => cert.id !== id),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      <div className="space-y-4">
        {certifications?.map((cert) => (
          <div
            key={cert.id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 group hover:border-brand-200 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-3">
                <input
                  value={cert.name}
                  onChange={(e) =>
                    updateCertification(cert.id, "name", e.target.value)
                  }
                  placeholder="Certification Name"
                  className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all placeholder:text-gray-400 font-medium"
                />
                <input
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertification(cert.id, "issuer", e.target.value)
                  }
                  placeholder="Issuer (e.g. Google, AWS)"
                  className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all placeholder:text-gray-400"
                />
                <input
                  value={cert.date}
                  onChange={(e) =>
                    updateCertification(cert.id, "date", e.target.value)
                  }
                  placeholder="Date (e.g. 2024)"
                  className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {(!certifications || certifications.length === 0) && (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
            <p className="text-sm">No certifications added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
