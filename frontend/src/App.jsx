import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import RulesSection from "./pages/RulesSection.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <PageTitleUpdater /> {/* Dynamically updates title & favicon */}
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/rules" element={<RulesSection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Component to update page title and favicon dynamically
function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Course Allocation - Home",
      "/upload": "Course Allocation - Upload",
      "/rules": "Course Allocation - Rules",
    };

    document.title = titles[location.pathname] || "Course Allocation";

    // Dynamically set favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/favicon.png"; // Make sure the favicon is in the public folder
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.type = "image/png";
      newFavicon.href = "/favicon.png";
      document.head.appendChild(newFavicon);
    }
  }, [location.pathname]);

  return null;
}

export default App;
