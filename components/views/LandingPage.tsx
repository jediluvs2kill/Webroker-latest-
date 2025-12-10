import React from 'react';
import { Building2, Briefcase, Sparkles, ArrowRight, ShieldCheck, Zap, BarChart3, CheckCircle2, XCircle, Lock, Cpu, Network } from 'lucide-react';
import { Role } from '../../types';

interface LandingPageProps {
  onSelectRole: (role: Role) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-full bg-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden" id="home">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-100 text-xs font-medium tracking-wide uppercase">Live GTM OS v1.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Real Estate Sales. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-300">
              Verified & Accelerated.
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            WeBroker aligns Builders, Brokers, and Buyers on a single verified pipeline. 
            No ghost listings. No credit theft. Just AI-routed demand and instant payouts.
          </p>
        </div>
      </div>

      {/* Persona Selection Cards (Negative Margin Overlap) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Builder Card */}
          <div 
            onClick={() => onSelectRole(Role.BUILDER)}
            className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building2 className="w-40 h-40 text-slate-900" />
            </div>
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors shadow-sm">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Builders</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Gain unit-level visibility, automate broker payouts, and accelerate absorption with AI-driven pricing guidance.
            </p>
            <div className="flex items-center text-slate-900 font-bold group-hover:translate-x-1 transition-transform">
              Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* Broker Card */}
          <div 
            onClick={() => onSelectRole(Role.BROKER)}
            className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-brand-100 ring-4 ring-brand-500/5 hover:ring-brand-500/20 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-400 to-indigo-500"></div>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Briefcase className="w-40 h-40 text-brand-600" />
            </div>
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-sm">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Brokers</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Get exclusive inventory, AI-qualified leads, and instant commissions on verified milestones.
            </p>
            <div className="flex items-center text-brand-600 font-bold group-hover:translate-x-1 transition-transform">
              Access Partner Portal <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* Buyer Card */}
          <div 
            onClick={() => onSelectRole(Role.BUYER)}
            className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles className="w-40 h-40 text-indigo-600" />
            </div>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Buyers</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Skip the noise. Talk to our AI Concierge to get matched with top-tier brokers and verified homes.
            </p>
            <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
              Start Concierge Chat <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* Comparison Section: Chaos vs Order */}
      <div className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">From Intent to Escrow—Without the Chaos</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    The traditional market is broken. WeBroker fixes the incentives.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* The Old Way */}
                <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                        The Old Way
                    </div>
                    <ul className="space-y-6 mt-4">
                        <li className="flex items-start">
                            <XCircle className="w-6 h-6 text-red-400 mt-1 shrink-0" />
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-900">Duplicate Leads</h4>
                                <p className="text-sm text-slate-500 mt-1">Brokers fight over the same phone numbers; Builders get spammed.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <XCircle className="w-6 h-6 text-red-400 mt-1 shrink-0" />
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-900">Credit Theft</h4>
                                <p className="text-sm text-slate-500 mt-1">No proof of who brought the client. Closures get disputed.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <XCircle className="w-6 h-6 text-red-400 mt-1 shrink-0" />
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-900">Ghost Listings</h4>
                                <p className="text-sm text-slate-500 mt-1">Buyers browse fake inventory and get cold-called by 20 agents.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* The WeBroker Way */}
                <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-lg relative overflow-hidden ring-1 ring-emerald-500/20">
                     <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                        The WeBroker OS
                    </div>
                    <ul className="space-y-6 mt-4">
                        <li className="flex items-start">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-900">AI-Concierge Routing</h4>
                                <p className="text-sm text-slate-500 mt-1">Buyers are qualified by AI and locked to the highest-rated broker.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-900">Immutable Attribution</h4>
                                <p className="text-sm text-slate-500 mt-1">Every call, visit, and offer is logged on-chain. Zero disputes.</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-900">Instant Escrow Payouts</h4>
                                <p className="text-sm text-slate-500 mt-1">Commissions hit the broker's wallet the moment milestones are met.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="py-24 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl font-extrabold text-slate-900">The Operating System for Modern Realty</h2>
                  <p className="mt-4 text-lg text-slate-500">Built on three core pillars to ensure speed, trust, and transparency.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                          <Cpu className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Astra AI Engine</h3>
                      <p className="text-slate-600">
                          Proprietary LLM that acts as the gatekeeper. It qualifies demand 24/7 and routes it based on merit, not bid price.
                      </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                          <Network className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Broker Impact Index</h3>
                      <p className="text-slate-600">
                          A dynamic reputation score. High BII brokers get priority leads. Low performers get coaching.
                      </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                          <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Escrow</h3>
                      <p className="text-slate-600">
                          Funds are held securely and released programmatically. Builders pay on performance; Brokers get paid on time.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                  <div className="p-4">
                      <div className="text-4xl font-bold text-emerald-400 mb-2">30%</div>
                      <div className="text-sm text-slate-400 uppercase tracking-widest">Faster Absorption</div>
                  </div>
                  <div className="p-4">
                      <div className="text-4xl font-bold text-brand-400 mb-2">0%</div>
                      <div className="text-sm text-slate-400 uppercase tracking-widest">Credit Theft</div>
                  </div>
                  <div className="p-4">
                      <div className="text-4xl font-bold text-indigo-400 mb-2">T+1</div>
                      <div className="text-sm text-slate-400 uppercase tracking-widest">Payout Speed</div>
                  </div>
                  <div className="p-4">
                      <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                      <div className="text-sm text-slate-400 uppercase tracking-widest">Audit Trail</div>
                  </div>
              </div>
          </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">W</div>
                <span className="font-bold text-white tracking-tight">WeBroker</span>
            </div>
            <div className="flex space-x-8 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
                <a href="#" className="hover:text-white transition-colors">API Docs</a>
            </div>
            <div className="mt-4 md:mt-0 text-xs text-slate-600">
                © 2025 WeBroker OS Inc. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};