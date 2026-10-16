const dashboardRoutes = {
  admin: '/admin/dashboard',
  instructor: '/instructor/dashboard',
  student: '/student/dashboard',
};

export function getDashboardPath(user) {
  return user && typeof user.role === 'string' ? dashboardRoutes[user.role] || null : null;
}
