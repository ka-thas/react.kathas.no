import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SocialPage from "./pages/SocialPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/ProjectsPage" element={<ProjectsPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/SocialPage" element={<SocialPage />} />
      </Routes>
    </Router>
  );
}

export default App;