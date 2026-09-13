// Campus Connect Portal - Student Portal Component (Lab 4 State Management)
import { useState, useEffect } from 'react';

export default function StudentPortal({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('assignments'); // 'notices', 'assignments', 'attendance', 'profile'

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#student') {
        setActiveTab('assignments');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.hash = '#roles';
      const rolesElem = document.getElementById('roles');
      if (rolesElem) rolesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.container} id="studentPortalSection">
      {/* Student Portal Card Container */}
      <div style={styles.portalCard}>
        {/* Dark Navy Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>🎓 Student Portal</h2>
            <p style={styles.subtitle}>Welcome, RVU Student</p>
          </div>
          <button style={styles.backBtn} onClick={handleBack} type="button">
            &larr; Back to Main Campus View
          </button>
        </div>

        {/* Tab Navigation Row */}
        <div style={styles.tabsRow}>
          <button
            style={activeTab === 'notices' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('notices')}
            type="button"
          >
            Notices &amp; Events
          </button>
          <button
            style={activeTab === 'assignments' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('assignments')}
            type="button"
          >
            Assignments
          </button>
          <button
            style={activeTab === 'attendance' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('attendance')}
            type="button"
          >
            Track Attendance
          </button>
          <button
            style={activeTab === 'profile' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('profile')}
            type="button"
          >
            Profile
          </button>
        </div>

        {/* Tab Content Display Area */}
        <div style={styles.contentBody}>
          {/* TAB 1: NOTICES & EVENTS */}
          {activeTab === 'notices' && (
            <div>
              <h3 style={styles.sectionHeading}>📢 Notices &amp; Events</h3>
              <div style={styles.itemList}>
                <div style={styles.itemCard}>
                  <div>
                    <h4 style={styles.itemTitle}>Mid-Semester Lab Evaluation Schedule</h4>
                    <p style={styles.itemSubtext}>SOCSE &bull; Posted: Sept 05, 2026</p>
                  </div>
                </div>
                <div style={styles.itemCard}>
                  <div>
                    <h4 style={styles.itemTitle}>Hackathon 2026 Registration Open</h4>
                    <p style={styles.itemSubtext}>RVU Tech Club &bull; Posted: Sept 01, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div>
              <h3 style={styles.sectionHeading}>📝 Assignments &amp; Submissions</h3>
              <div style={styles.itemList}>
                <div style={styles.itemCard}>
                  <div>
                    <h4 style={styles.itemTitle}>Lab Assignment 2: React State Management</h4>
                    <p style={styles.itemSubtext}>CS3301 - Full Stack &bull; Due: Sept 12, 2026</p>
                  </div>
                  <span style={styles.pendingBadge}>Pending</span>
                </div>
                <div style={styles.itemCard}>
                  <div>
                    <h4 style={styles.itemTitle}>ER Diagram Project Report</h4>
                    <p style={styles.itemSubtext}>CS3302 - DBMS &bull; Due: Sept 01, 2026</p>
                  </div>
                  <span style={styles.submittedBadge}>Submitted</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRACK ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div>
              <h3 style={styles.sectionHeading}>📊 Attendance Tracker</h3>
              <div style={styles.grid}>
                <div style={styles.metricCard}>
                  <h4 style={styles.metricTitle}>CS3301 - Full Stack</h4>
                  <p style={styles.metricText}>88% Attendance</p>
                </div>
                <div style={styles.metricCard}>
                  <h4 style={styles.metricTitle}>CS3302 - DBMS</h4>
                  <p style={styles.metricText}>92% Attendance</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div>
              <h3 style={styles.sectionHeading}>👤 Student Profile</h3>
              <div style={styles.profileBox}>
                <p><strong>Name:</strong> RVU Student</p>
                <p><strong>Department:</strong> School of Computer Science &amp; Engineering (SOCSE)</p>
                <p><strong>Course:</strong> CS3301 - Full Stack Development</p>
                <p><strong>Status:</strong> Active Enrolled</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 15px',
    backgroundColor: '#eef3f7',
    display: 'flex',
    justifyContent: 'center'
  },
  portalCard: {
    width: '850px',
    maxWidth: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    backgroundColor: '#07182f',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#d6b15a',
    margin: 0,
    fontSize: '22px',
    fontWeight: '800'
  },
  subtitle: {
    color: '#ffffff',
    margin: '4px 0 0 0',
    fontSize: '13px',
    fontStyle: 'italic'
  },
  backBtn: {
    backgroundColor: '#d6a11e',
    color: '#1f2937',
    border: 'none',
    padding: '9px 16px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer'
  },
  tabsRow: {
    display: 'flex',
    backgroundColor: '#cbd5e1',
    borderBottom: '2px solid #94a3b8'
  },
  tab: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#cbd5e1',
    color: '#334155',
    border: 'none',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  activeTab: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    color: '#07182f',
    border: 'none',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
    borderBottom: '3px solid #07182f'
  },
  contentBody: {
    padding: '25px'
  },
  sectionHeading: {
    color: '#07182f',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  itemCard: {
    padding: '16px 20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTitle: {
    color: '#1e293b',
    margin: 0,
    fontSize: '15px',
    fontWeight: '700'
  },
  itemSubtext: {
    color: '#64748b',
    margin: '4px 0 0 0',
    fontSize: '13px'
  },
  pendingBadge: {
    backgroundColor: '#d6a11e',
    color: '#1f2937',
    padding: '6px 14px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '12px'
  },
  submittedBadge: {
    backgroundColor: '#107c41',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '12px'
  },
  grid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  metricCard: {
    flex: '1 1 250px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  metricTitle: {
    color: '#07182f',
    margin: 0,
    fontSize: '16px',
    fontWeight: '700'
  },
  metricText: {
    color: '#107c41',
    margin: '10px 0 0 0',
    fontSize: '18px',
    fontWeight: '800'
  },
  profileBox: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    lineHeight: '2',
    color: '#1e293b',
    fontSize: '14px'
  }
};
