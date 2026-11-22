import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import SocialPage from "./pages/SocialPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CVPage from "./pages/CVPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import { pages } from "./lib/posts.js";
import MasterThesisPage from "./pages/MasterThesisPage.jsx";
import ThesisTimelineEmbedPage from "./pages/ThesisTimelineEmbedPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./styles/stickers.css";

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
          <Route path="/social" element={<SocialPage />} />
          <Route path="/cv" element={<CVPage />} />
          {/* /blog is the Quartz site (blog/), served as static files from dist/blog.
              MDX posts that embed React components stay here at /<slug>. */}
          {pages.map((p) => (
            <Route key={p.slug} path={`/${p.slug}`} element={<PostPage module={p.module} />} />
          ))}
          <Route path="/thesis" element={<MasterThesisPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
