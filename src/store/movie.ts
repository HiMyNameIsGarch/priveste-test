import { acceptHMRUpdate, defineStore } from 'pinia';
import { IMovie } from '~/interfaces/IMovie';
// import { IMovie, IMovieCreate, IMovieUpdate } from '~/interfaces/IMovie';
import { $fetchWithCookies } from '~/utils/fetchWithCookies';
export interface IMovieState {
  movies: Array<IMovie>;
  currentMovie?: string;
  error: unknown;
}

export const useMovieStore = defineStore('movie', {
  state: (): IMovieState => {
    return {
      // default data
      movies: [
        { name: 'Sharper', date: new Date() } as IMovie,
        { name: 'Save the world please', date: new Date() } as IMovie,
      ],
      currentMovie: 'Liga legando',
      error: null,
    };
  },
  getters: {
    getMovies(state: IMovieState) {
      return state.movies;
    },
    getCurrentMovie(state: IMovieState) {
      if (!state.currentMovie) {
        throw new Error('you need to fetch, create or update first');
      }

      return state.currentMovie;
    },
    getError(state: IMovieState) {
      return state.error;
    },
  },
  actions: {
    // async fetchMovies() {
    //   try {
    //     this.error = null;
    //     // this.movies = await $fetchWithCookies<Array<IMovie>>('/api/movie');
    //   } catch (e) {
    //     this.error = e;
    //   }
    // },
    async fetchMovie() {
      try {
        this.error = null;
        this.currentMovie = await $fetchWithCookies<string>(`/api/movies/crud`);
      } catch (e) {
        this.error = e;
      }
    },
    // async createMovie(movie: IMovieCreate) {
    //   try {
    //     this.error = null;
    //     const newMovie = await $fetchWithCookies<IMovie>(`/api/movie`, 'POST', movie);
    //
    //     // this.movies.push(newMovie);
    //     // this.currentMovie = newMovie;
    //   } catch (e) {
    //     this.error = e;
    //   }
    // },
    // async updateMovie(movie: IMovieUpdate) {
    //   try {
    //     this.error = null;
    //     // const updatedMovie = await $fetchWithCookies<IMovie>(`/api/movie/${movie.id}`, 'PUT', movie);
    //     // const idx = this.movies.findIndex((item) => item.id === updatedMovie.id);
    //     // this.movies.splice(idx, 1, updatedMovie);
    //     // this.currentMovie = updatedMovie;
    //   } catch (e) {
    //     this.error = e;
    //   }
    // },
    // async deleteMovie(movieId: string) {
    //   try {
    //     this.error = null;
    //     await $fetchWithCookies<IMovie>(`/api/movie/${movieId}`, 'DELETE');
    //     // const idx = this.movies.findIndex((item) => item.id === movieId);
    //     // this.movies.splice(idx, 1);
    //   } catch (e) {
    //     this.error = e;
    //   }
    // },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot));
}
