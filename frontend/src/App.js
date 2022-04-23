import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import Top250 from './components/Top250';
import SearchMovie from './components/SearchMovie';
import SingleMovie from './components/SingleMovie';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationBar />} >
            <Route path="" element={<Home />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="top250" element={<Top250 />} />
            <Route path="movies" element={<SearchMovie/>} />
            <Route path="movie" element={<SingleMovie/>} />
          </Route>
        </ Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
