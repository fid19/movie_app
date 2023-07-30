import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('Authorization', `Bearer ${tmdbApiKey}`);

      return headers;
    } }),
  endpoints: (builder) => ({

    //* Get Genres
    getGenres: builder.query({
      query: () => '/genre/movie/list',
    }),

    // Get movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }

        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?page=${page}`;
        }

        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        return `/movie/popular?language=en-US&page=${page}`;
      },
    }),

    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits`,
    }),

    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}`,
    }),

    getActorDetails: builder.query({
      query: (id) => `/person/${id}`,
    }),

    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}`,
    }),

    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetActorDetailsQuery, useGetMoviesByActorIdQuery, useGetListQuery } = tmdbApi;
