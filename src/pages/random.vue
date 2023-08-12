<template>
  <vue-content-block :class="$style.unnamedPage">
    <vue-navbar></vue-navbar>

    <vue-box-vue :class="[$style.backgroundColor, $style.flex, $style['justify-center'], $style['items-center']]"
      >Video</vue-box-vue
    >

    <vue-box-vue>
      <vue-carousel-vue :images="myImages"></vue-carousel-vue>
    </vue-box-vue>

    <!-- {{ randoms }}  -->
  </vue-content-block>
</template>

<script setup lang="ts">
import { useHead, definePageMeta, ref } from '#imports';
import VueContentBlock from '~/components/layout/VueContentBlock/VueContentBlock.vue';
import VueBoxVue from '~/components/layout/VueBox/VueBox.vue';
import VueCarouselVue from '~/components/data-display/VueCarousel/VueCarousel.vue';
import VueNavbar from '~/components/navigation/VueNavbar/VueNavbar.vue';

// Config
useHead({ title: 'Random' });
definePageMeta({ auth: false });
const myImages = ref([
  {
    alt: 'Slide 1',
    copyright: 'unsplash.com/@hahnbo',
    url: 'https://images.unsplash.com/photo-1485932465394-d20cc595f08b?ixlib=rb-0.3.5&s=e8798191cfef2e78f4ac91e71c92ea57&auto=format&fit=crop&w=3750&q=80',
  },
  {
    alt: 'Slide 2',
    copyright: 'unsplash.com/@mitr',
    url: 'https://images.unsplash.com/photo-1486068338746-bc8c63a2d7ea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=348afc4c4ac324a022630fbce9204348&auto=format&fit=crop&w=3890&q=80',
  },
]);

// Data
// const store = useRandomStore();
// const randoms = computed(() => store.getRandoms);
</script>

<style lang="scss" module>
@import '../assets/_design-system.scss';
@import '../assets/layout.scss';
@import '../assets/alignment.scss';

.unnamedPage {
  padding-top: var(--box-bg);
}

.backgroundColor {
  background-color: palette-color(info-3);
  padding: $space-144;
  height: 40vw;
  font-size: $text-9;
}
</style>
