<template>
  <vue-content-block :class="$style.unnamedPage">
    login
    <div class="max-w-5xl mx-auto mt-5 px-5">
      <h3 class="text-xl font-bold">Authentication Overview</h3>
      <p class="text-sm">See all available authentication & session information below.</p>
      <pre v-if="status"><span>Status:</span> {{ status }}</pre>
      <pre v-if="data"><span>Data:</span> {{ data }}</pre>
      <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
      <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>
    </div>
    <vue-button look="primary" trailing-icon="plus-circle" @click="getData()"> get data </vue-button>
    <LoginForm @submit="onSubmit"></LoginForm>
  </vue-content-block>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHead, definePageMeta, useAuth } from '#imports';
import VueContentBlock from '~/components/layout/VueContentBlock/VueContentBlock.vue';
import VueButton from '~/components/input-and-actions/VueButton/VueButton.vue';
import LoginForm from '~/components/forms/LoginForm/LoginForm.vue';

// Deps

// Config
useHead({ title: 'Page Title' });
definePageMeta({ auth: false });
const { data, status, getCsrfToken, getProviders, signIn } = useAuth();

const providers = ref([]);
const csrfToken = ref('');
// Data
const onSubmit = (model: { email: string; password: string }) => {
  console.log('email', model.email);
  console.log('pass', model.password);
  signIn();
};
const getData = async () => {
  providers.value = await getProviders();
  csrfToken.value = await getCsrfToken();
};

// Event Handler

// Data fetching
</script>

<style lang="scss" module>
@import 'assets/_design-system.scss';

.unnamedPage {
  padding-top: $navbar-height;
}
</style>
