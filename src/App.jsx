import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import SocialPage from "./pages/SocialPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CVPage from "./pages/CVPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HomeSticker from "./components/HomeSticker.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./styles/stickers.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <HomeSticker />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
