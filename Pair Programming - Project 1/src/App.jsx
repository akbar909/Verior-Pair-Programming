import Header from './components/Header'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import { FavoritesProvider } from './context/Favorites&Wishlist';
import { useState } from 'react';
const App = () => {
   const [searchQuery, setSearchQuery] = useState('');
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className='bg-gray-50 dark:bg-slate-900'>
            <Header onSearch={setSearchQuery} searchQuery={searchQuery}/>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App