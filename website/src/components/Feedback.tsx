import { useState } from 'react';

// Feedback goes by email. The form is a mailto composer: it prefills a message in
// the visitor's own mail app, which is also the spam gate. (The old Supabase
// Edge-Function + Turnstile backend was removed with Boojy Cloud, 2026-08 — see
// git history if a hosted backend ever returns.)
const FEEDBACK_EMAIL = 'tyr@boojy.org';

type Status = 'idle' | 'mailto';

export function Feedback() {
  const [type, setType] = useState('Bug');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!message.trim()) {
      setError('Add a short message first.');
      return;
    }

    const subject = encodeURIComponent(`Boojy feedback — ${type}`);
    const replyTo = email.trim() ? `\n\nReply to: ${email.trim()}` : '';
    const body = encodeURIComponent(`${message.trim()}${replyTo}`);
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('mailto');
  };

  if (status === 'mailto') {
    return (
      <div className="feedback-success">
        <div className="feedback-success-icon">✦</div>
        <p>
          Your email app should have opened with your message — just hit send. Nothing opened?{' '}
          <a href={`mailto:${FEEDBACK_EMAIL}`}>Email me directly.</a>
        </p>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={onSubmit} autoComplete="off">
      <div className="feedback-row">
        <input
          className="feedback-input"
          type="email"
          placeholder="Email (optional, for a reply)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email (optional)"
          autoComplete="off"
        />
        <select
          className="feedback-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Type of feedback"
        >
          <option>Bug</option>
          <option>Idea</option>
          <option>Other</option>
        </select>
      </div>
      <textarea
        className="feedback-textarea"
        placeholder="What happened, or what's on your mind?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Your message"
        required
      />
      <div className="feedback-actions">
        <button className="feedback-submit" type="submit">
          Send →
        </button>
      </div>
      {error && <p className="feedback-error">{error}</p>}
    </form>
  );
}
