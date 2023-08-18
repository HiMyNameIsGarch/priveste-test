import {acceptHMRUpdate, defineStore} from 'pinia';
import {IMovie} from '~/interfaces/IMovie';
import {$fetchWithCookies} from '~/utils/fetchWithCookies';
export interface IMovieState {
  movies: Array<IMovie>;
  currentMovie?: IMovie;
  error: unknown;
}

export const useMovieStore = defineStore('movie', {
  state : () : IMovieState => {
    return {
      // default data
      movies : [],
      currentMovie : {} as IMovie,
      error : null,
    };
  },
  getters : {
    getMovies(state: IMovieState) { return state.movies;},
    getCurrentMovie(state: IMovieState) {
      if (!state.currentMovie) {
        throw new Error('you need to fetch, create or update first');
      }

      return state.currentMovie;
    },
    getError(state: IMovieState) { return state.error;},
  },
  actions : {
    setCurrentMovie(newMovie: IMovie) { this.currentMovie = newMovie;},
    async fetchAllMovies() {
      try {
        this.error = null;
        const movies =
            await $fetchWithCookies<Array<IMovie>>('/api/movies/movies', 'GET');
        movies.forEach((movie) => this.movies.push(movie));
      } catch (e) {
        this.error = e;
      }
    },
    async fetchMovie() {
      try {
        this.error = null;
        this.currentMovie =
            await $fetchWithCookies<IMovie>(`/api/movies/movie`, 'GET');
      } catch (e) {
        this.error = e;
      }
    },
    async createMovie(movie: string) {
      try {
        this.error = null;
        const newMovie = await $fetchWithCookies<IMovie>(
            `/api/movies/movie`, 'POST', {movieName : movie});

        this.movies.push(newMovie);
        this.currentMovie = newMovie;
      } catch (e) {
        this.error = e;
      }
    },
    // async updateMovie(movieId: string) {
    //   try {
    //     this.error = null;
    //     const updatedMovie = await
    //     $fetchWithCookies<IMovie>(`/api/movies/${movieId}`, 'PUT'); const idx
    //     = this.movies.findIndex((item) => item.id === updatedMovie.id);
    //     this.movies.splice(idx, 1, updatedMovie);
    //     this.currentMovie = updatedMovie;
    //   } catch (e) {
    //     this.error = e;
    //   }
    // },
    async deleteMovie(movieId: string) {
      try {
        this.error = null;
        const res =
            await $fetchWithCookies<IMovie>(`/api/movies/${movieId}`, 'DELETE');
        if (!res)
          throw new Error("new error boysss");
        const idx = this.movies.findIndex((item) => item.id === movieId);
        this.movies.splice(idx, 1);
      } catch (e) {
        this.error = e;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot));
}
