import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-airbnb-red"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { loadUser } = useAuthStore();
  
  useEffect(() => {
    // Load user data and simulate initial load
    Promise.all([
      loadUser(),
      new Promise(resolve => setTimeout(resolve, 800))
    ]).then(() => {
      setIsLoading(false);
    });
  }, [loadUser]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </Suspense>
      </main>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;