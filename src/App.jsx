import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index.jsx";
import Contact from "./pages/contact.jsx";
import SocialPage from "./pages/social.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/social" element={<SocialPage />} />
      </Routes>
    </Router>
  );
}

export default App;