import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <StudentPortal />
      <AuthModule initialMode="login" />
    </div>
  );
}

export default App;