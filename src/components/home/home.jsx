import React from 'react';
import './home.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <h1>Welcome to Chatscrum</h1>
        <div className='links'>
            <h4><Link to='/signup'>SIGN UP</Link></h4>
            <h4><Link to='/signin'>SIGN IN</Link></h4>
        </div>
    </div>
  )
}

export default Home;