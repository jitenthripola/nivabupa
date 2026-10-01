'use client';

import React from 'react';
import { CheckCircle2, Shield, Building2, Clock, Sparkles } from 'lucide-react';
import { UserClaim } from '@/types';

interface ClaimSummaryCardProps {
  claim: UserClaim;
}

export default function ClaimSummaryCard({ claim }: ClaimSummaryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-5 transition-all hover:shadow-md">
      {/* Decorative top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#009FE3] via-[#00B4D8] to-[#16A34A]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Claim Settled Successfully
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                {claim.settledDate}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0A192F] mt-0.5">
              Welcome, {claim.claimantName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">Policy:</span>
          <span className="font-mono font-semibold text-slate-800">{claim.policyNumberMasked}</span>
        </div>
      </div>

      {/* Grid of settlement details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3.5">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-sky-50 text-[#0077C8] shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
              Settlement Amount
            </p>
            <p className="text-sm font-bold text-[#0A192F]">
              {claim.settlementAmount}
              <span className="ml-1 text-[11px] font-normal text-emerald-600 font-sans">
                (100% Cashless)
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
              Network Hospital
            </p>
            <p className="text-sm font-medium text-slate-800 truncate" title={claim.hospitalName}>
              {claim.hospitalName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-600 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
              Processing Speed
            </p>
            <p className="text-sm font-semibold text-slate-800 flex items-center gap-1">
              <span>{claim.turnaroundTime}</span>
              <Sparkles className="w-3 h-3 text-amber-500 inline" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
