import React from 'react';
import Movies from './components/Movies/Movies';
import Card from './components/Card/Card';
import Footer from './components/Footer/Footer';
import '../src/style.css'

function App() {
  return (
    <div id='wrapper'>
      <div className='container-fluid'>
        <h3 className='h3'>Últimos estrenos</h3>
        <Movies />
      </div>
      <Footer /> 
    </div>
  );
}

export default App;
