// App.jsx
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Basketball Addicts</h1>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Play Football</a>
          <a href="/">Impact</a>
          <a href="/">Contact</a>
        </nav>
        <div className='buttonDiv'>
          <button className='grayButton'>Register</button>
          <button className='redButton'>Sign in</button>
        </div>
      </header>
      <section className="hero-section">
        <h2>Play Football Whenever You Want</h2>
        <div className='searchDiv'>
        <p>Find a game near you</p>
      <div className='rowdiv'>
      <input type='text' placeholder='City,postcode or area' width={'100%'}/>
      <button className='redButton'>Search</button>
      </div>
        </div>
      </section>
      <section className="stats-section">
        <h2>The Stats Never Lie</h2>
        <div className="stats">
          <div className="stat">
            <div className='rowdiv'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p>Maximum Spots Available</p>
          </div>
          <div className="stat">
            <div className='rowdiv'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p>Maximum Spots Available</p>
          </div>
          <div className="stat">
            <div className='rowdiv'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p>Maximum Spots Available</p>
          </div>
          <div className="stat">
            <div className='rowdiv'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p>Maximum Spots Available</p>
          </div>
          
          
        </div>
      </section>
      <section className="pitches-section">
        <h2>Where the Basketball magic happens</h2>
        <div className="pitches">
          <div className="pitch">
            <img src="../StockImgs/—Pngtree—round cartoon basketball_4436613.png" alt="Pitch 1" className='heroSectionPics'/>
          </div>
          <div className="pitch">
            <img src="../StockImgs/kisspng-wall-decal-sticker-basketball-sport-dunk-5adabf9892a5a4.8923017315242853366007.png"
            className='heroSectionPics'
            alt="Pitch 2" />
          </div>
          <div className="pitch">
            <img src="../StockImgs/play-81_I7r5N.svg"
            className='heroSectionPics'
            alt="Pitch 2" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
