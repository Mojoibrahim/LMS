import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
<<<<<<< HEAD
import OtpVerification from './Auth/OtpVerification'; // Imported the new OTP component
=======
>>>>>>> da284eba16984e2070799f996c7cc2fcab17cb4e
import TestDashboard from './pages/TestDashboard';
import './App.css'; // You can keep your existing CSS file

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/otp-verification" element={<OtpVerification />} /> {/* New OTP Verification route added */}
=======
>>>>>>> da284eba16984e2070799f996c7cc2fcab17cb4e
        
        {/* Protected/Test Page Route */}
        <Route path="/dashboard" element={<TestDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;