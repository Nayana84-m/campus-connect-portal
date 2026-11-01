// Campus Connect Portal - Admin Portal Component
import { useState } from 'react';

export default function AdminPortal({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'notices', 'reports', 'settings'
  const [users, setUsers] = useState([
    { id: 1, name: 'Nayana M', email: 'nayanambsc24@rvu.edu.in', role: 'Student', status: 'Active' },
    { id: 2, name: 'Dr. Ramesh Rao', email: 'ramesh.rao@rvu.edu.in', role: 'Faculty', status: 'Active' },
    { id: 3, name: 'Pooja K', email: 'pooja.k@rvu.edu.in', role: 'Faculty', status: 'Active' },
    { id: 4, name: 'Admin Master', email: 'admin@rvu.edu.in', role: 'Admin', status: 'Active' }
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });

  const [systemSettings, setSystemSettings] = useState({
    academicYear: '2026-2027',
    semester: '5th Semester',
    portalMaintenance: false,
    emailAlerts: true
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    const u = {
      id: Date.now(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: 'Active'
    };
    setUsers([...users, u]);
    setNewUser({ name: '', email: '', role: 'Student' });
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div style={styles.container} id="adminPortalSection">
      <div style={styles.portalCard}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>🛡️ Admin Portal</h2>
            <p style={styles.subtitle}>System Administration &bull; Campus Connect Control Center</p>
          </div>
          <button style={styles.backBtn} onClick={onBackToHome} type="button">
            &larr; Back to Main Campus View
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabsRow}>
          <button
            style={activeTab === 'users' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('users')}
            type="button"
          >
            Manage Users
          </button>
          <button
            style={activeTab === 'reports' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('reports')}
            type="button"
          >
            System Reports
          </button>
          <button
            style={activeTab === 'settings' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('settings')}
            type="button"
          >
            System Settings
          </button>
        </div>

        {/* Tab Content */}
        <div style={styles.contentBody}>
          {/* MANAGE USERS */}
          {activeTab === 'users' && (
            <div>
              <h3 style={styles.sectionHeading}>👥 User Management</h3>
              <form onSubmit={handleAddUser} style={styles.formRow}>
                <input
                  type="text"
                  placeholder="Full Name..."
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  style={styles.input}
                  required
                />
                <input
                  type="email"
                  placeholder="RVU Email..."
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  style={styles.input}
                  required
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  style={styles.select}
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Admin">Admin</option>
                </select>
                <button type="submit" style={styles.primaryBtn}>+ Add User</button>
              </form>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Role</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} style={styles.tr}>
                        <td style={styles.td}><strong>{u.name}</strong></td>
                        <td style={styles.td}>{u.email}</td>
                        <td style={styles.td}>
                          <span style={u.role === 'Admin' ? styles.badgePurple : u.role === 'Faculty' ? styles.badgeBlue : styles.badgeGreen}>
                            {u.role}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.badgeSuccess}>{u.status}</span>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => deleteUser(u.id)} style={styles.deleteBtn}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SYSTEM REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <h3 style={styles.sectionHeading}>📊 Campus System Analytics &amp; Reports</h3>
              <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                  <p style={styles.metricLabel}>Total Registered Users</p>
                  <h4 style={styles.metricVal}>1,248</h4>
                  <span style={styles.metricSub}>+12% this semester</span>
                </div>
                <div style={styles.metricCard}>
                  <p style={styles.metricLabel}>Assignments Submitted</p>
                  <h4 style={styles.metricVal}>3,490</h4>
                  <span style={styles.metricSub}>94% on-time completion</span>
                </div>
                <div style={styles.metricCard}>
                  <p style={styles.metricLabel}>Active Faculty</p>
                  <h4 style={styles.metricVal}>68</h4>
                  <span style={styles.metricSub}>Across 4 departments</span>
                </div>
                <div style={styles.metricCard}>
                  <p style={styles.metricLabel}>System Health</p>
                  <h4 style={{ ...styles.metricVal, color: '#107c41' }}>99.9%</h4>
                  <span style={styles.metricSub}>Express REST API Online</span>
                </div>
              </div>
            </div>
          )}

          {/* SYSTEM SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={styles.sectionHeading}>⚙️ Campus Portal Settings</h3>
              <div style={styles.settingsBox}>
                <div style={styles.settingItem}>
                  <div>
                    <strong>Academic Year</strong>
                    <p style={styles.subText}>Current operational academic cycle</p>
                  </div>
                  <input
                    type="text"
                    value={systemSettings.academicYear}
                    onChange={(e) => setSystemSettings({ ...systemSettings, academicYear: e.target.value })}
                    style={styles.inputSetting}
                  />
                </div>
                <div style={styles.settingItem}>
                  <div>
                    <strong>Semester Term</strong>
                    <p style={styles.subText}>Current active semester</p>
                  </div>
                  <input
                    type="text"
                    value={systemSettings.semester}
                    onChange={(e) => setSystemSettings({ ...systemSettings, semester: e.target.value })}
                    style={styles.inputSetting}
                  />
                </div>
                <div style={styles.settingItem}>
                  <div>
                    <strong>Email Notification Alerts</strong>
                    <p style={styles.subText}>Send automated email updates for announcements</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={systemSettings.emailAlerts}
                    onChange={(e) => setSystemSettings({ ...systemSettings, emailAlerts: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px 15px', backgroundColor: '#eef3f7', display: 'flex', justifyContent: 'center' },
  portalCard: { width: '850px', maxWidth: '100%', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', overflow: 'hidden', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { backgroundColor: '#6a1b9a', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#ffffff', margin: 0, fontSize: '22px', fontWeight: '800' },
  subtitle: { color: '#f3e5f5', margin: '4px 0 0 0', fontSize: '13px' },
  backBtn: { backgroundColor: '#ffffff', color: '#6a1b9a', border: 'none', padding: '9px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  tabsRow: { display: 'flex', backgroundColor: '#cbd5e1', borderBottom: '2px solid #94a3b8' },
  tab: { flex: 1, padding: '12px 16px', backgroundColor: '#cbd5e1', color: '#334155', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', textAlign: 'center' },
  activeTab: { flex: 1, padding: '12px 16px', backgroundColor: '#ffffff', color: '#6a1b9a', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', textAlign: 'center', borderBottom: '3px solid #6a1b9a' },
  contentBody: { padding: '25px' },
  sectionHeading: { color: '#6a1b9a', fontSize: '18px', fontWeight: '700', margin: '0 0 15px 0' },
  formRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' },
  input: { flex: '2', minWidth: '160px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' },
  select: { flex: '1', minWidth: '120px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff' },
  primaryBtn: { backgroundColor: '#6a1b9a', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  thRow: { backgroundColor: '#f1f5f9' },
  th: { padding: '12px 14px', borderBottom: '2px solid #cbd5e1', color: '#334155' },
  tr: { borderBottom: '1px solid #e2e8f0' },
  td: { padding: '12px 14px', color: '#1e293b' },
  deleteBtn: { backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' },
  badgePurple: { backgroundColor: '#f3e5f5', color: '#6a1b9a', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' },
  badgeBlue: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' },
  badgeGreen: { backgroundColor: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' },
  badgeSuccess: { backgroundColor: '#e2e8f0', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontWeight: '600' },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' },
  metricCard: { padding: '18px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' },
  metricLabel: { color: '#64748b', fontSize: '12px', margin: 0 },
  metricVal: { fontSize: '24px', color: '#1e293b', margin: '8px 0 4px 0', fontWeight: '800' },
  metricSub: { fontSize: '11px', color: '#107c41', fontWeight: '600' },
  settingsBox: { display: 'flex', flexDirection: 'column', gap: '15px' },
  settingItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' },
  subText: { color: '#64748b', fontSize: '12px', margin: '4px 0 0 0' },
  inputSetting: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }
};
