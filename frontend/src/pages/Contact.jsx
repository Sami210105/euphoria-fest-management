import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { animation: fadeUp 0.55s ease both; }
        .fade-up-1 { animation: fadeUp 0.55s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.55s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.55s ease 0.3s both; }

        .ef-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #c9a96e44;
          padding: 10px 0;
          color: #c9a96e;
          font-family: 'Almendra', serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          outline: none;
          transition: border-color 0.3s ease;
          caret-color: #c9a96e;
        }
        .ef-input::placeholder { color: #c9a96e88; }
        .ef-input:focus { border-bottom-color: #c9a96e; }

        .ef-btn {
          background: transparent;
          border: 1px solid #c9a96e88;
          color: #c9a96e;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 14px 40px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .ef-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a96e18;
          transform: translateX(-100%);
          transition: transform 0.35s ease;
        }
        .ef-btn:hover::before { transform: translateX(0); }
        .ef-btn:hover { border-color: #c9a96e; }
      `}</style>

      <section className="relative min-h-screen overflow-hidden bg-[#1C0F0F]">

        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16 sm:py-24">

          {/* Top label */}
          <div className="fade-up flex items-center gap-4 mb-14 sm:mb-20">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#c05754]" />
            <span className="font-[Dancing_Script] text-sm text-[#c05754] tracking-wide">
              Euphoria Fest
            </span>
            <div className="h-px w-8 bg-[#4a1f1f]" />
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* LEFT — copy */}
            <div>
              <h1
                className="fade-up-1 font-[Bebas_Neue] text-[#F5E6C8] leading-[0.92] mb-8 tracking-widest"
                style={{ fontSize: "clamp(3.2rem, 7vw, 5.8rem)" }}
              >
                Reach<br />
                <span style={{ color: "#c05754" }}>Out.</span>
              </h1>

              <p className="fade-up-2 font-[Almendra] text-[#7a4a4a] text-sm leading-relaxed tracking-wide mb-12 max-w-xs">
                Whether it's a question, a collab, or just a hello — we're here and listening.
              </p>

              {/* Contact lines */}
              <div className="fade-up-3 space-y-7">
                {[
                  { label: "Artist Bookings", email: "bookings@euphoriafest.com" },
                  { label: "Brand Collaborations", email: "brands@euphoriafest.com" },
                  { label: "Press Inquiries", email: "press@euphoriafest.com" },
                ].map(({ label, email }) => (
                  <div key={label}>
                    <p className="font-[Bebas_Neue] text-[0.65rem] tracking-[0.3em] text-[#5a2828] uppercase mb-1">
                      {label}
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="font-[Almendra] text-[0.78rem] tracking-wide transition-colors duration-300"
                      style={{ color: "#c0575488" }}
                      onMouseEnter={e => e.target.style.color = "#c05754"}
                      onMouseLeave={e => e.target.style.color = "#c0575488"}
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>

              {/* Ornament */}
              <div className="mt-16 flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M7 0L8.4 5H14L9.3 8.1L11 14L7 10.8L3 14L4.7 8.1L0 5H5.6Z" fill="#c05754" opacity=".5" />
                </svg>
                <div className="h-px w-24 bg-gradient-to-r from-[#c05754] to-transparent opacity-30" />
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="fade-up-2">
              {/* Form label bar */}
              <div className="flex items-center gap-3 mb-10">
                <span
                  className="font-[Bebas_Neue] text-[0.75rem] tracking-[0.3em] text-[#c05754] px-3 py-1 border border-[#c0575444] uppercase"
                  style={{ background: "#c0575418" }}
                >
                  Contact Form
                </span>
                <div className="h-px flex-1 bg-[#c0575422]" />
              </div>

              {sent ? (
                <div className="text-center py-16">
                  <svg className="mx-auto mb-5" width="40" height="40" viewBox="0 0 14 14">
                    <path d="M7 0L8.4 5H14L9.3 8.1L11 14L7 10.8L3 14L4.7 8.1L0 5H5.6Z" fill="#c05754" opacity=".8" />
                  </svg>
                  <p className="font-[Dancing_Script] text-[#c05754] text-lg tracking-wide">
                    Message received.<br />We'll be in touch.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block font-[Bebas_Neue] text-[0.6rem] tracking-[0.3em] text-[#5a2828] uppercase mb-2">First Name</label>
                      <input className="ef-input" name="name" placeholder="Zeva" value={form.name} onChange={handle} required />
                    </div>
                    <div>
                      <label className="block font-[Bebas_Neue] text-[0.6rem] tracking-[0.3em] text-[#5a2828] uppercase mb-2">Last Name</label>
                      <input className="ef-input" name="lastname" placeholder="Kreilen" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-[Bebas_Neue] text-[0.6rem] tracking-[0.3em] text-[#5a2828] uppercase mb-2">Email</label>
                    <input className="ef-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                  </div>

                  <div>
                    <label className="block font-[Bebas_Neue] text-[0.6rem] tracking-[0.3em] text-[#5a2828] uppercase mb-2">Subject</label>
                    <input className="ef-input" name="subject" placeholder="Artist booking / press / hello" value={form.subject} onChange={handle} />
                  </div>

                  <div>
                    <label className="block font-[Bebas_Neue] text-[0.6rem] tracking-[0.3em] text-[#5a2828] uppercase mb-2">Message</label>
                    <textarea
                      className="ef-input resize-none"
                      name="message"
                      rows={4}
                      placeholder="What's on your mind..."
                      value={form.message}
                      onChange={handle}
                      required
                      style={{ borderBottom: "1px solid #c9a96e44" }}
                    />
                  </div>

                  <button type="submit" className="ef-btn mt-2">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Marquee banner */}
        <div className="overflow-hidden bg-[#c05754] py-3 mt-8">
          <style>{`@keyframes marquee { to { transform: translateX(-50%); } }`}</style>
          <div className="flex w-max" style={{ animation: "marquee 18s linear infinite" }}>
            {Array(12).fill("1 NIGHT. 1 BEAT. 1 FLOOR.").map((t, i) => (
              <span
                key={i}
                className="font-[Bebas_Neue] text-[#1C0F0F] text-lg sm:text-2xl tracking-widest px-8 shrink-0"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}