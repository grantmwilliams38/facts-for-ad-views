import React, { useState, lazy, Suspense } from 'react';
import NavbarWithSearch from './NavbarWithSearch';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MichaelJackson = lazy(() => (import('./pages/MichaelJackson')))

const celebrityList = [
  'Michael Jackson',
  'Michael Jordan',
  'Michael Tyson',
  'Kobe Bryant'
];

const celebrityPageMap = {
  'Michael Jackson': <MichaelJackson/>
}

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
        <meta name="description" content={"Get to know " + celebrity + ". Some facts and some insight at a glance."}/>
        <title>Get to know {celebrity}</title>
      </Helmet>
      <Suspense fallback={<div><h1>Loading</h1></div>}>
        {celebrityPageMap[celebrity]}
      </Suspense>
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
      <hr/>
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