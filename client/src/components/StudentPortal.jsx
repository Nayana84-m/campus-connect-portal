// Campus Connect Portal - Student Portal Component (Experiment 6: RESTful API Integration)
// Consumes backend Node.js & Express REST API (http://localhost:5000/api/assignments)
import { useState, useEffect } from 'react';

export default function StudentPortal({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('assignments'); // 'notices', 'assignments', 'attendance', 'profile'
  const [assignmentsList, setAssignmentsList] = useState([
    {
      id: '1',
      title: 'Lab Assignment 2: React State Management',
      course: 'CS3301 - Full Stack',
      dueDate: '2026-09-12',
      status: 'Pending',
      submittedBy: 'RVU Student'
    },
    {
      id: '2',
      title: 'ER Diagram Project Report',
      course: 'CS3302 - DBMS',
      dueDate: '2026-09-01',
      status: 'Submitted',
      submittedBy: 'RVU Student'
    }
  ]);
  const [apiStatus, setApiStatus] = useState('Connecting to Express REST API...');
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('CS3301 - Full Stack');

  // Fetch assignments from Express REST API
  const fetchAssignments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/assignments');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAssignmentsList(json.data);
        setApiStatus('🟢 Connected to Express REST API (http://localhost:5000)');
      }
    } catch (err) {
      console.log('REST API Connection Notice:', err);
      setApiStatus('⚡ Express Backend Server (http://localhost:5000)');
    }
  };

  useEffect(() => {
    fetchAssignments();
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

  // Toggle submission status via HTTP PUT REST request
  const toggleSubmitStatus = async (item) => {
    const newStatus = item.status === 'Pending' ? 'Submitted' : 'Pending';
    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setAssignmentsList((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, status: newStatus } : a))
        );
      }
    } catch (err) {
      // Local state fallback if backend server isn't running
      setAssignmentsList((prev) =>
        prev.map((a) => (a.id === item.id ? { ...a, status: newStatus } : a))
      );
    }
  };

  // Post new assignment via HTTP POST REST request
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const payload = {
      title: newTitle.trim(),
      course: newCourse,
      dueDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      submittedBy: 'RVU Student'
    };

    try {
      const res = await fetch('http://localhost:5000/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAssignmentsList((prev) => [json.data, ...prev]);
      }
    } catch (err) {
      // Local state fallback
      const newItem = { ...payload, id: Date.now().toString() };
      setAssignmentsList((prev) => [newItem, ...prev]);
    }

    setNewTitle('');
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

          {/* TAB 2: ASSIGNMENTS (Consumes RESTful API Services - Experiment 6) */}
          {activeTab === 'assignments' && (
            <div>
              <div style={styles.apiHeaderRow}>
                <h3 style={styles.sectionHeading}>📝 Assignments &amp; Submissions</h3>
                <span style={styles.apiStatusBadge}>{apiStatus}</span>
              </div>

              {/* Submit New Assignment Form (HTTP POST API call) */}
              <form onSubmit={handleAddAssignment} style={styles.addForm}>
                <input
                  type="text"
                  placeholder="Enter new assignment title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={styles.formInput}
                  required
                />
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  style={styles.formSelect}
                >
                  <option value="CS3301 - Full Stack">CS3301 - Full Stack</option>
                  <option value="CS3302 - DBMS">CS3302 - DBMS</option>
                  <option value="CS3303 - Computer Networks">CS3303 - Networks</option>
                </select>
                <button type="submit" style={styles.formSubmitBtn}>
                  + Submit Assignment (POST API)
                </button>
              </form>

              {/* Assignments List */}
              <div style={styles.itemList}>
                {assignmentsList.map((item) => (
                  <div key={item.id} style={styles.itemCard}>
                    <div>
                      <h4 style={styles.itemTitle}>{item.title}</h4>
                      <p style={styles.itemSubtext}>
                        {item.course} &bull; Due: {item.dueDate}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSubmitStatus(item)}
                      style={
                        item.status === 'Submitted'
                          ? styles.submittedBadgeBtn
                          : styles.pendingBadgeBtn
                      }
                      title="Click to toggle submission status via HTTP PUT API"
                    >
                      {item.status} (Click to toggle)
                    </button>
                  </div>
                ))}
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
  apiHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  sectionHeading: {
    color: '#07182f',
    fontSize: '18px',
    fontWeight: '700',
    margin: 0
  },
  apiStatusBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #bae6fd'
  },
  addForm: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  formInput: {
    flex: '2',
    minWidth: '200px',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '13px',
    outline: 'none'
  },
  formSelect: {
    flex: '1',
    minWidth: '150px',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '13px',
    outline: 'none',
    backgroundColor: '#ffffff'
  },
  formSubmitBtn: {
    backgroundColor: '#0d5c3a',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer'
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
  pendingBadgeBtn: {
    backgroundColor: '#d6a11e',
    color: '#1f2937',
    padding: '6px 14px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  submittedBadgeBtn: {
    backgroundColor: '#107c41',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s'
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
