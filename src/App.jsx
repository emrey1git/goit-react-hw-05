import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews'));
const Navigation = lazy(() => import('./components/Navigation'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
       <Routes>
  <Route path="/" element={<Navigation />}>
    <Route index element={<HomePage />} />
    <Route path="movies" element={<MoviesPage />} />
    <Route path="movies/:movieId" element={<MovieDetailsPage />}>
      <Route path="cast" element={<MovieCast />} />
      <Route path="reviews" element={<MovieReviews />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>

      </Suspense>
    </BrowserRouter>
  );
}

export default App;
