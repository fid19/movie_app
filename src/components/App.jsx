import React from 'react';
import { CssBaseline } from '@mui/material';

import { Navigate, Route, Routes } from 'react-router-dom';
import { Actors, MovieInformation, Movies, Profile, NavBar } from './index';
import useStyles from './styles';
import './index.css';

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/approved" element={<Navigate to="/" replace />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
