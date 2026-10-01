'use client';

import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp, X, CheckCircle2, Shield } from 'lucide-react';
import { useAnalytics } from './AnalyticsProvider';

export default function AnalyticsInspector() {
  const { events, lastEvent, trackingToken } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'page_view':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'platform_selected':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'message_edited':
      case 'message_copied':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'share_clicked':
      case 'share_handoff':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'post_link_opened':
      case 'post_link_submitted':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'share_completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <>
      {/* Floating Audit Button in bottom-right corner for inspection */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          id="analytics-inspector-toggle-btn"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#0A192F] text-white text-xs font-semibold shadow-lg hover:bg-slate-800 transition-all border border-slate-700 cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-[#00B4D8] animate-pulse" />
          <span>Tracking Audit</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#009FE3] text-white text-[10px] font-mono">
            {events.length}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Slide-over Audit Panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0A192F] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00B4D8]" />
              <div>
                <h3 className="text-sm font-bold">Analytics & Tracking Stream</h3>
                <p className="text-[11px] text-slate-300">
                  Opaque Token: <span className="font-mono text-[#00B4D8]">{trackingToken.slice(0, 14)}...</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Privacy reassurance badge */}
          <div className="p-3 bg-sky-50 border-b border-sky-100 flex items-center gap-2 text-xs text-[#0077C8]">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Secure Mode: Encrypted opaque IDs only; raw PII/Claim numbers are masked.</span>
          </div>

          {/* Events Log List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {events.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No events triggered yet.</p>
            ) : (
              events.map((evt) => {
                const isExpanded = selectedEventId === evt.id;
                return (
                  <div
                    key={evt.id || evt.timestamp + evt.eventType}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all text-xs"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setSelectedEventId(isExpanded ? null : (evt.id || null))}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border ${getEventBadgeColor(
                            evt.eventType
                          )}`}
                        >
                          {evt.eventType}
                        </span>
                        {evt.platform && (
                          <span className="font-semibold text-slate-700 capitalize">
                            [{evt.platform}]
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    {/* Quick JSON Inspector */}
                    {isExpanded && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80">
                        <pre className="p-2.5 rounded-lg bg-slate-900 text-[#00B4D8] font-mono text-[10px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {JSON.stringify(
                            {
                              eventType: evt.eventType,
                              claimId: evt.claimId,
                              userId: evt.userId,
                              platform: evt.platform || 'none',
                              campaign: evt.campaign,
                              trackingToken: evt.trackingToken,
                              timestamp: evt.timestamp,
                              metadata: evt.metadata || {},
                            },
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer info */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
            <span>Captured {events.length} lifecycle events</span>
            <span className="font-mono">POST /api/track-click</span>
          </div>
        </div>
      )}
    </>
  );
}
