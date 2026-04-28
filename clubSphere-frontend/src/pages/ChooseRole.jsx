import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_META = {
  club_manager: {
    label: 'Club Manager',
    desc: 'Review applications, manage club members, post events',
    route: '/manager/dashboard',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a4 4 0 00-5.197-3.787M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a4 4 0 015.197-3.787M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  student: {
    label: 'Student',
    desc: 'Browse clubs, apply for memberships, register for events',
    route: '/student/clubs',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422A12.083 12.083 0 0121 13c0 2.955-1.01 5.674-2.68 7.81A11.95 11.95 0 0112 23a11.95 11.95 0 01-6.32-2.19A12.037 12.037 0 013 13c.59-.572 1.99-1.145 3.84-2.422L12 14z"/>
      </svg>
    ),
  },
};

export default function ChooseRole() {
  const navigate = useNavigate();
  const { user, switchSessionRole } = useAuth();

  const roles = user?.availableRoles || [];

  if (!roles.length) {
    navigate('/login');
    return null;
  }

  const pick = (role) => {
    switchSessionRole(role);
    navigate(ROLE_META[role].route);
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0d0b1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px 16px', position: 'relative', overflow: 'hidden',
      fontFamily: "'Sora', system-ui, sans-serif"
    }}>
      {/* Orbs */}
      <div style={{ position:'fixed', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle,rgba(83,74,183,.45) 0%,transparent 70%)', top:'-140px', left:'-140px', filter:'blur(72px)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(15,110,86,.35) 0%,transparent 70%)', bottom:'-100px', right:'-100px', filter:'blur(72px)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'460px' }}>

        {/* Brand */}
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
            <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'linear-gradient(135deg,#534AB7,#7F77DD)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 20px rgba(83,74,183,.5)' }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width:'22px', height:'22px' }}>
                <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize:'27px', fontWeight:700, color:'#f0eeff', letterSpacing:'-.6px' }}>
              Club<span style={{ color:'#7F77DD' }}>Sphere</span>
            </span>
          </div>
          <p style={{ color:'#5a5880', fontSize:'15px' }}>Where would you like to go?</p>
        </div>

        {/* Card */}
        <div style={{ background:'rgba(20,17,40,.82)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', border:'1px solid rgba(127,119,221,.18)', borderRadius:'22px', padding:'36px', boxShadow:'0 8px 32px rgba(0,0,0,.5)' }}>
          <p style={{ fontSize:'22px', fontWeight:600, color:'#eceaff', marginBottom:'6px', letterSpacing:'-.4px' }}>
            Choose your view
          </p>
          <p style={{ fontSize:'15px', color:'#5a5880', marginBottom:'28px', lineHeight:1.5 }}>
            Your account has access to multiple dashboards.
          </p>

          {roles.map(role => {
            const meta = ROLE_META[role];
            if (!meta) return null;
            return (
              <button
                key={role}
                onClick={() => pick(role)}
                style={{
                  width:'100%', background:'rgba(255,255,255,.03)',
                  border:'1px solid rgba(127,119,221,.15)', borderRadius:'16px',
                  padding:'18px 20px', display:'flex', alignItems:'center', gap:'16px',
                  cursor:'pointer', marginBottom:'12px', textAlign:'left',
                  transition:'all .18s', outline:'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(127,119,221,.5)';
                  e.currentTarget.style.background = 'rgba(83,74,183,.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(127,119,221,.15)';
                  e.currentTarget.style.background = 'rgba(255,255,255,.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'rgba(83,74,183,.15)', color:'#7F77DD', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <div style={{ width:'26px', height:'26px' }}>{meta.icon}</div>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:'16px', fontWeight:600, color:'#eceaff', marginBottom:'3px' }}>{meta.label}</p>
                  <p style={{ fontSize:'13px', color:'#5a5880', lineHeight:1.5 }}>{meta.desc}</p>
                </div>
                <svg width="18" height="18" fill="none" stroke="#3e3d5c" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}