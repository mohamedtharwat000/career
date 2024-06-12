import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CareerPage from './components/CareerPage';
import { ContextProvider } from './components/Context';

function App() {
  return (
    <ContextProvider>
      <Header />
      <CareerPage />
      <Footer />
    </ContextProvider>
  );
}

export default App;
