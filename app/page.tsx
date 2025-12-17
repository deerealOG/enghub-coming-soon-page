"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting to subscribe:", email);
      const { data, error: supabaseError } = await supabase
        .from("subscribers")
        .insert([{ email }])
        .select();

      console.log("Supabase response - Data:", data, "Error:", supabaseError);

      if (supabaseError) {
        console.error("Supabase error details:", {
          code: supabaseError.code,
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint
        });
        if (supabaseError.code === "23505") {
          setError("This email is already subscribed!");
        } else {
          setError(`Error: ${supabaseError.message}`);
        }
      } else {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err: any) {
      console.error("Caught exception:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { id: 1, text: "Connect with other engineers" },
    { id: 2, text: "Get employed by top engineering firms" },
    { id: 3, text: "Access professional Training Firms for Engineers" },
    { id: 4, text: "Share your engineering contents, innovations, and research updates with the world" },
    { id: 5, text: "Connect with top engineering firms" },
    { id: 6, text: "Collaborate with other Engineering firms" },
    { id: 7, text: "Be visible to the world" },
    { id: 8, text: "Connect with local and international Engineering organizations" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#070526] w-full relative">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/enghub-logo.svg"
              alt="Engineers Hub Logo"
              width={70}
              height={70}
            />
            <div>
              <div className="font-bold text-[#F37821]">Engineers</div>
              <div className="font-bold text-white">Hub</div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <a href="#" className="text-white hover:text-primary transition-colors font-medium">Find Job</a>
            <a href="#" className="text-white hover:text-primary transition-colors font-medium">Post a Job</a>
            <a href="#" className="text-white hover:text-primary transition-colors font-medium">Companies</a>
          </div>

          <div className="hidden md:flex items-center gap-4 ml-auto">
            <button className="border border-primary text-white px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors font-medium">
              Register
            </button>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium">
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-white ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#070526] border-t border-gray-700 z-50">
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-white hover:text-primary transition-colors font-medium py-2">Find Job</a>
              <a href="#" className="block text-white hover:text-primary transition-colors font-medium py-2">Post a Job</a>
              <a href="#" className="block text-white hover:text-primary transition-colors font-medium py-2">Companies</a>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
                <button className="border border-primary text-white px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors font-medium w-full">
                  Register
                </button>
                <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium w-full">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-gray-600 text-lg mb-3">
                Online Social Platform For Engineers.
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                Coming <span className="text-primary">Soon</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Be the first to know when we launch.
              </p>
            </div>

            {/* Email Subscription */}
            <form onSubmit={handleSubmit} className="mb-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="flex-1 px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
              {submitted && (
                <p className="text-green-600 text-sm mt-3 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Thank you for subscribing!
                </p>
              )}
              {error && (
                <p className="text-red-600 text-sm mt-3 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </form>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-3">
                  <div className="text-primary flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <p className="text-gray-900 font-semibold text-xl">
              All engineers in one platform.
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-96 lg:h-auto">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl"></div>

              {/* Main image with border */}
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl h-full">
                <img
                  src="/hero.svg"
                  alt="Engineer working"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>

              {/* Decorative secondary box */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-600">
          <div className="flex items-center justify-center gap-4 mb-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-[#1DA1F2] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.15 12.15 0 013 4.79a4.28 4.28 0 001.32 5.71 4.23 4.23 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.13 12.13 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0022.46 6z" />
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-[#E4405F] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm8 4a1 1 0 100 2 1 1 0 000-2zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
              </svg>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-[#1877F2] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.2h-1.13c-1.11 0-1.46.69-1.46 1.39v1.68h2.5l-.4 2.9h-2.1v7A10 10 0 0022 12z" />
              </svg>
            </a>
          </div>

          <p>&copy; 2025 Engineers Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
