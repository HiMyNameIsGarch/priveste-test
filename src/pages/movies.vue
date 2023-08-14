<template>
  <vue-content-block :class="$style.unnamedPage">
    <li v-for="movie in movies" :key="movie.id">
      <ul>
        <h1>{{ movie.name }}</h1>
        <vue-button look="primary" trailing-icon="plus-circle" @click="setCurrent(movie)"> Set Current </vue-button>
        <vue-button look="primary" trailing-icon="plus-circle" @click="deleteMovie(movie.id)"> Delete </vue-button>
      </ul>
    </li>
    <form :class="$style.loginForm" @submit.stop.prevent="onSubmit">
      <vue-stack>
        <vue-text look="h1" as="h1"> Add new Movie </vue-text>
        <vue-input
          id="movieName"
          v-model="currentMovie.name"
          name="movieName"
          autofocus
          required
          label="Movie Name"
          placeholder="Movie Name"
          validation="required"
          error-message="The movie can not be empty)"
        />

        <vue-inline align-x="right">
          <vue-button data-testid="login-button" look="primary" tabindex="3" type="submit"> Add </vue-button>
        </vue-inline>
      </vue-stack>
    </form>
    <vue-button look="primary" trailing-icon="plus-circle" @click="getAllMovies"> Get All Movies </vue-button>
  </vue-content-block>
</template>

<script setup lang="ts">
import { computed, definePageMeta, useHead, ref } from '#imports';
// import { usePrefillStoreAction } from '~/composables/use-prefill-store-action';
import { useMovieStore } from '~/store/movie';
import VueContentBlock from '~/components/layout/VueContentBlock/VueContentBlock.vue';
import VueText from '~/components/typography/VueText/VueText.vue';
import VueInput from '~/components/input-and-actions/VueInput/VueInput.vue';
import VueStack from '~/components/layout/VueStack/VueStack.vue';
import VueInline from '~/components/layout/VueInline/VueInline.vue';
import VueButton from '~/components/input-and-actions/VueButton/VueButton.vue';
import { IMovie } from '~/interfaces/IMovie';

// Config
useHead({ title: 'Movies' });
definePageMeta({ auth: false });

// Data
const store = useMovieStore();
const movies = computed(() => store.getMovies);

// Event Handler
const getAllMovies = async () => {
  await store.fetchAllMovies();
};
const currentMovie = ref<IMovie>({} as IMovie);

const onSubmit = async () => {
  await store.createMovie(currentMovie.value.name);
  currentMovie.value.name = '';
};
const setCurrent = (newMovie: IMovie) => {
  currentMovie.value = newMovie;
  const idx = movies.value.findIndex((item) => item.id === newMovie.id);
  movies.value.splice(idx, 1, newMovie);
  store.setCurrentMovie(newMovie);
};
const deleteMovie = async (id: string) => await store.deleteMovie(id);

// Data fetching
// usePrefillStoreAction(store.fetchMovie, store.fetchMovie);
</script>

<style lang="scss" module>
@import 'assets/_design-system.scss';

.unnamedPage {
  padding-top: $navbar-height;
}
</style>
