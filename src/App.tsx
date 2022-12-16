import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header, Navbar } from './components';
import {
  Home,
  MovieNowShowing,
  MovieSoonShowing,
  Ticket,
  Detail,
} from './pages';

function App() {
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem('login') || '{}')
  );
  const [activeMenu, setActiveMenu] = useState<string | null>(
    localStorage.getItem('activeMenu')
  );
  console.log(user);

  useEffect(() => {
    localStorage.setItem('activeMenu', 'home');
  }, []);
  return (
    <div className='App'>
      <Header user={user} setUser={setUser} />
      <Navbar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <div>
        <Routes>
          <Route path='/' element={<Home setActiveMenuNav={setActiveMenu} />} />
          <Route path='/movie/now-showing' element={<MovieNowShowing />} />
          <Route path='/movie/soon-showing' element={<MovieSoonShowing />} />
          <Route
            path='/movie/ticket'
            element={<Ticket user={user} setUser={setUser} />}
          />
          <Route path='/movie/detail/:id' element={<Detail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
