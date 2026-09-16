import React from 'react';
import { Link } from 'react-router';

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Liquid Security",
    description: "Enterprise-grade authentication powered by Firebase with real-time verification and session safety."
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fluid Performance",
    description: "Optimized glassmorphic interface designed for zero latency, active response, and crisp rendering."
  },
  {
    icon: (
      <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Dynamic Portal",
    description: "Centralized controls giving you instant access to user profiles, analytics, and app settings."
  }
];

const STATS = [
  { label: "Active Users", value: "10K+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Security Rating", value: "A+" }
];

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-20">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner text-xs font-medium text-indigo-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Liquid Glass Experience v2.0
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
            Next-Generation Ambient Dashboard
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Experience translucent depth with fluid interactivity. Designed for modern web applications seeking clarity and subtle elegance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            <Link
              to="/dashboard"
              className="group relative px-8 py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/40 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.4)] hover:border-white/60 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10 tracking-wide">Go to Dashboard</span>
            </Link>

            <Link
              to="/Login"
              className="group relative px-8 py-3.5 rounded-2xl font-medium text-slate-200 transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-md hover:text-white hover:border-white/40 hover:bg-white/20 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10 tracking-wide">Get Started</span>
            </Link>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {STATS.map((stat, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'pt-6 sm:pt-0' : ''}`}>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-indigo-200 mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;