<template>
  <component :is="as" :class="$style.vueContentBlock">
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), {
  as: 'div',
});
</script>

<style lang="scss" module>
@import 'assets/_design-system.scss';

.vueContentBlock {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
