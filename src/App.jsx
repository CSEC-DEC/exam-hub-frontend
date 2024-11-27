import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Exams from "./pages/Exams";
import Exam from "./components/Exam";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="exams">
          <Route index element={<Exams />} />
          <Route path=":examId" element={<Exam />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
