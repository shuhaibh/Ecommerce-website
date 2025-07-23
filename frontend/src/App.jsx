import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes'; // 1. Import the new AppRoutes component

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <AppRoutes /> 
      </main>
      <Footer />
    </div>
  );
}

export default App;
