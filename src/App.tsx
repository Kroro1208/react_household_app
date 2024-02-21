import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Report from './pages/Report';
import Nomatch from './pages/Nomatch';
import AppLayout from './pages/components/layout/AppLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<Nomatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
