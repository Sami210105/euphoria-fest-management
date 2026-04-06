import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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
          border-bottom: 1px solid #b69f8844;
          padding: 10px 0;
          color: #f5e6c8;
          font-family: 'Almendra', serif;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          outline: none;
          transition: all 0.3s ease;
          caret-color: #c05754;
        }

        .ef-input::placeholder {
          color: #b69f88;
          opacity: 1;
        }

        .ef-input:focus {
          border-bottom-color: #c05754;
        }

        .ef-btn {
          background: transparent;
          border: 1px solid #c05754;
          color: #f5e6c8;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 14px 40px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
        }

        .ef-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c05754;
          transform: translateX(-100%);
          transition: transform 0.35s ease;
          z-index: 0;
        }

        .ef-btn span {
          position: relative;
          z-index: 1;
        }

        .ef-btn:hover::before {
          transform: translateX(0);
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #795441 inset !important;
          -webkit-text-fill-color: #f5e6c8 !important;
          caret-color: #c05754;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <section className="relative min-h-screen overflow-hidden bg-[#1c0f0f]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-28 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* LEFT */}
            <div>
              <h1
                className="fade-up-1 font-[Bebas_Neue] text-[#f5e6c8] leading-[0.92] mb-8 tracking-widest"
                style={{ fontSize: "clamp(3.2rem, 7vw, 5.8rem)" }}
              >
                Reach
                <br />
                <span style={{ color: "#c05754" }}>Out.</span>
              </h1>

              <p className="fade-up-2 font-[Almendra] text-[#b69f88] text-2xl leading-relaxed tracking-wide mb-12 max-w-xs">
                Whether it's a question, a collab, or just a hello — we're here
                and listening.
              </p>

              <div className="fade-up-3 space-y-7">
                {[
                  {
                    label: "Artist Bookings",
                    email: "bookings@euphoriafest.com",
                  },
                  {
                    label: "Brand Collaborations",
                    email: "brands@euphoriafest.com",
                  },
                  { label: "Press Inquiries", email: "press@euphoriafest.com" },
                ].map(({ label, email }) => (
                  <div key={label}>
                    <p className="font-[Bebas_Neue] text-xl tracking-[0.3em] text-[#b69f88] uppercase mb-1">
                      {label}
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="font-[Almendra] text-lg tracking-wide transition-colors duration-300 text-[#f5e6c8] hover:text-[#c05754]"
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="fade-up-2">
              <div className="flex items-center gap-3 mb-10">
                <span className="font-[Bebas_Neue] text-xl tracking-[0.3em] text-[#c05754] px-3 py-1 border border-[#c05754] uppercase">
                  Contact Form
                </span>
                <div className="h-px flex-1 bg-[#b69f88]" />
              </div>

              {sent ? (
                <div className="text-center py-16">
                  <p className="font-[Almendra] text-[#f5e6c8] text-lg tracking-wide">
                    Message received. We'll be in touch.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-2">
                        First Name
                      </label>
                      <input
                        className="ef-input"
                        name="name"
                        placeholder="Zeva"
                        value={form.name}
                        onChange={handle}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-2">
                        Last Name
                      </label>
                      <input
                        className="ef-input"
                        name="lastname"
                        placeholder="Kreilen"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-2">
                      Email
                    </label>
                    <input
                      className="ef-input"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handle}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-2">
                      Subject
                    </label>
                    <input
                      className="ef-input"
                      name="subject"
                      placeholder="Book your tickets"
                      value={form.subject}
                      onChange={handle}
                    />
                  </div>

                  <div>
                    <label className="block font-[Bebas_Neue] text-lg tracking-[0.3em] text-[#b69f88] uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      className="ef-input resize-none"
                      name="message"
                      rows={4}
                      placeholder="What's on your mind..."
                      value={form.message}
                      onChange={handle}
                      required
                    />
                  </div>

                  <button type="submit" className="ef-btn mt-2">
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
