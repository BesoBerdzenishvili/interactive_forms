import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main/Main";
import AdminPanel from "./pages/AdminPanel";
import Template from "./pages/template/Template";
import UserForm from "./pages/UserForm";
import UserPanel from "./pages/UserPanel";
import NotFound from "./pages/NotFound";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NoAccess from "./pages/NoAccess";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/registration" element={<ProtectedRoute />}>
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route path="/login" element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin-panel" element={<ProtectedRoute checkAdmin />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>
        <Route path="/template/:id" element={<ProtectedRoute checkTemplate />}>
          <Route path="/template/:id" element={<Template />} />
        </Route>
        <Route path="/user-form/:formId/:userId" element={<UserForm />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/search/:searchTerm/:tags?" element={<SearchResults />} />
        <Route path="/no-access" element={<NoAccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
