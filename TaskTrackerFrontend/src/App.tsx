// src/App.tsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import AdminDashboard from './Pages/dashboards/AdminDashboard';
// import AdminSettings from './Pages/dashboards/AdminSettings';
import UserDashboard from './Pages/dashboards/UserDashboard';
// import UserProfile from './Pages/dashboards/UserProfile';
import ProjectsWithTasks from './Pages/dashboards/ProjectsWithTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route path="admin" element={<AdminDashboard />} />
          {/* <Route path="admin/settings" element={<AdminSettings />} /> */}
          <Route path="admin/projects" element={<ProjectsWithTasks />} />
          <Route path="user" element={<UserDashboard />} />
          {/* <Route path="user/profile" element={<UserProfile />} /> */}
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
