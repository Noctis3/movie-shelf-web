import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { MovieSearch } from './pages/Search';
import PrivateRoute from './PrivateRoutes';
import Movie from './pages/Movie';

export const routes = () => {
  return (
    <BrowserRouter>
      <PrivateRoute>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search/:search" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </PrivateRoute>
    </BrowserRouter>
  );
};
