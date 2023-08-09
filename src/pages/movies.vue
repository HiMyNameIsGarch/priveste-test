<template>
  <vue-content-block :class="$style.unnamedPage">
    <h1>Current movie: {{ currentMovie }}</h1>
    <li v-for="movie in movies" :key="movie.name">{{ movie.name }} - {{ movie.date }}</li>
    <vue-button look="primary" trailing-icon="plus-circle" @click="getMovie"> Get Movie </vue-button>
    <vue-button look="primary" trailing-icon="plus-circle" @click="getAllMovies"> Get All Movies </vue-button>
    <form :class="$style.loginForm" @submit.stop.prevent="onSubmit">
      <vue-stack>
        <vue-text look="h3" as="h3"> Add new Movie </vue-text>
        <vue-input
          id="movieName"
          v-model="movieName"
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
// import { IMovie } from '~/interfaces/IMovie';

// Deps
const store = useMovieStore();

// Config
useHead({ title: 'Movies' });
definePageMeta({ auth: false });

// Data
const movies = computed(() => store.getMovies);
const currentMovie = computed(() => store.getCurrentMovie);

// Event Handler
const getMovie = async () => {
  await store.fetchMovie();
};
const getAllMovies = async () => {
  await store.fetchAllMovies();
};
const movieName = ref('');

const onSubmit = async () => {
  await store.createMovie(movieName.value);
  movieName.value = '';
};
// const createMovie = async () => {
//   await store.createMovie();
// };

// Data fetching
// usePrefillStoreAction(store.fetchMovie, store.fetchMovie);
</script>

<style lang="scss" module>
@import 'assets/_design-system.scss';

.unnamedPage {
  padding-top: $navbar-height;
}
</style>
