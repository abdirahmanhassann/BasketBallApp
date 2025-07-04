// App.jsx
import React from 'react';
import '../App.css';
import Header from '../reusable/header';
import Footer from '../reusable/Footer';
import GoogleButton from 'react-google-button'

function HomePage() {
  return (
    <div className="container">
    
     <Header/>
      <section className="hero-section">
      <div className='rowdiv' style={{justifyContent:'center',fontSize:'40px'}}>
        <h2>Play Basketball</h2>
        <h2 style={{fontWeight:'100', color: '#04004a'}}> Whenever you want</h2>
</div>
        <div className='searchDiv'>
        <p>Find a game near you</p>
      <div className='rowdiv'>
      <input type='text' placeholder='City,postcode or area' className='input2'/>
      <button className='redButton'>Search</button>
      </div>
        </div>
      </section>
      <section className="stats-section">
        <h1 className='headerLarge'>The Stats Never Lie</h1>
        <div className="stats">
          <div className="stat">
            <div className='rowdiv2'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p className='thinpara'>Maximum Spots Available</p>
          </div>
          <div className="stat">
            <div className='rowdiv2'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p className='thinpara'>Maximum Spots Available</p>
          </div>
          <div className="stat">
            <div className='rowdiv2'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p className='thinpara'>Maximum Spots Available</p>
          </div>
          <div className="stat">
            <div className='rowdiv2'>
            <h3 className='textLarge'>55K</h3>
            <h3 className='textLargeRed'>+</h3>
            </div>
            <p className='thinpara'>Maximum Spots Available</p>
          </div>
          
          
        </div>
      </section>
      <section className="pitches-section">
        <h2 className='headerLarge'>Where the Basketball magic happens</h2>
        <div className="pitches" style={{fontSize:'27px'}}>
          <div className="stat">
            <img src="../StockImgs/—Pngtree—round cartoon basketball_4436613.png" alt="Pitch 1" className='heroSectionPics'/>
            <div className='rowdiv2'>
            <p>Find</p>
            <p className='thinpara'> your nearest football pitch with a quick scroll.</p>
          </div>
          </div>
          <div className="stat">
            <img src="../StockImgs/kisspng-wall-decal-sticker-basketball-sport-dunk-5adabf9892a5a4.8923017315242853366007.png"
            className='heroSectionPics'
            alt="Pitch 2" />
              <div className='rowdiv2'>
            <p>Book</p>
            <p className='thinpara'> your next game, with a few clicks.</p>
          </div>
          </div>
          <div className="stat">
            <img src="../StockImgs/play-81_I7r5N.svg"
            className='heroSectionPics'
            alt="Pitch 2" />
              <div className='rowdiv2'>
            <p>Play </p>
            <p className='thinpara'> your best game. Have fun. Feel good.</p>
          </div>
          </div>
        </div>
      </section>
    <Footer/>
    </div>
  );
}

export default HomePage;
