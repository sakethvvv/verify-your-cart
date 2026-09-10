import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || 'Unable to submit message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 md:p-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-6">
            Get In Touch
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Contact Project Creator
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
            Have questions about Verify Your Cart, feature suggestions, or feedback on listing detections? Use the secure form below or email Saketh Vedullapalli directly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
              <div className="flex items-center gap-3 mb-3 text-blue-600">
                <Mail size={22} />
                <h3 className="font-bold text-slate-900 text-base">Direct Email</h3>
              </div>
              <a
                href="mailto:sakethvedullapalli@gmail.com"
                className="text-blue-600 font-semibold text-sm hover:underline block"
              >
                sakethvedullapalli@gmail.com
              </a>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Direct inbox of project developer Saketh Vedullapalli.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
              <div className="flex items-center gap-3 mb-3 text-purple-600">
                <MapPin size={22} />
                <h3 className="font-bold text-slate-900 text-base">Developer & Location</h3>
              </div>
              <p className="text-slate-800 text-sm font-bold">Saketh Vedullapalli</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Project Creator / Developer • Andhra Pradesh, India
              </p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle2 size={40} className="text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-emerald-900 text-xl mb-2">Message Delivered</h3>
              <p className="text-emerald-700 text-sm mb-6 max-w-md mx-auto">
                Thank you! Your message has been routed to Saketh Vedullapalli. We appreciate your interest in making e-commerce safer for everyone.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 border-t border-slate-100 pt-8">
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Subject (Optional)
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="e.g. Feature suggestion or scam store report"
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your question, inquiry, or suggestion..."
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>{loading ? 'Submitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
