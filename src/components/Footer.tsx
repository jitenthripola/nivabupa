'use client';

import React from 'react';
import { Phone, Shield, Heart, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-white border-t border-slate-200/80 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Support & Assistance banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0077C8] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Need help with your claim details?</p>
              <p className="text-slate-500">24x7 Customer Support: 1860-500-8888 • customercare@nivabupa.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Claimant Portal</span>
            </span>
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            Insurance is a subject matter of solicitation. Niva Bupa Health Insurance Company Limited (formerly known as Max Bupa Health Insurance Company Limited). IRDAI Registration No. 145. Registered Office: C-98, First Floor, Lajpat Nagar, Part 1, New Delhi-110024. CIN: U66000DL2008PLC182918.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-slate-500">
            <p>© {new Date().getFullYear()} Niva Bupa Health Insurance. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-700 cursor-pointer">Terms of Advocacy</span>
              <span>•</span>
              <span className="hover:text-slate-700 cursor-pointer">IRDAI Guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
