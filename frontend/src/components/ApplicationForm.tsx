"use client";

import { useState } from 'react';

interface ApplicationFormProps {
  onSubmit: (data: { message: string; link: string }) => void;
  submitting?: boolean;
}

export function ApplicationForm({ onSubmit, submitting }: ApplicationFormProps) {
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [comments, setComments] = useState([
    { user: 'chimzy01', text: "I'm very much interested", time: '4 days ago' },
    { user: 'lumanycrypt', text: 'I can work as community moderator is there chance for me?', time: '3 days ago' },
    { user: 'devfancyocean0308', text: "Hey, I'm Chavis have over 5 years experience in Blockchain", time: '3 days ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ message, link });
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { user: 'You', text: newComment, time: 'just now' },
      ]);
      setNewComment('');
    }
  }

  return (
    <div>
      {/* Title and status */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">Open to Applications</span>
          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 font-semibold">$10 in USDC.e</span>
        </div>
        <h2 className="text-lg font-bold mb-1">Criar uma proposta de investimento para os lucros da DAO</h2>
        <p className="text-gray-500 text-sm mb-2">This task is Open to Applications. Click "I'm interested" to express your interest to work on this task. If you're a good fit, the task reviewer will assign you to the task.</p>
        <a href="https://app.defiverso.com/modulo-8-dormiu-acordou-coletou/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-xs">Pre requisito, fazer esse curso.</a>
      </div>

      {/* Application form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Write a message to express your interest..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Portfolio/Link (optional)</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="url"
            placeholder="https://yourportfolio.com"
            value={link}
            onChange={e => setLink(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : "I'm interested"}
        </button>
      </form>

      {/* Activity/comments section */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold mb-2">Activity</h3>
        <div className="space-y-3 mb-2 max-h-32 overflow-y-auto">
          {comments.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-xs">
                {c.user.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">{c.user}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{c.text}</div>
                <div className="text-[10px] text-gray-400">{c.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment} className="flex gap-2 mt-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-indigo-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 