// Campus Connect Portal - Faculty Portal Component
import { useState } from 'react';

export default function FacultyPortal({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('assignments'); // 'notices', 'assignments', 'attendance', 'submissions'
  const [notices, setNotices] = useState([
    { id: 1, title: 'Mid-Semester Lab Evaluation Schedule', dept: 'SOCSE', date: 'Oct 15, 2026' },
    { id: 2, title: 'Guest Lecture on Cloud Native Computing', dept: 'CSE Dept', date: 'Oct 22, 2026' }
  ]);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeDept, setNewNoticeDept] = useState('SOCSE');

  const [newAssignment, setNewAssignment] = useState({ title: '', course: 'CS3301 - Full Stack', dueDate: '' });
  const [createdAssignments, setCreatedAssignments] = useState([
    { id: 1, title: 'Lab 6: RESTful API Express Server', course: 'CS3301 - Full Stack', dueDate: '2026-10-10' },
    { id: 2, title: 'Assignment 3: MongoDB Schema Design', course: 'CS3302 - DBMS', dueDate: '2026-10-18' }
  ]);

  const [studentsAttendance, setStudentsAttendance] = useState([
    { id: '1RV23CS001', name: 'Nayana M', status: 'Present' },
    { id: '1RV23CS002', name: 'Aditi Sharma', status: 'Present' },
    { id: '1RV23CS003', name: 'Kiran Kumar', status: 'Absent' },
    { id: '1RV23CS004', name: 'Rahul V', status: 'Present' }
  ]);

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    const item = {
      id: Date.now(),
      title: newNoticeTitle.trim(),
      dept: newNoticeDept,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    setNotices([item, ...notices]);
    setNewNoticeTitle('');
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title.trim()) return;
    const item = {
      id: Date.now(),
      title: newAssignment.title.trim(),
      course: newAssignment.course,
      dueDate: newAssignment.dueDate || '2026-11-15'
    };
    setCreatedAssignments([item, ...createdAssignments]);
    setNewAssignment({ title: '', course: 'CS3301 - Full Stack', dueDate: '' });
  };

  const toggleAttendance = (id) => {
    setStudentsAttendance(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s));
  };

  return (
    <div style={styles.container} id="facultyPortalSection">
      <div style={styles.portalCard}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>👨‍🏫 Faculty Portal</h2>
            <p style={styles.subtitle}>Instructor Dashboard &bull; School of CSE</p>
          </div>
          <button style={styles.backBtn} onClick={onBackToHome} type="button">
            &larr; Back to Main Campus View
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabsRow}>
          <button
            style={activeTab === 'assignments' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('assignments')}
            type="button"
          >
            Create Assignments
          </button>
          <button
            style={activeTab === 'notices' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('notices')}
            type="button"
          >
            Post Notices
          </button>
          <button
            style={activeTab === 'attendance' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('attendance')}
            type="button"
          >
            Mark Attendance
          </button>
          <button
            style={activeTab === 'submissions' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('submissions')}
            type="button"
          >
            View Submissions
          </button>
        </div>

        {/* Tab Content */}
        <div style={styles.contentBody}>
          {/* ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div>
              <h3 style={styles.sectionHeading}>✍️ Create New Student Assignment</h3>
              <form onSubmit={handleCreateAssignment} style={styles.formRow}>
                <input
                  type="text"
                  placeholder="Assignment title (e.g. Lab 7: MongoDB Queries)..."
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  style={styles.input}
                  required
                />
                <select
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  style={styles.select}
                >
                  <option value="CS3301 - Full Stack">CS3301 - Full Stack</option>
                  <option value="CS3302 - DBMS">CS3302 - DBMS</option>
                  <option value="CS3303 - Computer Networks">CS3303 - Networks</option>
                </select>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  style={styles.dateInput}
                />
                <button type="submit" style={styles.primaryBtn}>Create Assignment</button>
              </form>

              <h4 style={{ margin: '20px 0 10px 0', color: '#1e293b' }}>Active Course Assignments ({createdAssignments.length})</h4>
              <div style={styles.list}>
                {createdAssignments.map((a) => (
                  <div key={a.id} style={styles.cardItem}>
                    <div>
                      <strong>{a.title}</strong>
                      <p style={styles.subText}>{a.course} &bull; Due: {a.dueDate}</p>
                    </div>
                    <span style={styles.badgeBlue}>Published</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POST NOTICES */}
          {activeTab === 'notices' && (
            <div>
              <h3 style={styles.sectionHeading}>📢 Publish Department Notice</h3>
              <form onSubmit={handlePostNotice} style={styles.formRow}>
                <input
                  type="text"
                  placeholder="Notice announcement..."
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Dept (e.g. SOCSE)"
                  value={newNoticeDept}
                  onChange={(e) => setNewNoticeDept(e.target.value)}
                  style={{ ...styles.input, maxWidth: '140px' }}
                />
                <button type="submit" style={styles.primaryBtn}>Publish Notice</button>
              </form>

              <div style={styles.list}>
                {notices.map((n) => (
                  <div key={n.id} style={styles.cardItem}>
                    <div>
                      <strong>{n.title}</strong>
                      <p style={styles.subText}>{n.dept} &bull; Published: {n.date}</p>
                    </div>
                    <span style={styles.badgeGreen}>Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div>
              <h3 style={styles.sectionHeading}>📋 Course Attendance Roster: CS3301 Full Stack</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>Click status pill to toggle Present / Absent for each student.</p>
              <div style={styles.list}>
                {studentsAttendance.map((s) => (
                  <div key={s.id} style={styles.cardItem}>
                    <div>
                      <strong>{s.name}</strong>
                      <p style={styles.subText}>USN: {s.id}</p>
                    </div>
                    <button
                      onClick={() => toggleAttendance(s.id)}
                      style={s.status === 'Present' ? styles.badgeGreenBtn : styles.badgeRedBtn}
                    >
                      {s.status} (Click to toggle)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div>
              <h3 style={styles.sectionHeading}>📥 Review Student Submissions</h3>
              <div style={styles.list}>
                <div style={styles.cardItem}>
                  <div>
                    <strong>Nayana M (1RV23CS001)</strong>
                    <p style={styles.subText}>Lab Assignment 2: React State Management &bull; Submitted on Time</p>
                  </div>
                  <span style={styles.badgeGreen}>Submitted & Verified</span>
                </div>
                <div style={styles.cardItem}>
                  <div>
                    <strong>Aditi Sharma (1RV23CS002)</strong>
                    <p style={styles.subText}>ER Diagram Project Report &bull; Submitted</p>
                  </div>
                  <span style={styles.badgeGreen}>Verified</span>
                </div>
                <div style={styles.cardItem}>
                  <div>
                    <strong>Kiran Kumar (1RV23CS003)</strong>
                    <p style={styles.subText}>Lab 6: RESTful API Express Server &bull; Pending</p>
                  </div>
                  <span style={styles.badgeYellow}>Pending Review</span>
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
  header: { backgroundColor: '#1565c0', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#ffffff', margin: 0, fontSize: '22px', fontWeight: '800' },
  subtitle: { color: '#e3f2fd', margin: '4px 0 0 0', fontSize: '13px' },
  backBtn: { backgroundColor: '#ffffff', color: '#1565c0', border: 'none', padding: '9px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  tabsRow: { display: 'flex', backgroundColor: '#cbd5e1', borderBottom: '2px solid #94a3b8', flexWrap: 'wrap' },
  tab: { flex: '1 1 150px', padding: '12px 16px', backgroundColor: '#cbd5e1', color: '#334155', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', textAlign: 'center' },
  activeTab: { flex: '1 1 150px', padding: '12px 16px', backgroundColor: '#ffffff', color: '#1565c0', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', textAlign: 'center', borderBottom: '3px solid #1565c0' },
  contentBody: { padding: '25px' },
  sectionHeading: { color: '#1565c0', fontSize: '18px', fontWeight: '700', margin: '0 0 15px 0' },
  formRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' },
  input: { flex: '2', minWidth: '180px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' },
  select: { flex: '1', minWidth: '140px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff' },
  dateInput: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' },
  primaryBtn: { backgroundColor: '#1565c0', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  cardItem: { padding: '15px 18px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  subText: { color: '#64748b', margin: '4px 0 0 0', fontSize: '12px' },
  badgeBlue: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700' },
  badgeGreen: { backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700' },
  badgeYellow: { backgroundColor: '#fef9c3', color: '#854d0e', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700' },
  badgeGreenBtn: { backgroundColor: '#107c41', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' },
  badgeRedBtn: { backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }
};
