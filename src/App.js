import React from 'react';
import Movies from './components/Movies/Movies';
import Card from './components/Card/Card';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import '../src/style.css'

function App() {
  return (
    <div id='wrapper'>
      <Header />
      <div className='container-fluid'>
        <Movies />
      </div>
      <Footer /> 
    </div>
  );
}

export default App;
