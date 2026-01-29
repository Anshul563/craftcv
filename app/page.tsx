import Link from "next/link";
import { FileText, CheckCircle, Download, Zap, Star, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* --- Navbar --- */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CraftCV</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/sign-in" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-20 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-blue-700" />
            <span>Trusted by 10,000+ Job Seekers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Build a resume that <br />
            <span className="text-blue-600">gets you hired.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. No design skills needed. Just enter your details and download.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/sign-up" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
            >
              Create My Resume
            </Link>
            <Link 
              href="#pricing" 
              className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-lg font-semibold px-8 py-3.5 rounded-xl transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our builder is packed with features designed to help you stand out from the competition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-amber-500" />}
              title="Instant Preview"
              description="See changes in real-time as you edit your resume. No more guessing how it will look."
            />
            <FeatureCard 
              icon={<Download className="h-6 w-6 text-blue-500" />}
              title="PDF Export"
              description="Download high-quality, print-ready PDFs that work with all Applicant Tracking Systems."
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-green-500" />}
              title="Secure & Private"
              description="Your data is encrypted and secure. We never share your personal information."
            />
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start for free, upgrade when you need more power.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingItem text="1 Resume" />
                <PricingItem text="Basic Templates" />
                <PricingItem text="PDF Download (Watermarked)" />
              </ul>
              <Link href="/sign-up" className="block text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-lg transition">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border border-blue-600 rounded-2xl p-8 bg-blue-50/50 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900">₹999</span>
                <span className="text-gray-500">/one-time</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingItem text="Unlimited Resumes" checkColor="text-blue-600" />
                <PricingItem text="Premium Templates" checkColor="text-blue-600" />
                <PricingItem text="No Watermark" checkColor="text-blue-600" />
                <PricingItem text="Priority Support" checkColor="text-blue-600" />
              </ul>
              <Link href="/sign-up" className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition shadow-md shadow-blue-600/20">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CraftCV</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CraftCV. All rights reserved. Built with Next.js & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- Helper Components ---

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <div className="mb-4 bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function PricingItem({ text, checkColor = "text-gray-400" }: { text: string, checkColor?: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className={`h-5 w-5 ${checkColor}`} />
      <span className="text-gray-600">{text}</span>
    </li>
  );
}