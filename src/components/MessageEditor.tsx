'use client';

import React, { useState } from 'react';
import { Copy, Check, RotateCcw, MessageSquare, Info, Hash, AlertTriangle } from 'lucide-react';
import { CAMPAIGN_HASHTAGS, DEFAULT_SHARE_MESSAGE, PLATFORMS_CONFIG } from '@/lib/mockData';
import { SocialPlatform } from '@/types';

interface MessageEditorProps {
  platform: SocialPlatform;
  message: string;
  onChangeMessage: (newMessage: string) => void;
  onCopyMessage: () => void;
  onResetMessage: () => void;
}

export default function MessageEditor({
  platform,
  message,
  onChangeMessage,
  onCopyMessage,
  onResetMessage,
}: MessageEditorProps) {
  const [copied, setCopied] = useState(false);
  const currentConfig = PLATFORMS_CONFIG[platform];
  const charLimit = currentConfig.characterLimit || 2000;
  const charsRemaining = charLimit - message.length;
  const isOverLimit = charsRemaining < 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      onCopyMessage();
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleAppendHashtag = (tag: string) => {
    if (!message.includes(tag)) {
      const updated = message.trim() + ' ' + tag;
      onChangeMessage(updated);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 transition-all">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#009FE3] flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0A192F]">
              Your message
            </h3>
            <p className="text-xs text-slate-500">
              Feel free to personalize your message before sharing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onResetMessage}
            id="reset-message-btn"
            title="Reset to original message"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            id="copy-message-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-[#0077C8] border border-transparent'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editable Textarea with floating indicators */}
      <div className="relative">
        <textarea
          id="personalized-message-textarea"
          rows={4}
          value={message}
          onChange={(e) => onChangeMessage(e.target.value)}
          placeholder="Share how Niva Bupa handled your claim settlement..."
          className={`w-full rounded-xl border p-3.5 text-sm sm:text-base leading-relaxed text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all resize-none ${
            isOverLimit
              ? 'border-red-400 focus:ring-red-200'
              : 'border-slate-300 focus:border-[#009FE3] focus:ring-sky-100'
          }`}
        />

        {/* Character counter & Platform context bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 px-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="font-medium text-slate-700">Platform:</span>
            <span className="font-semibold text-[#0077C8]">{currentConfig.name}</span>
            <span className="text-slate-400">({currentConfig.handle})</span>
          </div>

          <div
            className={`font-mono text-xs font-semibold ${
              isOverLimit
                ? 'text-red-600 flex items-center gap-1'
                : message.length > charLimit * 0.85
                ? 'text-amber-600'
                : 'text-slate-500'
            }`}
          >
            {isOverLimit && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
            <span>
              {message.length} / {charLimit} characters
            </span>
          </div>
        </div>
      </div>

      {/* Suggested Campaign Hashtags Quick-add chips */}
      <div className="mt-3.5 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-slate-600">
          <Hash className="w-3.5 h-3.5 text-[#009FE3]" />
          <span>Recommended Tags:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CAMPAIGN_HASHTAGS.map((tag) => {
            const isIncluded = message.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleAppendHashtag(tag)}
                disabled={isIncluded}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  isIncluded
                    ? 'bg-sky-50 text-[#0077C8] font-semibold border border-sky-200 opacity-80 cursor-default'
                    : 'bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-[#0077C8] border border-slate-200'
                }`}
              >
                {tag} {isIncluded ? '✓' : '+'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform specific guidance hint */}
      <div className="mt-4 p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#009FE3] shrink-0 mt-0.5" />
        <div>
          {platform === 'instagram' && (
            <p>
              <strong>Instagram note:</strong> Web browsers cannot directly inject caption text into Instagram. Clicking &ldquo;Share Now&rdquo; copies this message to your clipboard and opens Instagram so you can easily paste it.
            </p>
          )}
          {platform === 'youtube' && (
            <p>
              <strong>YouTube note:</strong> Ready to share a video review or Short? Your review text and hashtags will be copied to clipboard so you can paste them into your video description.
            </p>
          )}
          {platform === 'facebook' && (
            <p>
              <strong>Facebook note:</strong> We will open the Facebook share dialog with your advocacy link. Your message is also copied to clipboard in case you want to customize your post text.
            </p>
          )}
          {platform === 'linkedin' && (
            <p>
              <strong>LinkedIn note:</strong> We will open LinkedIn with your verified claim advocacy card. Your message will be copied to clipboard ready to paste into your update.
            </p>
          )}
          {platform === 'x' && (
            <p>
              <strong>X (Twitter) note:</strong> Your tweet will open pre-filled with this message and your advocacy link, ready to publish in one click.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
