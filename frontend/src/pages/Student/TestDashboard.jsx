import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../../PaymentForm';
import './TestDashboard.css';

const courses = [
  { title: 'Introduction to UI/UX Design', category: 'Design', progress: 72, color: 'purple', initials: 'UI' },
  { title: 'Web Development Fundamentals', category: 'Development', progress: 48, color: 'blue', initials: 'WD' },
  { title: 'Digital Marketing Essentials', category: 'Marketing', progress: 25, color: 'orange', initials: 'DM' },
];

const schedule = [
  { day: '14', month: 'OCT', title: 'Design principles workshop', time: 'Today · 2:00 PM', color: 'purple' },
  { day: '16', month: 'OCT', title: 'HTML & CSS live session', time: 'Thu · 10:30 AM', color: 'blue' },
  { day: '18', month: 'OCT', title: 'Marketing quiz deadline', time: 'Sat · 11:59 PM', color: 'orange' },
];

const navigation = [
  { label: 'Dashboard', icon: 'home' },
  { label: 'Explore courses', icon: 'search' },
  { label: 'Class sessions', icon: 'calendar' },
  { label: 'Submissions', icon: 'upload' },
  { label: 'Group', icon: 'people' },
  { label: 'Chat bot', icon: 'chat' },
  { label: 'Payment', icon: 'payment' },
  { label: 'Certificates', icon: 'certificate' },
];

const exploreCourses = [
  ...courses,
  { title: 'English Communication Skills', category: 'Languages', progress: 0, color: 'green', initials: 'EN' },
  { title: 'Data Literacy for Everyone', category: 'Technology', progress: 0, color: 'blue', initials: 'DL' },
  { title: 'Project Management Basics', category: 'Business', progress: 0, color: 'orange', initials: 'PM' },
];

const assignments = [
  { id: 'design', title: 'Design principles reflection', course: 'Introduction to UI/UX Design', due: 'Due Oct 18' },
  { id: 'web', title: 'Build a responsive landing page', course: 'Web Development Fundamentals', due: 'Due Oct 21' },
  { id: 'marketing', title: 'Campaign audience analysis', course: 'Digital Marketing Essentials', due: 'Due Oct 24' },
];

const studyGroups = [
  { id: 'design-circle', name: 'Design thinking circle', topic: 'UI/UX Design', members: 18, color: 'purple' },
  { id: 'web-builders', name: 'Frontend builders', topic: 'Web Development', members: 24, color: 'blue' },
  { id: 'marketing-lab', name: 'Marketing study lab', topic: 'Digital Marketing', members: 12, color: 'orange' },
];

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    upload: <><path d="M12 16V4m-4 4 4-4 4 4" /><path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /></>,
    payment: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M7 15h3" /></>,
    certificate: <><circle cx="12" cy="8" r="6" /><path d="m8.2 13-1.1 8L12 18l4.9 3-1.1-8" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    play: <path d="m9 6 10 6-10 6z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function TestDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [enrolledCourses, setEnrolledCourses] = useState(courses.map((course) => course.title));
  const [sessionReminders, setSessionReminders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi Alex! I can help you find courses, check deadlines, or explain how your dashboard works.' },
  ]);
  const [chatMessage, setChatMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleEnrollment = (title) => {
    setEnrolledCourses((current) => (
      current.includes(title)
        ? current.filter((courseTitle) => courseTitle !== title)
        : [...current, title]
    ));
  };

  const toggleSessionReminder = (title) => {
    setSessionReminders((current) => (
      current.includes(title)
        ? current.filter((sessionTitle) => sessionTitle !== title)
        : [...current, title]
    ));
  };

  const submitAssignment = (assignmentId) => {
    if (!selectedFiles[assignmentId]) return;
    setSubmittedAssignments((current) => (
      current.includes(assignmentId) ? current : [...current, assignmentId]
    ));
  };

  const sendChatMessage = (event) => {
    event.preventDefault();
    const text = chatMessage.trim();
    if (!text) return;

    const normalizedText = text.toLowerCase();
    let reply = 'I can help with courses, class sessions, submissions, payments, or certificates. Which one would you like to know about?';
    if (normalizedText.includes('course')) reply = `You’re enrolled in ${enrolledCourses.length} courses. Open Explore courses to browse the course catalog.`;
    else if (normalizedText.includes('session') || normalizedText.includes('class')) reply = 'Your next class is the Design principles workshop, today at 2:00 PM.';
    else if (normalizedText.includes('submit') || normalizedText.includes('assignment')) reply = 'Open Submissions, choose an assignment, and attach your work before submitting it.';
    else if (normalizedText.includes('payment') || normalizedText.includes('pay')) reply = 'You can initiate a payment from the Payment section using the M-Pesa form.';
    else if (normalizedText.includes('certificate')) reply = 'Certificates become available after you complete a course.';

    setMessages((current) => [...current, { from: 'student', text }, { from: 'bot', text: reply }]);
    setChatMessage('');
  };

  const renderSection = () => {
    if (activeSection === 'Explore courses') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">FIND YOUR NEXT SKILL</span>
            <h1>Explore courses</h1>
            <p>Browse learning paths and manage your course enrolments.</p>
          </div>
          <div className="section-card-grid">
            {exploreCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.title);
              return (
                <article className="section-card explore-card" key={course.title}>
                  <div className={`course-cover ${course.color}`}><span>{course.initials}</span></div>
                  <span className="course-category">{course.category}</span>
                  <h2>{course.title}</h2>
                  <p>{isEnrolled ? `${course.progress}% complete · Continue learning at your own pace.` : 'A practical course with guided lessons and activities.'}</p>
                  <button className={`action-button${isEnrolled ? ' secondary' : ''}`} onClick={() => toggleEnrollment(course.title)} type="button">
                    {isEnrolled ? 'Enrolled · Remove' : 'Enroll now'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      );
    }

    if (activeSection === 'Class sessions') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">LEARN TOGETHER</span>
            <h1>Class sessions</h1>
            <p>Keep track of live classes and set a reminder for the sessions you plan to attend.</p>
          </div>
          <div className="panel section-list-panel">
            {schedule.map((item) => {
              const hasReminder = sessionReminders.includes(item.title);
              return (
                <article className="section-list-item" key={item.title}>
                  <div className={`date-tile ${item.color}`}><strong>{item.day}</strong><span>{item.month}</span></div>
                  <div className="section-list-info">
                    <h2>{item.title}</h2>
                    <p><Icon name="clock" size={14} /> {item.time}</p>
                  </div>
                  <button className={`action-button${hasReminder ? ' secondary' : ''}`} onClick={() => toggleSessionReminder(item.title)} type="button">
                    {hasReminder ? 'Reminder set' : 'Remind me'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      );
    }

    if (activeSection === 'Submissions') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">YOUR COURSEWORK</span>
            <h1>Submissions</h1>
            <p>Attach your assignment file and submit it for review.</p>
          </div>
          <div className="panel section-list-panel">
            {assignments.map((assignment) => {
              const isSubmitted = submittedAssignments.includes(assignment.id);
              const file = selectedFiles[assignment.id];
              return (
                <article className="submission-item" key={assignment.id}>
                  <div className={`stat-icon ${isSubmitted ? 'stat-green' : 'stat-purple'}`}><Icon name={isSubmitted ? 'check' : 'upload'} size={19} /></div>
                  <div className="section-list-info">
                    <h2>{assignment.title}</h2>
                    <p>{assignment.course} · {assignment.due}</p>
                    {file && <span className="selected-file">{file.name}</span>}
                  </div>
                  <label className="file-picker">
                    {file ? 'Change file' : 'Choose file'}
                    <input
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      onChange={(event) => {
                        const selectedFile = event.target.files?.[0];
                        if (selectedFile) {
                          setSelectedFiles((current) => ({ ...current, [assignment.id]: selectedFile }));
                        }
                      }}
                      type="file"
                    />
                  </label>
                  <button className="action-button" disabled={!file || isSubmitted} onClick={() => submitAssignment(assignment.id)} type="button">
                    {isSubmitted ? 'Submitted' : 'Submit'}
                  </button>
                </article>
              );
            })}
          </div>
          <p className="demo-note">Submissions are recorded in this dashboard preview only and are not uploaded to a course server.</p>
        </section>
      );
    }

    if (activeSection === 'Group') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">LEARN WITH YOUR PEERS</span>
            <h1>Study groups</h1>
            <p>Join a group to connect with other learners in your courses.</p>
          </div>
          <div className="section-card-grid">
            {studyGroups.map((group) => {
              const isJoined = joinedGroups.includes(group.id);
              return (
                <article className="section-card group-card" key={group.id}>
                  <div className={`group-avatar ${group.color}`}><Icon name="people" size={22} /></div>
                  <span className="course-category">{group.topic}</span>
                  <h2>{group.name}</h2>
                  <p>{group.members + (isJoined ? 1 : 0)} learners sharing ideas and helping each other progress.</p>
                  <button
                    className={`action-button${isJoined ? ' secondary' : ''}`}
                    onClick={() => setJoinedGroups((current) => (
                      isJoined ? current.filter((groupId) => groupId !== group.id) : [...current, group.id]
                    ))}
                    type="button"
                  >
                    {isJoined ? 'Joined · Leave group' : 'Join group'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      );
    }

    if (activeSection === 'Chat bot') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">HERE WHEN YOU NEED HELP</span>
            <h1>Student assistant</h1>
            <p>Ask about your courses, sessions, assignments, payments, or certificates.</p>
          </div>
          <div className="panel chat-panel">
            <div className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <div className={`chat-message ${message.from}`} key={`${message.from}-${index}`}>
                  {message.from === 'bot' && <span className="chat-avatar">t</span>}
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <form className="chat-form" onSubmit={sendChatMessage}>
              <input aria-label="Message the student assistant" onChange={(event) => setChatMessage(event.target.value)} placeholder="Ask a question..." value={chatMessage} />
              <button aria-label="Send message" disabled={!chatMessage.trim()} type="submit"><Icon name="send" size={17} /></button>
            </form>
          </div>
          <p className="demo-note">The student assistant uses sample responses in this dashboard preview.</p>
        </section>
      );
    }

    if (activeSection === 'Payment') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">SECURE CHECKOUT</span>
            <h1>Payment</h1>
            <p>Use the M-Pesa payment form to initiate a payment.</p>
          </div>
          <div className="panel payment-panel">
            <div className="payment-heading">
              <span className="stat-icon stat-green"><Icon name="payment" size={20} /></span>
              <div><h2>M-Pesa payment</h2><p>Your payment request will be sent to your phone.</p></div>
            </div>
            <PaymentForm />
          </div>
        </section>
      );
    }

    if (activeSection === 'Certificates') {
      return (
        <section className="section-page">
          <div className="section-intro">
            <span className="eyebrow">CELEBRATE YOUR PROGRESS</span>
            <h1>Certificates</h1>
            <p>Complete a course to earn a certificate of achievement.</p>
          </div>
          <div className="panel certificates-panel">
            <span className="certificate-placeholder"><Icon name="certificate" size={28} /></span>
            <h2>Your certificates will appear here</h2>
            <p>Finish all lessons in a course to unlock its certificate. Your current courses are still in progress.</p>
            <button className="action-button" onClick={() => setActiveSection('Explore courses')} type="button">View my courses</button>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div className="student-dashboard" id="overview">
      <aside className="dashboard-sidebar">
        <a className="dashboard-brand" href="#overview" aria-label="Tusome home">
          <span className="brand-mark">t</span>
          <span>Tusome<span className="brand-accent">Tec</span></span>
        </a>

        <div className="sidebar-label">LEARNING SPACE</div>
        <nav className="dashboard-nav" aria-label="Student dashboard">
          {navigation.map((item) => (
            <button
              aria-current={activeSection === item.label ? 'page' : undefined}
              className={`dashboard-nav-link${activeSection === item.label ? ' is-active' : ''}`}
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              type="button"
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.label === 'Explore courses' && <span className="nav-count">{exploreCourses.length}</span>}
              {item.label === 'Submissions' && <span className="nav-count">{assignments.length - submittedAssignments.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-help">
          <div className="help-icon">?</div>
          <strong>Need a hand?</strong>
          <p>Our learning team is here to help you.</p>
          <a href="mailto:support@tusometec.com">Get support <Icon name="arrow" size={15} /></a>
        </div>

        <button className="sidebar-logout" onClick={handleLogout} type="button">
          <Icon name="logout" size={19} />
          <span>Log out</span>
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="mobile-brand">
            <span className="brand-mark">t</span>
            <span>Tusome<span className="brand-accent">Tec</span></span>
          </div>
          <div className="dashboard-search">
            <Icon name="search" size={18} />
            <input aria-label="Search courses" placeholder="Search courses, lessons..." />
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              <Icon name="bell" size={20} />
              <span className="notification-dot" />
            </button>
            <div className="topbar-divider" />
            <button className="profile-button" type="button" aria-label="Student profile">
              <span className="avatar">AM</span>
              <span className="profile-name">Alex Morgan<small>Student</small></span>
              <span className="profile-chevron">⌄</span>
            </button>
          </div>
        </header>

        <nav className="dashboard-mobile-nav" aria-label="Student dashboard sections">
          {navigation.map((item) => (
            <button
              aria-current={activeSection === item.label ? 'page' : undefined}
              className={`dashboard-mobile-nav-link${activeSection === item.label ? ' is-active' : ''}`}
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              type="button"
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="dashboard-content">
          {activeSection !== 'Dashboard' ? (
            <>
              {renderSection()}
              <footer className="dashboard-footer">© 2026 TusomeTec <span>Made for curious minds.</span></footer>
            </>
          ) : (
            <>
          <section className="welcome-banner">
            <div className="welcome-copy">
              <span className="eyebrow">TUESDAY, OCTOBER 14, 2026</span>
              <h1>Good morning, Alex <span aria-hidden="true">✦</span></h1>
              <p>You’re making great progress. Keep up the momentum!</p>
              <a className="welcome-link" href="#courses">Continue learning <Icon name="arrow" size={17} /></a>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <div className="art-sun" />
              <div className="art-book art-book-back" />
              <div className="art-book art-book-front"><span /><span /><span /></div>
              <div className="art-sparkle sparkle-one">✦</div>
              <div className="art-sparkle sparkle-two">✧</div>
            </div>
          </section>

          <section className="stats-grid" aria-label="Learning summary">
            <article className="stat-card">
              <span className="stat-icon stat-purple"><Icon name="book" size={19} /></span>
              <div><span className="stat-label">Enrolled courses</span><strong>3</strong><span className="stat-note">Keep exploring</span></div>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-blue"><Icon name="clock" size={19} /></span>
              <div><span className="stat-label">Learning hours</span><strong>24.5 <small>hrs</small></strong><span className="stat-note"><b>+3.5 hrs</b> this week</span></div>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-green"><Icon name="check" size={19} /></span>
              <div><span className="stat-label">Lessons completed</span><strong>18</strong><span className="stat-note"><b>4 lessons</b> this week</span></div>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-orange">✦</span>
              <div><span className="stat-label">Day streak</span><strong>5 <small>days</small></strong><span className="stat-note">You’re on a roll!</span></div>
            </article>
          </section>

          <div className="dashboard-columns">
            <section className="panel courses-panel" id="courses">
              <div className="panel-heading">
                <div><h2>My courses</h2><p>Pick up right where you left off.</p></div>
                <a href="#courses" className="text-link">View all <Icon name="arrow" size={16} /></a>
              </div>
              <div className="course-list">
                {courses.map((course) => (
                  <article className="course-card" key={course.title}>
                    <div className={`course-cover ${course.color}`}><span>{course.initials}</span></div>
                    <div className="course-info">
                      <span className="course-category">{course.category}</span>
                      <h3>{course.title}</h3>
                      <div className="course-progress-label"><span>{course.progress}% complete</span><span>{Math.ceil((100 - course.progress) / 10)} lessons left</span></div>
                      <div className="progress-track"><span className={course.color} style={{ width: `${course.progress}%` }} /></div>
                    </div>
                    <button className="course-play" type="button" aria-label={`Continue ${course.title}`}><Icon name="play" size={18} /></button>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel schedule-panel" id="schedule">
              <div className="panel-heading">
                <div><h2>Coming up</h2><p>Don’t miss your next learning moment.</p></div>
                <a href="#schedule" className="calendar-link"><Icon name="calendar" size={18} /></a>
              </div>
              <div className="schedule-list">
                {schedule.map((item) => (
                  <article className="schedule-item" key={item.title}>
                    <div className={`date-tile ${item.color}`}><strong>{item.day}</strong><span>{item.month}</span></div>
                    <div className="schedule-info"><h3>{item.title}</h3><span><Icon name="clock" size={14} />{item.time}</span></div>
                  </article>
                ))}
              </div>
              <a href="#schedule" className="schedule-footer">Open my schedule <Icon name="arrow" size={16} /></a>
            </section>
          </div>

          <section className="weekly-progress panel" id="progress">
            <div>
              <span className="eyebrow">YOUR WEEKLY ACTIVITY</span>
              <h2>A little progress every day adds up.</h2>
              <p>You’ve studied <strong>6.5 hours</strong> this week. Your weekly goal is 8 hours.</p>
            </div>
            <div className="weekly-chart" aria-label="Study hours by day: Monday 1.5, Tuesday 2, Wednesday 1, Thursday 0.5, Friday 1, Saturday 0.5, Sunday 0">
              {[{ day: 'Mon', height: 57 }, { day: 'Tue', height: 76 }, { day: 'Wed', height: 44 }, { day: 'Thu', height: 29 }, { day: 'Fri', height: 44 }, { day: 'Sat', height: 29 }, { day: 'Sun', height: 12 }].map((item) => (
                <div className="chart-day" key={item.day}>
                  <div className="chart-bar"><span style={{ height: `${item.height}%` }} /></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </section>
          <footer className="dashboard-footer">© 2026 TusomeTec <span>Made for curious minds.</span></footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default TestDashboard;
