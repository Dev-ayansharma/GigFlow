"use client";

import { ArrowRight, Briefcase, Users, Zap } from "lucide-react";

export default function HomePage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Briefcase className="w-7 h-7 text-blue-600" />
          <h1 className="text-xl font-bold">GigFlow</h1>
        </div>
     
      </header>

      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find Work. Hire Talent. 
          <span className="text-blue-600"> All in One Place.</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          GigFlow connects clients and freelancers seamlessly. Post gigs, place bids, and get work done faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold">Post Gigs</h3>
          <p className="text-gray-600 text-sm mt-2">
            Easily create gigs and find the right talent quickly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <Users className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold">Hire Freelancers</h3>
          <p className="text-gray-600 text-sm mt-2">
            Browse bids and hire the best freelancer for your job.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <Zap className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold">Fast Workflow</h3>
          <p className="text-gray-600 text-sm mt-2">
            Real-time updates and smooth experience for both sides.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="mb-6 text-blue-100">
          Join GigFlow today and start your freelance journey.
        </p>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition"
        >
          Create Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} GigFlow. All rights reserved.
      </footer>
    </div>
  );
}
