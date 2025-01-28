import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculator from "./pages/kalkulator-simulasi-skor-ppdb-smp-negeri-sleman";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/kalkulator-simulasi-skor-ppdb-smp-negeri-sleman"
          element={<Calculator />}
        />
      </Routes>
    </Router>
  );
}

export default App;