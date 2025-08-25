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
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/social" element={<SocialPage />} />
      </Routes>
    </Router>
  );
}

export default App;