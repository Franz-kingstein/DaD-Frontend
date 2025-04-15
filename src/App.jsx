import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import FilterByYear from './pages/FilterByYear';
import DataViz from './pages/DataViz'; // ✅ Import DataViz page
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/filter-by-year" element={<FilterByYear />} />
          <Route path="/data-viz" element={<DataViz />} /> {/* ✅ Route for visualization */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
