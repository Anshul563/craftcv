import { DashboardNavbar } from "@/components/ui/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardNavbar />
      <main className="fade-in">{children}</main>
    </div>
  );
}
