// Campus Connect Portal - Interactive Authentication & Role Module
// Matching classroom reference login form and providing tab toggle & role switching
import { useState, useEffect } from 'react';

export default function AuthModule({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState('Student');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Listen for hash changes (#login or #register) and custom role selection events
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setIsLogin(true);
        setMessage('');
      } else if (hash === '#register') {
        setIsLogin(false);
        setMessage('');
      }
    };

    const handleRoleSelect = (e) => {
      if (e.detail && e.detail.role) {
        setRole(e.detail.role);
        setIsLogin(true);
        setMessage('');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('roleSelect', handleRoleSelect);

    if (window.location.hash === '#register') {
      setIsLogin(false);
    } else if (window.location.hash === '#login') {
      setIsLogin(true);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('roleSelect', handleRoleSelect);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('⚠️ Passwords do not match!');
      return;
    }

    if (isLogin) {
      setMessage(`✅ ${role} Login Successful! Welcome back, ${formData.email.split('@')[0] || 'User'}.`);
    } else {
      setMessage(`🎉 ${role} Account Created Successfully! You can now log in.`);
      setIsLogin(true);
    }

    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div style={styles.sectionWrapper} id="authSection">
      {/* Login / Registration Card Container */}
      <div style={styles.cardContainer} id="login">
        {/* Navy Header Banner */}
        <div style={styles.header}>
          <h1 style={styles.title}>RV UNIVERSITY</h1>
          <p style={styles.subtitle}>Excellence In Education</p>
        </div>

        {/* Dynamic Role Heading */}
        <h2 style={styles.formTitle}>
          {role} {isLogin ? 'Login' : 'Registration'}
        </h2>

        {/* Tab Toggle Controls */}
        <div style={styles.tabContainer}>
          <button
            style={isLogin ? styles.activeTab : styles.inactiveTab}
            onClick={() => { setIsLogin(true); setMessage(''); }}
            type="button"
          >
            Login
          </button>
          <button
            style={!isLogin ? styles.activeTab : styles.inactiveTab}
            onClick={() => { setIsLogin(false); setMessage(''); }}
            type="button"
          >
            Register
          </button>
        </div>

        {/* Status Alert Banner */}
        {message && (
          <div style={styles.messageBanner}>
            {message}
          </div>
        )}

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name (e.g. Nayana M)"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="RVU Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          )}

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? `Login as ${role}` : 'Create Account'}
          </button>
        </form>
      </div>

      {/* Next Lab Module Placeholder (Lab 4 Extension Feature) */}
      <div style={styles.nextLabPreview}>
        <div style={styles.nextLabHeader}>
          <h3>🚀 Next Lab Module Extension (LAB 4 Preview)</h3>
          <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Ready for Lab 4: Form Validation, Session Storage & Dynamic Student Record Management API.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  sectionWrapper: {
    padding: '50px 15px',
    backgroundColor: '#eef3f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px'
  },
  cardContainer: {
    width: '380px',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    backgroundColor: '#07182f',
    padding: '18px 12px',
    borderRadius: '6px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  title: {
    color: '#d6b15a',
    margin: 0,
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  subtitle: {
    color: '#ffffff',
    margin: '4px 0 0 0',
    fontSize: '12px',
    fontStyle: 'italic',
    letterSpacing: '0.5px'
  },
  formTitle: {
    color: '#1e293b',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px'
  },
  tabContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px'
  },
  activeTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#07182f',
    color: '#ffffff',
    border: 'none',
    fontWeight: '700',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  inactiveTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#d9e1e7',
    color: '#64748b',
    border: 'none',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  messageBanner: {
    padding: '10px 14px',
    borderRadius: '6px',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '16px',
    border: '1px solid #bae6fd'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  input: {
    padding: '12px 14px',
    borderRadius: '4px',
    border: '1px solid #b8c2cc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  submitBtn: {
    padding: '13px',
    backgroundColor: '#d6a11e',
    color: '#1f2937',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '800',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'background-color 0.2s ease'
  },
  nextLabPreview: {
    maxWidth: '800px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px 25px',
    border: '2px dashed #cbd5e1',
    textAlign: 'center'
  },
  nextLabHeader: {
    color: '#334155',
    lineHeight: '1.6'
  }
};