import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import AdminPanel from "./pages/AdminPanel";
import Template from "./pages/template/Template";
import UserForm from "./pages/UserForm";
import UserPanel from "./pages/UserPanel";
import NotFound from "./pages/NotFound";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

function App() {
  // restrict user-panel too if user isn't signed in (no current user)
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* redirect user to 404 if status !== admin */}
        {/* or as temporary measure restrict visibility of admin page if currentUser.status !== admin */}
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/template/:id" element={<Template />} />
        <Route path="/user-form/:id" element={<UserForm />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
