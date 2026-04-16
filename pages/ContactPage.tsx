import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs uppercase tracking-wide mb-6">
            Contact
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Get in touch</h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            If you have feedback, feature suggestions, bug reports, or questions regarding Verify Your Cart, you can
            contact the developer using the email below.
          </p>

          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 md:p-8 space-y-4">
            <p className="text-slate-800"><strong>Project:</strong> Verify Your Cart</p>
            <p className="text-slate-800"><strong>Developer:</strong> Saketh Vedullapalli</p>
            <p className="text-slate-800">
              <strong>Email:</strong>{' '}
              <a href="mailto:sakethvedullapalli@gmail.com" className="text-blue-600 font-semibold underline">
                sakethvedullapalli@gmail.com
              </a>
            </p>
            <p className="text-slate-800"><strong>Purpose:</strong> Educational AI-assisted e-commerce risk awareness</p>
          </div>

          <div className="mt-8 text-slate-600 leading-relaxed">
            <p>
              We aim to review genuine inquiries as soon as possible. Please do not send sensitive personal
              information or payment data through email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
