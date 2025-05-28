import React, { useState, useEffect } from "react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { message: string; link: string }) => void;
  bountyTitle?: string;
  prerequisiteUrl?: string;
}

export function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  bountyTitle = "Submit Application",
  prerequisiteUrl,
}: ApplicationModalProps) {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(isOpen);
  const [fade, setFade] = useState("");

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setFade("in"), 10);
    } else if (visible) {
      setFade("out");
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${fade === "in" ? "opacity-100" : "opacity-0"}`}>
      <div className={`bg-[#181A20] rounded-2xl shadow-2xl w-full max-w-lg p-0 relative transform transition-all duration-300 ${fade === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          aria-label="Close"
        >
          ×
        </button>
        {/* Title */}
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-2xl font-bold text-white mb-2">{bountyTitle}</h2>
        </div>
        {/* Info Banner */}
        <div className="bg-blue-600/90 text-white text-sm px-8 py-3 flex items-center gap-2">
          <span className="font-semibold">This task is Open to Applications</span>
          <span className="ml-auto text-xs opacity-80">Click "I'm interested" to apply</span>
        </div>
        {/* Prerequisite/Instructions */}
        {prerequisiteUrl && (
          <div className="px-8 py-4 border-b border-[var(--dework-border)]">
            <div className="text-[var(--dework-text-muted)] text-sm mb-2">Pre-requisite: complete this course.</div>
            <a
              href={prerequisiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline break-all"
            >
              {prerequisiteUrl}
            </a>
          </div>
        )}
        {/* Application Form */}
        <form
          className="px-8 py-6 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            await onSubmit({ message, link });
            setSubmitting(false);
          }}
        >
          <label className="text-white text-sm font-medium">Message</label>
          <textarea
            className="bg-[#23262F] border border-[var(--dework-border)] rounded-lg p-3 text-white text-sm resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            rows={4}
            placeholder="Write a short message about your interest and experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <label className="text-white text-sm font-medium">Relevant Link (optional)</label>
          <input
            className="bg-[#23262F] border border-[var(--dework-border)] rounded-lg p-3 text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            type="url"
            placeholder="Portfolio, LinkedIn, etc."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "I'm interested"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-[var(--dework-border)] text-white px-6 py-2 rounded-lg hover:border-orange-500 transition-colors"
            >
              Discuss
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 