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
import {useState } from 'react';

/**
 * App main component
 * if the user is logged in, it will return the browser router information which will allow the user to
 * access all website resources.
 * if the user is not login, it will show the login page
 * 
 * @returns login html page or the routes to the page
 */

function App() {
  // auth object for firebase
  const auth = getAuth();
  //declare variables
  let [user, setUser] = useState(auth.currentUser)
  let [uid, setUid] = useState('')
  let [photo, setPhoto] = useState('')

  /**
   * function that will check whether the user is logged in
   * if the user is logged in it will set all the useState varibles for the user information
   */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Log in successful')
      //photo image to display on the top right of the nav bar
      setPhoto(user.photoURL)
      //user id used for all database functions
      setUid(user.uid)
      //variable that determines wheter the user is logged in 
      setUser(user)
    } else {
      // User is signed out
      setUser(user)
      console.log('User is not logged in')
    }
  });

  return (
    <div className="App">
      {user ? (<BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar user_photo={photo}/>} >
          <Route path="" element={<Home user_id={uid}/>} />
          <Route path="watchlist" element={<Watchlist user_id={uid} />} />
          <Route path="top250" element={<Top250/>} />
          <Route path="movies" element={<SearchMovie />} />
          <Route path="movie" element={<SingleMovie user_id={uid}/>} />
          
        </Route>
      </ Routes>
    </BrowserRouter>) : <Login/>}
    </div>
  );
}

export default App;
