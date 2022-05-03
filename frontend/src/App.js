import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import Top250 from './components/Top250';
import SearchMovie from './components/SearchMovie';
import SingleMovie from './components/SingleMovie';
import Login from './components/Login';
import {getAuth, onAuthStateChanged, getIdToken} from 'firebase/auth'
import {useEffect, useState } from 'react';



function App() {
  const auth = getAuth();
  let [user, setUser] = useState(auth.currentUser)
  let [uid, setUid] = useState('')
  let [username, setUsername] = useState('')
  let [photo, setPhoto] = useState('')

  // useEffect(()=>{
  //   onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log('Log in successful')
  //     setUid(user.uid)
  //     setUser(user)
  //   } else {
  //     // User is signed out
  //     setUser(user)
  //     console.log('User is not logged in')
  //   }
  // });
  // },[])
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Log in successful')
      setPhoto(user.photoURL)
      setUsername(user.displayName)
      setUid(user.uid)
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
        <Route path="/" element={<NavigationBar username={username} user_photo={photo}/>} >
          <Route path="" element={<Home user_id={uid}/>} />
          <Route path="watchlist" element={<Watchlist user_id={uid} />} />
          <Route path="top250" element={<Top250 auth={auth}/>} />
          <Route path="movies" element={<SearchMovie />} />
          <Route path="movie" element={<SingleMovie user_id={uid}/>} />
          
        </Route>
      </ Routes>
    </BrowserRouter>) : <Login/>}
    </div>
  );
}

export default App;
