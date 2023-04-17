import React, { useState } from 'react';
import NavbarWithSearch from './NavbarWithSearch';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const celebrityList = [
  'Michael Jackson',
  'Michael Jordan',
  'Michael Tyson',
  'Kobe Bryant'
];

function NotFoundPage(){
  return (
    <div>
      <title>Not Found Page</title>
      <h1>Not Found Page</h1>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <title>Home Page</title>
      <h1>Home Page</h1>
    </div>
  )
}

function Page(celebrity) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"></meta>
        <title>{celebrity}</title>
      </Helmet>
      <h1>{celebrity}</h1>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('');

  return (
    <div>
      <header>
        <NavbarWithSearch activePage={activePage} setActivePage={setActivePage} celebrityList={celebrityList}/>
      </header>
      <main className="main">
        <Routes>
          <Route index element={HomePage()} />
          {celebrityList.map((celebrity) => {
            return <Route key={celebrity} path={"/" + celebrity} element={Page(celebrity)} />
          })}
          <Route path="*" element={NotFoundPage()} />
        </Routes>
      </main>
    </div>
  );
}

export default App;