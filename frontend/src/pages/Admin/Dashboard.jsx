import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import FloatingChatBot from '../../components/FloatingChatBot';
import ProfileEditor from '../../components/ProfileEditor';
import './Dashboard.css';

const enrollmentData = {
  '7 days': [
    { label: 'Mon', enrollments: 42 },
    { label: 'Tue', enrollments: 58 },
    { label: 'Wed', enrollments: 47 },
    { label: 'Thu', enrollments: 71 },
    { label: 'Fri', enrollments: 63 },
    { label: 'Sat', enrollments: 86 },
    { label: 'Sun', enrollments: 74 },
  ],
  '30 days': [
    { label: 'Week 1', enrollments: 196 },
    { label: 'Week 2', enrollments: 248 },
    { label: 'Week 3', enrollments: 219 },
    { label: 'Week 4', enrollments: 312 },
  ],
  '12 months': [
    { label: 'May', enrollments: 640 },
    { label: 'Jun', enrollments: 720 },
    { label: 'Jul', enrollments: 680 },
    { label: 'Aug', enrollments: 810 },
    { label: 'Sep', enrollments: 930 },
    { label: 'Oct', enrollments: 1084 },
  ],
};

const courses = [
  { name: 'Digital Skills for the Workplace', category: 'Digital literacy', instructor: 'Grace Wanjiku', learners: 384, completion: 82, status: 'Published', color: 'violet', initials: 'DS' },
  { name: 'Introduction to Data Analytics', category: 'Technology', instructor: 'David Otieno', learners: 296, completion: 68, status: 'Published', color: 'blue', initials: 'DA' },
  { name: 'Entrepreneurship & Business', category: 'Business', instructor: 'Faith Njeri', learners: 241, completion: 74, status: 'Published', color: 'amber', initials: 'EB' },
  { name: 'Communication Skills', category: 'Professional skills', instructor: 'Peter Mwangi', learners: 188, completion: 91, status: 'Review', color: 'green', initials: 'CS' },
];

const activities = [
  { initials: 'JM', name: 'Joyce Muthoni', action: 'completed', target: 'Digital Skills for the Workplace', time: '12 min ago', color: 'peach' },
  { initials: 'DO', name: 'Daniel Omondi', action: 'enrolled in', target: 'Introduction to Data Analytics', time: '38 min ago', color: 'blue' },
  { initials: 'AW', name: 'Alice Wambui', action: 'submitted an assessment in', target: 'Communication Skills', time: '1 hr ago', color: 'green' },
];

const navItems = [
  { label: 'Overview', icon: 'grid', target: 'dashboard' },
  { label: 'Courses', icon: 'book', target: 'courses' },
  { label: 'People', icon: 'users', target: 'learners' },
  { label: 'Payments', icon: 'wallet', target: 'revenue' },
  { label: 'Reports', icon: 'chart', target: 'enrollment' },
];

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 14h2" /><path d="M6 5V3h12v2" /></>,
    chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    arrowUp: <><path d="M7 17 17 7M7 7h10v10" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  };

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [range, setRange] = useState('30 days');
  const [courseSearch, setCourseSearch] = useState('');
  const [activeNav, setActiveNav] = useState('Overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user_data') || '{}'));
  const firstName = user.name?.trim().split(/\s+/)[0] || 'Admin';
  const filteredCourses = useMemo(
    () => courses.filter((course) => `${course.name} ${course.category} ${course.instructor}`.toLowerCase().includes(courseSearch.toLowerCase())),
    [courseSearch],
  );
  const currentDate = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const exportReport = () => {
    const rows = [
      ['Course', 'Category', 'Instructor', 'Learners', 'Completion rate', 'Status'],
      ...courses.map((course) => [course.name, course.category, course.instructor, course.learners, `${course.completion}%`, course.status]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tusome-tec-course-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-dashboard" id="dashboard">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="#dashboard" onClick={() => setActiveNav('Overview')} aria-label="TusomeTec home">
          <span className="admin-brand-mark">t</span>
          <span>Tusome<span className="brand-highlight">Tec</span></span>
        </a>

        <div className="workspace-switcher">
          <span className="workspace-icon">T</span>
          <span className="workspace-copy"><strong>TusomeTec Academy</strong><small>Learning workspace</small></span>
          <Icon name="chevron" size={16} />
        </div>

        <span className="sidebar-section-label">WORKSPACE</span>
        <nav className="admin-nav" aria-label="Admin dashboard sections">
          {navItems.map((item) => (
            <a
              className={`admin-nav-link${activeNav === item.label ? ' is-active' : ''}`}
              href={`#${item.target}`}
              key={item.label}
              onClick={() => setActiveNav(item.label)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.label === 'Courses' && <span className="nav-count">24</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-divider" />
        <span className="sidebar-section-label">MANAGE</span>
        <a className="admin-nav-link" href="#instructors" onClick={() => setActiveNav('People')}>
          <Icon name="users" size={19} /><span>Instructors</span><span className="nav-pending">3</span>
        </a>
        <a className="admin-nav-link" href="#assessments" onClick={() => setActiveNav('Courses')}>
          <Icon name="check" size={19} /><span>Assessments</span>
        </a>

        <div className="sidebar-help">
          <span className="help-spark"><Icon name="spark" size={16} /></span>
          <strong>Need a hand?</strong>
          <p>Visit the help center for tips on managing your learning workspace.</p>
          <a href="mailto:support@tusometec.com">Visit help center <Icon name="chevron" size={13} /></a>
        </div>

        <button className="admin-logout" type="button" onClick={handleLogout}>
          <Icon name="logout" size={18} /><span>Sign out</span>
        </button>
      </aside>
      <FloatingChatBot courseCount={courses.length} />

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="mobile-brand">
            <span className="admin-brand-mark">t</span><strong>Tusome<span className="brand-highlight">Tec</span></strong>
          </div>
          <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>Overview</strong></div>
          <div className="topbar-actions">
            <span className="topbar-date">{currentDate}</span>
            <div className="notification-wrap">
              <button className={`icon-button${showNotifications ? ' is-active' : ''}`} type="button" aria-label="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications((visible) => !visible)}>
                <Icon name="bell" size={19} /><span className="notification-dot" />
              </button>
              {showNotifications && (
                <div className="notification-popover">
                  <strong>Notifications</strong>
                  <p><span className="notification-unread" />3 instructor profiles are waiting for review.</p>
                  <p><span className="notification-unread" />Your monthly learning report is ready.</p>
                </div>
              )}
            </div>
            <ProfileEditor
              avatarClassName="profile-avatar"
              className="topbar-profile"
              copyClassName="profile-copy"
              onUpdated={setUser}
              roleLabel="Administrator"
              user={user}
            />
          </div>
        </header>

        <div className="admin-content">
          <section className="welcome-row">
            <div>
              <p className="welcome-kicker">ADMIN OVERVIEW</p>
              <h1>Good morning, {firstName} <span className="wave">✦</span></h1>
              <p className="welcome-description">Here’s what’s happening across your learning workspace.</p>
            </div>
            <button className="export-button" type="button" onClick={exportReport}><Icon name="download" size={17} /> Export report</button>
          </section>

          <section className="stats-grid" aria-label="Learning platform overview">
            <article className="stat-card" id="learners">
              <div className="stat-card-top"><span className="stat-icon stat-icon-purple"><Icon name="users" size={19} /></span><span className="stat-trend"><Icon name="arrowUp" size={13} /> 12.8%</span></div>
              <p className="stat-label">Total learners</p><strong className="stat-value">2,846</strong><p className="stat-footnote">vs. last month</p>
              <div className="stat-sparkline purple-spark"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="stat-card">
              <div className="stat-card-top"><span className="stat-icon stat-icon-blue"><Icon name="book" size={19} /></span><span className="stat-trend"><Icon name="arrowUp" size={13} /> 8.2%</span></div>
              <p className="stat-label">Active courses</p><strong className="stat-value">24</strong><p className="stat-footnote">3 drafts in progress</p>
              <div className="stat-sparkline blue-spark"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="stat-card" id="revenue">
              <div className="stat-card-top"><span className="stat-icon stat-icon-green"><Icon name="wallet" size={19} /></span><span className="stat-trend"><Icon name="arrowUp" size={13} /> 6.4%</span></div>
              <p className="stat-label">Revenue this month</p><strong className="stat-value">KES 486,200</strong><p className="stat-footnote">vs. last month</p>
              <div className="stat-sparkline green-spark"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="stat-card">
              <div className="stat-card-top"><span className="stat-icon stat-icon-orange"><Icon name="chart" size={19} /></span><span className="stat-trend"><Icon name="arrowUp" size={13} /> 3.1%</span></div>
              <p className="stat-label">Completion rate</p><strong className="stat-value">78.4%</strong><p className="stat-footnote">across all courses</p>
              <div className="stat-sparkline orange-spark"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
          </section>

          <section className="analytics-grid">
            <article className="panel enrollment-panel" id="enrollment">
              <div className="panel-heading">
                <div><h2>Enrollment overview</h2><p>Track learner sign-ups over time</p></div>
                <label className="range-select-label" htmlFor="enrollment-range">Period</label>
                <select id="enrollment-range" className="range-select" value={range} onChange={(event) => setRange(event.target.value)}>
                  {Object.keys(enrollmentData).map((option) => <option key={option}>{option}</option>)}
                </select>
              </div>
              <div className="chart-summary"><strong>{range === '7 days' ? '441' : range === '30 days' ? '975' : '4,864'}</strong><span>new enrollments</span><span className="chart-positive"><Icon name="arrowUp" size={13} /> 14.6%</span></div>
              <div className="enrollment-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData[range]} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                    <defs><linearGradient id="enrollmentFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7763e8" stopOpacity={0.2} /><stop offset="95%" stopColor="#7763e8" stopOpacity={0.01} /></linearGradient></defs>
                    <CartesianGrid stroke="#edf0f6" vertical={false} />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#9299aa', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9299aa', fontSize: 11 }} />
                    <Tooltip contentStyle={{ border: '1px solid #edf0f6', borderRadius: 10, boxShadow: '0 8px 24px rgba(32, 42, 70, .1)' }} />
                    <Area type="monotone" dataKey="enrollments" name="Enrollments" stroke="#7661e8" strokeWidth={2.5} fill="url(#enrollmentFill)" activeDot={{ r: 5, fill: '#7661e8', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-legend"><span className="legend-dot" /> New enrollments <span className="chart-caption">Updated just now</span></div>
            </article>

            <article className="panel activity-panel">
              <div className="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your learners</p></div><button className="text-link" type="button" onClick={() => { setActiveNav('People'); document.getElementById('learners')?.scrollIntoView({ behavior: 'smooth' }); }}>View all <Icon name="chevron" size={14} /></button></div>
              <div className="activity-list">
                {activities.map((activity) => (
                  <div className="activity-item" key={activity.name}>
                    <span className={`activity-avatar avatar-${activity.color}`}>{activity.initials}</span>
                    <div className="activity-copy"><p><strong>{activity.name}</strong> {activity.action} <b>{activity.target}</b></p><span>{activity.time}</span></div>
                  </div>
                ))}
              </div>
              <div className="activity-footer"><span className="live-indicator" /> Live learning activity</div>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel courses-panel" id="courses">
              <div className="panel-heading courses-heading">
                <div><h2>Course performance</h2><p>Review engagement and learner progress</p></div>
                <div className="course-tools">
                  <label className="course-search"><Icon name="search" size={16} /><input aria-label="Search courses" placeholder="Search courses" value={courseSearch} onChange={(event) => setCourseSearch(event.target.value)} /></label>
                  <a href="#courses" className="text-link">All courses <Icon name="chevron" size={14} /></a>
                </div>
              </div>
              <div className="course-table-wrap">
                <table className="course-table">
                  <thead><tr><th>COURSE</th><th>INSTRUCTOR</th><th>LEARNERS</th><th>COMPLETION</th><th>STATUS</th></tr></thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr key={course.name}>
                        <td><div className="course-name-cell"><span className={`course-cover cover-${course.color}`}>{course.initials}</span><span><strong>{course.name}</strong><small>{course.category}</small></span></div></td>
                        <td className="instructor-cell">{course.instructor}</td>
                        <td className="learner-count">{course.learners}</td>
                        <td><div className="completion-cell"><div className="completion-track"><span style={{ width: `${course.completion}%` }} /></div><span>{course.completion}%</span></div></td>
                        <td><span className={`course-status${course.status === 'Review' ? ' status-review' : ''}`}><i />{course.status}</span></td>
                      </tr>
                    ))}
                    {filteredCourses.length === 0 && <tr><td className="empty-courses" colSpan="5">No courses match “{courseSearch}”.</td></tr>}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="panel attention-panel" id="instructors">
              <div className="panel-heading"><div><h2>Needs your attention</h2><p>A few things to keep moving</p></div><span className="attention-count">3</span></div>
              <a className="attention-item" href="mailto:support@tusometec.com?subject=Instructor%20review">
                <span className="attention-icon attention-purple"><Icon name="users" size={17} /></span><span className="attention-copy"><strong>Instructor approvals</strong><small>3 profiles awaiting review</small></span><Icon name="chevron" size={15} />
              </a>
              <a className="attention-item" href="#courses" id="assessments">
                <span className="attention-icon attention-amber"><Icon name="book" size={17} /></span><span className="attention-copy"><strong>Course review</strong><small>1 course needs your approval</small></span><Icon name="chevron" size={15} />
              </a>
              <div className="platform-health"><span className="health-check"><Icon name="check" size={14} /></span><span><strong>All systems operational</strong><small>Platform status · Updated 2 min ago</small></span></div>
            </article>
          </section>
          <footer className="admin-footer">© {new Date().getFullYear()} TusomeTec Academy <span>Learning that moves you forward.</span></footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
