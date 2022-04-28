import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import Top250 from './components/Top250';
import SearchMovie from './components/SearchMovie';
import SingleMovie from './components/SingleMovie';
import Login from './components/Login';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth();

function App() {
  var [loggedIn, setLoggedIn] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Log in successful')
      setLoggedIn(true)
      //const uid = user.uid;
    } else {
      // User is signed out
      setLoggedIn(false)
      console.log('User is not logged in')
    }
  });

  return (
    <div className="App">
      {loggedIn ? (<BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />} >
          <Route path="" element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="top250" element={<Top250 />} />
          <Route path="movies" element={<SearchMovie/>} />
          <Route path="movie" element={<SingleMovie/>} />
          
        </Route>
      </ Routes>
    </BrowserRouter>) : <Login/>}
    </div>
  );
}

export default App;
