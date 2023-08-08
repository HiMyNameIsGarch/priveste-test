<template>
  <vue-content-block :class="$style.unnamedPage">
    <h1>Current movie: {{ currentMovie.currentMovie }}</h1>
    <li v-for="movie in movies" :key="movie.currentMovie">{{ movie.name }} - {{ movie.date }}</li>
    <vue-button look="primary" trailing-icon="plus-circle" @click="getMovie"> Get Movie </vue-button>
    <vue-button look="primary" trailing-icon="plus-circle" @click="getAllMovies"> Get All Movies </vue-button>
  </vue-content-block>
</template>

<script setup lang="ts">
import { computed, definePageMeta, useHead } from '#imports';
// import { usePrefillStoreAction } from '~/composables/use-prefill-store-action';
import { useMovieStore } from '~/store/movie';
import VueContentBlock from '~/components/layout/VueContentBlock/VueContentBlock.vue';
import VueButton from '~/components/input-and-actions/VueButton/VueButton.vue';

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

// Data fetching
// usePrefillStoreAction(store.fetchMovie, store.fetchMovie);
</script>

<style lang="scss" module>
@import 'assets/_design-system.scss';

.unnamedPage {
  padding-top: $navbar-height;
}
</style>
