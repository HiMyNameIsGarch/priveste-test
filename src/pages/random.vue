<template>
  <vue-content-block :class="$style.unnamedPage">
    <vue-navbar-vue
      :user-name="userData.name"
      :user-image="userData.image"
      :show-menu-icon="true"
      :dropdown-duration="300"
    >
      <template #center>
        <div>
          <ul :class="[$style['navigation-items'], $style.flex]">
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Courses</a></li>
          </ul>
        </div>
      </template>
      <template #left>
        <div :class="$style.borderdelete"><img alt="logo" src="../assets/images/logo.png" /></div>
      </template>
    </vue-navbar-vue>
    <vue-box-vue :class="[$style.container]">
      <vue-box-vue
        :class="[$style.video, $style.flex, $style['justify-center'], $style['items-center'], $style.relative]"
        >Video
      </vue-box-vue>
      <vue-box-vue :class="[$style.absolute, $style.courses, $style['block']]">
        <vue-box-vue :class="[$style.flex]">
          <vue-carousel-vue :images="carouselImages"></vue-carousel-vue>
          <vue-carousel-vue :images="carouselImages"></vue-carousel-vue>
          <vue-carousel-vue :images="carouselImages"></vue-carousel-vue>
        </vue-box-vue>
      </vue-box-vue>
    </vue-box-vue>
    <!-- {{ randoms }}  -->
  </vue-content-block>
</template>

<script setup lang="ts">
import { useHead, definePageMeta } from '#imports';
import VueContentBlock from '~/components/layout/VueContentBlock/VueContentBlock.vue';
import VueBoxVue from '~/components/layout/VueBox/VueBox.vue';
import VueCarouselVue from '~/components/data-display/VueCarousel/VueCarousel.vue';
import { ICarouselImage } from '~/components/data-display/VueCarousel/ICarouselImage';
import VueNavbarVue from '~/components/navigation/VueNavbar/VueNavbar.vue';
// Config
useHead({ title: 'Random' });
definePageMeta({ auth: false });
const carouselImages: Array<ICarouselImage> = [
  {
    url: 'https://images.unsplash.com/photo-1485932465394-d20cc595f08b?ixlib=rb-0.3.5&s=e8798191cfef2e78f4ac91e71c92ea57&auto=format&fit=crop&w=3750&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1517365884913-3c33884b06fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=05c7363bcb2c0a2c2241e6cdcf0dfb8b&auto=format&fit=crop&w=1234&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1496348323715-c11f0fc6aeed?ixlib=rb-0.3.5&s=52406f147b73f1000c032dcc5e4e0aea&auto=format&fit=crop&w=1388&q=80',
  },
];

const userData = {
  name: 'John Doe',
  image: '../assets/images/images.png',
};

// Data
// const store = useRandomStore();
// const randoms = computed(() => store.getRandoms);
</script>

<style lang="scss" module>
@import '../assets/_design-system.scss';
@import '../assets/layout.scss';
@import '../assets/alignment.scss';
@import '../assets/design-system/variables/fonts';
.unnamedPage {
  padding-top: var(--box-bg);
}

.video {
  background-color: palette-color(primary-4);
  padding: $space-144;
  height: 80vh;
  font-size: $text-9;
}

.courses {
  top: 75vh;
  height: 20vh;
}

.container {
  margin-bottom: 50vh;
  background: rgb(62, 62, 62);
  background: linear-gradient(0deg, rgba(20, 21, 25, 0.2861519607843137) 1%, rgba(163, 138, 224, 1) 15%);
  height: 100vh;
}
.navigation-items a {
  margin: 10px;
  text-decoration: none;
  color: white;
  font-size: $space-20;
  font-family: 'Bricolage Grotesque';
}
</style>
