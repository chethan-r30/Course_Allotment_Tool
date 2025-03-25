import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import Dashboard from "./pages/RulesSection.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import RulesSection from "./pages/RulesSection.jsx";

function App() {
  return (
    <Router>
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

export default App;
