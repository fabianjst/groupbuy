import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DealDetail from './pages/DealDetail';
import SupplierDashboard from './pages/SupplierDashboard';
import FeaturedDeals from './pages/FeaturedDeals';
import SupplierAnalytics from './pages/SupplierAnalytics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deal/:id" element={<DealDetail />} />
          <Route path="/dashboard" element={<SupplierDashboard />} />
          <Route path="/features" element={<FeaturedDeals />} />
          <Route path="/analytics" element={<SupplierAnalytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
