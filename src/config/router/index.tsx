import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../../screens/sign-in";
import Signup from "../../screens/sign-up";
import AdminPanel from "../../screens/admin-panel";
import UserQuiz from "../../screens/quiz";
import AppHome from "../../screens/home";
import Protected from "../../screens/protected";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Signup />} />
        {/* <Route path="/" element={<Protected Screen={Signup} />} /> */}
        <Route path="/user-quiz" element={<UserQuiz />} />
        {/* <Route path="/" element={<AppHome />} /> */}
      </Routes>
    </Router>
  );
}
