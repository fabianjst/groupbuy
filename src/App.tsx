import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DealDetail from './pages/DealDetail';
import SupplierDashboard from './pages/SupplierDashboard';
import FeaturedDeals from './pages/FeaturedDeals';
import SupplierAnalytics from './pages/SupplierAnalytics';
import { DealsProvider } from './context/DealsContext';

import BuyerDashboard from './pages/BuyerDashboard';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <DealsProvider>
      <UserProvider>
        <Router basename={import.meta.env.DEV ? '/' : '/groupbuy'}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deal/:id" element={<DealDetail />} />
              <Route path="/dashboard" element={<SupplierDashboard />} />
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/features" element={<FeaturedDeals />} />
              <Route path="/analytics" element={<SupplierAnalytics />} />
            </Routes>
          </Layout>
        </Router>
      </UserProvider>
    </DealsProvider>
  );
}

export default App;
