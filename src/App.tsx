import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header, Navbar } from './components';
import { Home, MovieNowShowing, MovieSoonShowing, Ticket } from './pages';

function App() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(
    localStorage.getItem('activeMenu')
  );
  useEffect(() => {
    localStorage.setItem('activeMenu', 'home');
  }, []);
  return (
    <div className='App'>
      <Header />
      <Navbar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <div>
        <Routes>
          <Route path='/' element={<Home setActiveMenuNav={setActiveMenu} />} />
          <Route path='/movie/now-showing' element={<MovieNowShowing />} />
          <Route path='/movie/soon-showing' element={<MovieSoonShowing />} />
          <Route path='/movie/ticket' element={<Ticket />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
