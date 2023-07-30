import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  const classes = useStyles();
  const startsFrom = excludeFirst ? 1 : 0;
  console.log(startsFrom);

  return (
    <Grid container className={classes.moviesContainer}>
      {
        movies.results.slice(startsFrom, numberOfMovies).map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
        ))
      }
    </Grid>
  );
}

export default MovieList;
