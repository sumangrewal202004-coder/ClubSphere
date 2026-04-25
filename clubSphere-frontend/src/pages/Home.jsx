import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: '🏛️',
    title: 'College Verified',
    desc: 'Every student is verified through their official college email domain. No fake accounts, no outsiders.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Screening',
    desc: 'Submit your CV and let our AI score and evaluate your fit for each club — instant, unbiased feedback.',
  },
  {
    icon: '📅',
    title: 'Events & Registrations',
    desc: 'Stay updated on club events, register in one tap, and never miss what matters on campus.',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    desc: 'Real-time updates on your applications, approvals, and upcoming events — all in one place.',
  },
];

const ROLES = [
  { label: 'Students', color: '#6366f1', desc: 'Browse clubs, apply with your CV, track applications' },
  { label: 'Club Managers', color: '#0ea5e9', desc: 'Review applicants, create events, manage your club' },
  { label: 'Colleges', color: '#10b981', desc: 'Oversee all clubs, approve managers, monitor activity' },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [visible, setVisible] = useState({});
  const observerRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(prev => ({ ...prev, [entry.target.dataset.key]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    observerRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (key) => (el) => {
    if (el) {
      el.dataset.key = key;
      observerRefs.current.push(el);
    }
  };

  const fadeUp = (key, delay = 0) => ({
    opacity: visible[key] ? 1 : 0,
    transform: visible[key] ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#0a0a0f', color: '#e8e8f0', minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 clamp(1rem, 4vw, 2rem)', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.5px' }}>
          <div style={{ width: '40px', height: '40px', background: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" fill="none" style={{ width: '24px', height: '24px' }}>
              <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          Club<span style={{ color: '#6366f1' }}>Sphere</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '0.49rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',  background: 'rgba(255, 255, 255, 0.04)', transition: 'background 0.2s, border-color 0.2s', color: '#e8e8f0', fontSize: '1.3rem', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', fontWeight: 500 }}>
            Login
          </button>
          <button onClick={() => navigate('/register')} style={{ padding: '0.45rem 1.5rem', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '1.3rem', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', fontWeight: 600 }}>
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem clamp(1rem, 4vw, 1.5rem) 4rem', position: 'relative'}}>

        {/* Background glow blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '40%', left: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '30%', right: '15%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
          {/* Grid texture */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '999px', border: '1px solid rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.1)', fontSize: '2rem', fontWeight: 500, color: '#a5b4fc', marginBottom: '1.95rem',animation: 'fadeDown 0.8s ease forwards', opacity: 0, letterSpacing: '0.05em' }}>
            Campus Club Management Platform
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.6rem, 7vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 1.5rem', animation: 'fadeUp 0.9s ease 0.1s forwards', opacity: 0 }}>
            Where Campus<br />
            <span style={{ color: '#6366f1' }}>Clubs</span> Come Alive
          </h1>

          <p style={{ fontSize: 'clamp(1.5rem, 2vw, 1.2rem)', color: '#9191a8', lineHeight: 1.75, margin: '0 auto 2.5rem', fontWeight: 300, animation: 'fadeUp 0.9s ease 0.2s forwards', opacity: 0 }}>
            Apply to clubs with AI-powered CV screening, discover campus events, and manage your college's entire club ecosystem — all in one place.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.9s ease 0.35s forwards', opacity: 0 }}>
            <button onClick={() => navigate('/register')} style={{ padding: '0.85rem 2.2rem', borderRadius: '12px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '1.5rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 40px rgba(99,102,241,0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(99,102,241,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.35)'; }}>
              Get Started Free →
            </button>
            <button onClick={() => navigate('/login')} style={{ padding: '0.85rem 2.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#e8e8f0', fontSize: '1.5rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
              Sign In
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s ease-in-out infinite', opacity: 0.4 }}>
          <div style={{ width: '24px', height: '38px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px' }}>
            <div style={{ width: '4px', height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.6)', animation: 'scrollDot 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ROLES STRIP */}
      <section style={{ padding: '3rem clamp(1rem, 4vw, 1.5rem)', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div ref={ref('roles')} style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 40vw, 240px), 1fr))', gap: '1.5rem' }}>
          {ROLES.map((r, i) => (
            <div key={r.label} style={{ ...fadeUp('roles', i * 0.1), display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '2rem 2rem', borderRadius: '14px', border: `1px solid ${r.color}25`, background: `${r.color}08` }}>
              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: r.color, marginTop: '7px', flexShrink: 0, boxShadow: `0 0 15px ${r.color}` }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '1.5rem', margin: '0 0 0.3rem', color: '#e8e8f0' }}>{r.label}</p>
                <p style={{ fontSize: '1.2rem', color: '#7a7a96', margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '6rem clamp(1rem, 4vw, 1.5rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div ref={ref('feat-h')} style={{ ...fadeUp('feat-h'), textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.12em', color: '#6366f1', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Everything you need</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-1px', margin: 0, lineHeight: 1.1 }}>Built for modern<br />campus life</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} ref={ref(`feat-${i}`)} style={{ ...fadeUp(`feat-${i}`, i * 0.1), padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', transition: 'border-color 0.3s, background 0.3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: '1.5rem', margin: '0 0 0.5rem', color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: '1.2rem', color: '#7a7a96', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem clamp(1rem, 4vw, 1.5rem)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div ref={ref('how-h')} style={{ ...fadeUp('how-h'), marginBottom: '3rem' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.12em', color: '#6366f1', textTransform: 'uppercase', marginBottom: '0.75rem' }}>How it works</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', letterSpacing: '-1px', margin: 0 }}>Three steps to your<br />dream club</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {[
              { n: '01', title: 'Register with your college email', body: 'Your institution is auto-detected from your email domain. No manual verification needed.' },
              { n: '02', title: 'Browse clubs & apply', body: 'Explore clubs in your college, upload your CV, and get an instant AI score on your application.' },
              { n: '03', title: 'Get notified & show up', body: 'Track your application status in real time and register for events once you\'re in.' },
            ].map((step, i) => (
              <div key={step.n} ref={ref(`step-${i}`)} style={{ ...fadeUp(`step-${i}`, i * 0.15), display: 'flex', gap: '1.5rem', alignItems: 'flex-start', textAlign: 'left', padding: '1.75rem 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem', color: 'rgba(99,102,241,0.25)', lineHeight: 1, flexShrink: 0, width: '52px' }}>{step.n}</div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.5rem', margin: '0 0 0.4rem', color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>{step.title}</h3>
                  <p style={{ fontSize: '1.3rem', color: '#7a7a96', margin: 0, lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ref('cta')} style={{ padding: '6rem clamp(1rem, 4vw, 1.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, ...fadeUp('cta') }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-1.5px', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Ready to find<br />your people?
          </h2>
          <p style={{ color: '#7a7a96', fontSize: '1.5rem', margin: '0 0 2.5rem', fontWeight: 300 }}>
            Join ClubSphere and be part of something bigger.
          </p>
          <button onClick={() => navigate('/register')} style={{ padding: '1rem 2.8rem', borderRadius: '14px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '1.3rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 50px rgba(99,102,241,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 70px rgba(99,102,241,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(99,102,241,0.4)'; }}>
            Create your account →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '1.5rem clamp(1rem, 4vw, 1.5rem)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#4a4a62', fontSize: '1.2rem' }}>
        © {new Date().getFullYear()} ClubSphere · Built for college communities . By Suman Grewal .
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scrollDot {
          0%   { opacity: 1; transform: translateY(0); }
          80%  { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}