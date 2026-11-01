import { useState, useEffect } from 'react';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';
import FacultyPortal from './components/FacultyPortal.jsx';
import AdminPortal from './components/AdminPortal.jsx';

function App() {
  const [activePortal, setActivePortal] = useState('student'); // 'student', 'faculty', 'admin', 'auth'

  useEffect(() => {
    const handlePortalSwitch = (e) => {
      if (e.detail && e.detail.role) {
        const role = e.detail.role.toLowerCase();
        setActivePortal(role);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#student') setActivePortal('student');
      else if (hash === '#faculty') setActivePortal('faculty');
      else if (hash === '#admin') setActivePortal('admin');
      else if (hash === '#login' || hash === '#register') setActivePortal('auth');
    };

    window.addEventListener('switchPortal', handlePortalSwitch);
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('switchPortal', handlePortalSwitch);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '#roles';
    const rolesElem = document.getElementById('roles');
    if (rolesElem) rolesElem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} id="portalMountPoint">
      {/* Dynamic Portal View based on active selection */}
      {activePortal === 'student' && <StudentPortal onBackToHome={handleBackToHome} />}
      {activePortal === 'faculty' && <FacultyPortal onBackToHome={handleBackToHome} />}
      {activePortal === 'admin' && <AdminPortal onBackToHome={handleBackToHome} />}
      
      {/* Authentication Module (Login / Register) */}
      <AuthModule initialMode="login" />
    </div>
  );
}

export default App;
