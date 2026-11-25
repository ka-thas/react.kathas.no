import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import SocialPage from "./pages/SocialPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import CVPage from "./pages/CVPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import MasterThesisPage from "./pages/MasterThesisPage.jsx";
import ThesisTimelineEmbedPage from "./pages/ThesisTimelineEmbedPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./styles/stickers.css";

// Loaded only when visited, so the gallery doesn't slow down the other pages.
const PhotosPage = lazy(() => import("./pages/PhotosPage.jsx"));

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* <HomeSticker /> */}
      <Routes>
        {/* Embeds render without the Navbar (e.g. Notion "Embed link") */}
        <Route path="/embed/thesis-timeline" element={<ThesisTimelineEmbedPage />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/thesis" element={<MasterThesisPage />} />
          <Route
            path="/photos"
            element={
              <Suspense fallback={null}>
                <PhotosPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
