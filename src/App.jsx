import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './layout/Dashboard';
import StudentListPage from './pages/StudentListPage';
import StudentDetailPage from './pages/StudentDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GroupListPage from './pages/GroupListPage';
import { AuthProvider } from './context/AuthContext';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // token 있으면 true
  }, []);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/calendar" element={<Calendar />} />
            <Route index element={<StudentListPage />} />
            <Route path="students/:id" element={<StudentDetailPage />} />
            <Route path="/groups" element={<GroupListPage />} />
          </Route>
          
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
          
        )}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
