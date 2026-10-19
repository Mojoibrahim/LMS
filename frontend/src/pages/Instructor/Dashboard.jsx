import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingChatBot from '../../components/FloatingChatBot';
import ProfileEditor from '../../components/ProfileEditor';
import './Dashboard.css';

const courses = [
  { id: 'digital', title: 'Digital Skills for the Workplace', category: 'Digital literacy', learners: 84, completion: 76, lessons: 12, color: 'violet', initials: 'DS', updated: 'Updated 2 days ago' },
  { id: 'analytics', title: 'Introduction to Data Analytics', category: 'Technology', learners: 62, completion: 58, lessons: 10, color: 'blue', initials: 'DA', updated: 'Updated yesterday' },
  { id: 'business', title: 'Entrepreneurship & Business', category: 'Business', learners: 48, completion: 89, lessons: 8, color: 'amber', initials: 'EB', updated: 'Updated 5 days ago' },
];

const initialSubmissions = [
  { id: 1, learner: 'Joyce Muthoni', initials: 'JM', course: 'Digital Skills for the Workplace', assignment: 'Digital safety reflection', submitted: '12 min ago', status: 'Needs review', color: 'peach' },
  { id: 2, learner: 'Daniel Omondi', initials: 'DO', course: 'Introduction to Data Analytics', assignment: 'Reading a data chart', submitted: '38 min ago', status: 'Needs review', color: 'blue' },
  { id: 3, learner: 'Alice Wambui', initials: 'AW', course: 'Entrepreneurship & Business', assignment: 'Business idea canvas', submitted: '1 hr ago', status: 'Reviewed', color: 'green' },
  { id: 4, learner: 'Brian Kamau', initials: 'BK', course: 'Digital Skills for the Workplace', assignment: 'Create a strong password guide', submitted: 'Yesterday', status: 'Needs review', color: 'purple' },
];

const learners = [
  { name: 'Joyce Muthoni', email: 'joyce.muthoni@example.com', initials: 'JM', course: 'Digital Skills for the Workplace', progress: 92, activity: 'Today', color: 'peach' },
  { name: 'Daniel Omondi', email: 'daniel.omondi@example.com', initials: 'DO', course: 'Introduction to Data Analytics', progress: 68, activity: 'Today', color: 'blue' },
  { name: 'Alice Wambui', email: 'alice.wambui@example.com', initials: 'AW', course: 'Entrepreneurship & Business', progress: 54, activity: 'Yesterday', color: 'green' },
  { name: 'Brian Kamau', email: 'brian.kamau@example.com', initials: 'BK', course: 'Digital Skills for the Workplace', progress: 31, activity: 'Oct 12', color: 'purple' },
];

const sessions = [
  { day: '15', month: 'OCT', title: 'Digital safety: live Q&A', course: 'Digital Skills for the Workplace', time: 'Today · 2:00 PM – 3:00 PM', color: 'violet' },
  { day: '17', month: 'OCT', title: 'Understanding your first dataset', course: 'Introduction to Data Analytics', time: 'Friday · 10:30 AM – 11:30 AM', color: 'blue' },
  { day: '20', month: 'OCT', title: 'Building a business model', course: 'Entrepreneurship & Business', time: 'Monday · 1:00 PM – 2:00 PM', color: 'amber' },
];

const navigation = [
  { label: 'Overview', icon: 'grid', target: 'overview' },
  { label: 'My courses', icon: 'book', target: 'my-courses' },
  { label: 'Assignments', icon: 'clipboard', target: 'assignments', count: '3' },
  { label: 'Learners', icon: 'users', target: 'learners' },
  { label: 'Class schedule', icon: 'calendar', target: 'schedule' },
];

function Icon({ name, size = 19 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 11h6M9 15h6" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    arrowUp: <><path d="M7 17 17 7M7 7h10v10" /></>,
    play: <path d="m9 6 10 6-10 6z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
  };

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function InstructorDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Overview');
  const [search, setSearch] = useState('');
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Welcome to the new learning term!', time: 'Posted Oct 10', audience: 'All learners' },
    { id: 2, title: 'Remember to submit your weekly reflection.', time: 'Posted Oct 8', audience: 'Digital Skills learners' },
  ]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user_data') || '{}'));
  const firstName = user.name?.trim().split(/\s+/)[0] || 'Instructor';
  const currentDate = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  const pendingCount = submissions.filter((submission) => submission.status === 'Needs review').length;
  const filteredCourses = useMemo(
    () => courses.filter((course) => `${course.title} ${course.category}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const markReviewed = (submissionId) => {
    setSubmissions((current) => current.map((submission) => (
      submission.id === submissionId ? { ...submission, status: 'Reviewed' } : submission
    )));
    setSelectedSubmission(null);
  };

  const postAnnouncement = (event) => {
    event.preventDefault();
    const title = announcement.trim();
    if (!title) return;
    setAnnouncements((current) => [{ id: Date.now(), title, time: 'Posted just now', audience: 'All learners' }, ...current]);
    setAnnouncement('');
    setShowAnnouncementForm(false);
  };

  return (
    <div className="instructor-dashboard" id="overview">
      <aside className="instructor-sidebar">
        <a className="instructor-brand" href="#overview" onClick={() => setActiveNav('Overview')} aria-label="TusomeTec home">
          <span className="instructor-brand-mark">t</span>
          <span>Tusome<span className="instructor-brand-accent">Tec</span></span>
        </a>
        <div className="instructor-workspace">
          <span className="instructor-workspace-icon">T</span>
          <span className="instructor-workspace-copy"><strong>TusomeTec Academy</strong><small>Instructor workspace</small></span>
        </div>
        <span className="instructor-sidebar-label">TEACHING</span>
        <nav className="instructor-nav" aria-label="Instructor dashboard sections">
          {navigation.map((item) => (
            <a
              className={`instructor-nav-link${activeNav === item.label ? ' is-active' : ''}`}
              href={`#${item.target}`}
              key={item.label}
              onClick={() => setActiveNav(item.label)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.count && <span className="instructor-nav-count">{pendingCount}</span>}
            </a>
          ))}
        </nav>
        <span className="instructor-sidebar-label instructor-manage-label">COMMUNITY</span>
        <a className="instructor-nav-link" href="#announcements" onClick={() => setActiveNav('Announcements')}>
          <Icon name="send" size={18} /><span>Announcements</span>
        </a>

        <div className="instructor-help">
          <span className="instructor-help-icon"><Icon name="spark" size={16} /></span>
          <strong>Here to help</strong>
          <p>Need support with your course or class? Our team is one message away.</p>
          <a href="mailto:support@tusometec.com">Contact support <Icon name="arrow" size={13} /></a>
        </div>
        <button className="instructor-logout" type="button" onClick={handleLogout}>
          <Icon name="logout" size={18} /><span>Sign out</span>
        </button>
      </aside>
      <FloatingChatBot courseCount={courses.length} />

      <main className="instructor-main">
        <header className="instructor-topbar">
          <div className="instructor-mobile-brand"><span className="instructor-brand-mark">t</span><strong>Tusome<span className="instructor-brand-accent">Tec</span></strong></div>
          <div className="instructor-breadcrumb"><span>Teaching workspace</span><span className="breadcrumb-divider">/</span><strong>Overview</strong></div>
          <div className="instructor-top-actions">
            <span className="instructor-date">{currentDate}</span>
            <div className="instructor-notification-wrap">
              <button className={`instructor-icon-button${showNotifications ? ' is-active' : ''}`} type="button" aria-label="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications((visible) => !visible)}>
                <Icon name="bell" size={19} /><span className="instructor-notification-dot" />
              </button>
              {showNotifications && (
                <div className="instructor-notifications">
                  <strong>Teaching updates</strong>
                  <p><span />{pendingCount} learner submissions need your review.</p>
                  <p><span />Your next live class is today at 2:00 PM.</p>
                </div>
              )}
            </div>
            <ProfileEditor
              avatarClassName="instructor-profile-avatar"
              className="instructor-profile"
              copyClassName="instructor-profile-copy"
              onUpdated={setUser}
              roleLabel="Instructor"
              user={user}
            />
          </div>
        </header>

        <div className="instructor-content">
          <section className="instructor-welcome">
            <div>
              <p className="instructor-eyebrow">YOUR TEACHING SPACE</p>
              <h1>Good morning, {firstName} <span>✦</span></h1>
              <p>Here’s how your learners and courses are doing today.</p>
            </div>
            <a className="instructor-primary-button" href="#my-courses"><Icon name="plus" size={17} /> Manage my courses</a>
          </section>

          <section className="instructor-stats" aria-label="Teaching overview">
            <article className="instructor-stat-card">
              <span className="instructor-stat-icon stat-violet"><Icon name="book" size={19} /></span>
              <span className="instructor-stat-trend"><Icon name="arrowUp" size={13} /> 1 new</span>
              <p>My courses</p><strong>3</strong><small>Across 3 subject areas</small>
            </article>
            <article className="instructor-stat-card">
              <span className="instructor-stat-icon stat-blue"><Icon name="users" size={19} /></span>
              <span className="instructor-stat-trend"><Icon name="arrowUp" size={13} /> 8.4%</span>
              <p>Enrolled learners</p><strong>194</strong><small>Compared with last month</small>
            </article>
            <article className="instructor-stat-card">
              <span className="instructor-stat-icon stat-amber"><Icon name="clipboard" size={19} /></span>
              <a className={`instructor-stat-trend${pendingCount ? ' trend-attention' : ''}`} href="#assignments">{pendingCount ? 'Action needed' : 'All caught up'}</a>
              <p>To review</p><strong>{pendingCount}</strong><small>Learner submissions</small>
            </article>
            <article className="instructor-stat-card">
              <span className="instructor-stat-icon stat-green"><Icon name="check" size={19} /></span>
              <span className="instructor-stat-trend">This term</span>
              <p>Average completion</p><strong>74%</strong><small>Across your courses</small>
            </article>
          </section>

          <section className="instructor-main-grid">
            <article className="instructor-panel instructor-courses-panel" id="my-courses">
              <div className="instructor-panel-heading instructor-courses-heading">
                <div><h2>My courses</h2><p>Manage content and check learner progress</p></div>
                <label className="instructor-course-search"><Icon name="search" size={16} /><input aria-label="Search my courses" placeholder="Find a course" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
              </div>
              <div className="instructor-course-list">
                {filteredCourses.map((course) => (
                  <article className="instructor-course-card" key={course.id}>
                    <div className={`instructor-course-cover cover-${course.color}`}>{course.initials}</div>
                    <div className="instructor-course-details">
                      <span className="instructor-course-category">{course.category}</span>
                      <h3>{course.title}</h3>
                      <div className="instructor-course-meta"><span><Icon name="users" size={14} />{course.learners} learners</span><span><Icon name="book" size={14} />{course.lessons} lessons</span></div>
                      <div className="instructor-progress-line"><span>Course completion</span><strong>{course.completion}%</strong></div>
                      <div className="instructor-progress-track"><span style={{ width: `${course.completion}%` }} /></div>
                      <small className="instructor-course-updated">{course.updated}</small>
                    </div>
                    <a className="instructor-course-action" href="#learners" aria-label={`View learners in ${course.title}`} title="View learners"><Icon name="arrow" size={17} /></a>
                  </article>
                ))}
                {filteredCourses.length === 0 && <p className="instructor-empty-state">No courses match “{search}”. Try another search.</p>}
              </div>
            </article>

            <article className="instructor-panel instructor-sessions-panel" id="schedule">
              <div className="instructor-panel-heading">
                <div><h2>Upcoming classes</h2><p>Your next live learning sessions</p></div>
                <a className="instructor-text-link" href="#schedule">Full schedule <Icon name="arrow" size={14} /></a>
              </div>
              <div className="instructor-session-list">
                {sessions.map((session, index) => (
                  <article className={`instructor-session session-${session.color}`} key={session.title}>
                    <div className="instructor-session-date"><strong>{session.day}</strong><span>{session.month}</span></div>
                    <div className="instructor-session-details"><strong>{session.title}</strong><span>{session.course}</span><small><Icon name="clock" size={13} />{session.time}</small></div>
                    {index === 0 && <span className="session-today">TODAY</span>}
                  </article>
                ))}
              </div>
              <div className="session-note"><span className="session-note-dot" /><span>Your next class starts in <strong>2 hours</strong></span></div>
            </article>
          </section>

          <section className="instructor-panel instructor-submissions-panel" id="assignments">
            <div className="instructor-panel-heading">
              <div><h2>Assignment submissions</h2><p>Review learner work and keep feedback moving</p></div>
              <a className="instructor-review-filter" href="#assignments"><span />{pendingCount} need review</a>
            </div>
            <div className="instructor-table-scroll">
              <table className="instructor-submissions-table">
                <thead><tr><th>LEARNER</th><th>ASSIGNMENT</th><th>COURSE</th><th>SUBMITTED</th><th>STATUS</th><th /></tr></thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td><div className="instructor-learner-cell"><span className={`instructor-learner-avatar avatar-${submission.color}`}>{submission.initials}</span><strong>{submission.learner}</strong></div></td>
                      <td className="instructor-assignment-name">{submission.assignment}</td>
                      <td className="instructor-submission-course">{submission.course}</td>
                      <td className="instructor-submitted-time">{submission.submitted}</td>
                      <td><span className={`submission-status${submission.status === 'Reviewed' ? ' is-reviewed' : ''}`}><i />{submission.status}</span></td>
                      <td><button className={`submission-action${submission.status === 'Reviewed' ? ' is-done' : ''}`} type="button" onClick={() => submission.status === 'Reviewed' ? setSelectedSubmission({ ...submission, readOnly: true }) : setSelectedSubmission(submission)}>{submission.status === 'Reviewed' ? 'View' : 'Review'}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="instructor-bottom-grid">
            <article className="instructor-panel instructor-learners-panel" id="learners">
              <div className="instructor-panel-heading">
                <div><h2>Learner progress</h2><p>Recent activity from your classes</p></div>
                <a className="instructor-text-link" href="#learners">View all <Icon name="arrow" size={14} /></a>
              </div>
              <div className="instructor-learner-list">
                {learners.map((learner) => (
                  <div className="instructor-learner-row" key={learner.email}>
                    <span className={`instructor-learner-avatar avatar-${learner.color}`}>{learner.initials}</span>
                    <div className="instructor-learner-info"><strong>{learner.name}</strong><span>{learner.course}</span></div>
                    <div className="learner-progress"><div className="instructor-progress-track"><span style={{ width: `${learner.progress}%` }} /></div><small>{learner.progress}%</small></div>
                    <span className="learner-last-active">{learner.activity}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="instructor-panel instructor-announcements-panel" id="announcements">
              <div className="instructor-panel-heading">
                <div><h2>Class announcements</h2><p>Keep learners informed and on track</p></div>
                <button className="instructor-icon-add" type="button" aria-label="Create announcement" onClick={() => setShowAnnouncementForm((visible) => !visible)}><Icon name={showAnnouncementForm ? 'close' : 'plus'} size={17} /></button>
              </div>
              {showAnnouncementForm && (
                <form className="announcement-form" onSubmit={postAnnouncement}>
                  <label htmlFor="announcement-message">Announcement for all learners</label>
                  <textarea id="announcement-message" rows="3" maxLength="240" placeholder="Share an update, reminder, or resource…" value={announcement} onChange={(event) => setAnnouncement(event.target.value)} required />
                  <div><span>{announcement.length}/240</span><button type="submit" disabled={!announcement.trim()}><Icon name="send" size={14} /> Post</button></div>
                </form>
              )}
              <div className="announcement-list">
                {announcements.map((item) => (
                  <article className="announcement-item" key={item.id}>
                    <span className="announcement-bullet"><Icon name="send" size={14} /></span>
                    <div><strong>{item.title}</strong><span>{item.audience} · {item.time}</span></div>
                  </article>
                ))}
              </div>
              <a className="instructor-announcement-link" href="#announcements" onClick={() => setShowAnnouncementForm(true)}>Write an announcement <Icon name="arrow" size={14} /></a>
            </article>
          </section>

          <footer className="instructor-footer">© {new Date().getFullYear()} TusomeTec Academy <span>Helping every learner move forward.</span></footer>
        </div>
      </main>

      {selectedSubmission && (
        <div className="submission-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedSubmission(null); }}>
          <section className="submission-modal" role="dialog" aria-modal="true" aria-labelledby="submission-modal-title">
            <div className="submission-modal-heading"><div><span className="instructor-eyebrow">LEARNER SUBMISSION</span><h2 id="submission-modal-title">{selectedSubmission.assignment}</h2></div><button className="instructor-icon-add" type="button" aria-label="Close submission" onClick={() => setSelectedSubmission(null)}><Icon name="close" size={17} /></button></div>
            <p className="submission-modal-byline">Submitted by <strong>{selectedSubmission.learner}</strong> in {selectedSubmission.course} · {selectedSubmission.submitted}</p>
            <div className="submission-preview"><span className="submission-file-icon"><Icon name="clipboard" size={20} /></span><div><strong>{selectedSubmission.assignment}.pdf</strong><small>PDF document · learner submission</small></div><span className="submission-file-status"><Icon name="check" size={14} /> Received</span></div>
            <label className="feedback-label" htmlFor="instructor-feedback">Feedback notes</label>
            <textarea id="instructor-feedback" className="instructor-feedback" rows="4" placeholder="Add constructive feedback for this learner…" disabled={selectedSubmission.readOnly} />
            <div className="submission-modal-actions"><button type="button" className="submission-cancel" onClick={() => setSelectedSubmission(null)}>Close</button>{!selectedSubmission.readOnly && <button type="button" className="submission-mark-reviewed" onClick={() => markReviewed(selectedSubmission.id)}><Icon name="check" size={16} /> Mark as reviewed</button>}</div>
          </section>
        </div>
      )}
    </div>
  );
}

export default InstructorDashboard;
