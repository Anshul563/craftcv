import Link from "next/link";
import { FileText, LogOut, Settings, User } from "lucide-react";
import { auth } from "@/lib/auth"; // Assuming you have better-auth client or server utils
import { headers } from "next/headers";

export async function DashboardNavbar() {
  // Check if we can get session here, or if this is a client component.
  // Since it's a navbar, let's keep it server-rendered as much as possible for SEO/Perf.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="border-b border-gray-100/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-brand-600 p-1.5 rounded-lg shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors hidden sm:block">
            CraftCV
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 mr-4">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                  />
                )}
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {session.user.name}
                </span>
              </div>

              <Link
                href="/settings"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>

              {/* Note: Sign out usually requires client-side interaction. 
                               For now, we can link to a sign-out route or handle it via a client component wrapper if needed.
                               Assuming /sign-out handles it or we use a client component for the button.
                               Let's use a simple link to /sign-in for now or keep it simple.
                            */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
