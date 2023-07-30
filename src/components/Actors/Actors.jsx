import { Box, Button, ButtonGroup, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import useStyles from './style';
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

function Actors() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movies, isFetching: isFetchingMovies } = useGetMoviesByActorIdQuery({ id, page });
  const navigate = useNavigate();
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box dispaly="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box dispaly="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={`${data.name}`} />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{`${data?.name}`}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {
           isFetchingMovies ? <Box display="flex" justifyContent="center"><CircularProgress size="5rem" /></Box> : movies && <MovieList movies={movies} numberOfMovies={12} />
          }
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </>
  );
}

export default Actors;
