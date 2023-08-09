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
      movies: [],
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
    async fetchAllMovies() {
      try {
        this.error = null;
        const temp = await $fetchWithCookies<Array<IMovie>>('/api/movies/movies', 'GET');
        console.log(temp);
        this.movies = temp;
      } catch (e) {
        this.error = e;
      }
    },
    async fetchMovie() {
      try {
        this.error = null;
        this.currentMovie = await $fetchWithCookies<string>(`/api/movies/movie`, 'GET');
      } catch (e) {
        this.error = e;
      }
    },
    async createMovie(movie: string) {
      try {
        this.error = null;
        const newMovie = await $fetchWithCookies<IMovie>(`/api/movies/movie`, 'POST', { movieName: movie });

        this.movies.push(newMovie);
        this.currentMovie = newMovie.name;
      } catch (e) {
        this.error = e;
      }
    },
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
