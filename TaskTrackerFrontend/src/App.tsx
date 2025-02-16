import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route (homepage) */}
        <Route path="/" element={<SignIn />} />

        {/* Sign Up page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Sign In page */}
        <Route path="/Home" element={<Home/>} />

        404 Page Not Found (optional)
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
