<template>
  <vue-box padding="0" align-y="center" :class="$style.vueNavBar" as="nav">
    <vue-content-block>
      <vue-columns space="0" :class="$style.layout" align-y="center">
        <vue-column width="content" align-y="center" :can-grow="false"> </vue-column>

        <vue-column :class="$style.left">
          <slot name="left" />
        </vue-column>

        <vue-column align-y="center" align-x="center" :class="$style.center">
          <slot name="center" />
        </vue-column>

        <vue-column v-if="userName || userImage" :can-grow="false" :class="$style.right">
          <vue-dropdown
            :items="[
              { label: 'Profile', value: 'profile', leadingIcon: 'user' },
              { label: 'Settings', value: 'settings', leadingIcon: 'cog' },
              { label: '', value: 'separator' },
              { label: 'Logout', value: 'logout', leadingIcon: 'logout' },
            ]"
            :duration="dropdownDuration"
            align-x-menu="right"
            @item-click="$emit('menu-item-click', $event)"
          >
            <vue-avatar :name="userName" :src="userImage" size="sm" />
          </vue-dropdown>
        </vue-column>

        <vue-column v-else :can-grow="false" :class="$style.right">
          <slot name="right" />
        </vue-column>
      </vue-columns>
    </vue-content-block>
  </vue-box>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import VueBox from '~/components/layout/VueBox/VueBox.vue';
import VueColumn from '~/components/layout/VueColumns/VueColumn/VueColumn.vue';
import VueColumns from '~/components/layout/VueColumns/VueColumns.vue';
import VueAvatar from '~/components/data-display/VueAvatar/VueAvatar.vue';
import VueDropdown from '~/components/input-and-actions/VueDropdown/VueDropdown.vue';
import VueContentBlock from '~/components/layout/VueContentBlock/VueContentBlock.vue';
import { IItem } from '~/interfaces/IItem';

// Interface

defineProps({
  userName: { type: String, default: null },
  userImage: { type: String, default: null },
  showMenuIcon: { type: Boolean, default: true },
  dropdownDuration: { type: Number, default: 250 },
});
defineEmits<{
  (event: 'menu-click', e: MouseEvent): void;
  (event: 'menu-item-click', item: IItem): void;
}>();

const $style = useCssModule();
</script>

<style lang="scss" module>
@import 'assets/_design-system.scss';

.vueNavBar {
  height: $navbar-height;
  z-index: $navbar-index;
  box-shadow: $navbar-elevation;
  border-bottom: $navbar-border;
  padding: $space-24;

  .layout {
    height: 100%;
  }
}
.left {
  max-width: 15%;
  position: absolute;
  z-index: 999;
}

.center {
  margin-left: 3vw;
}

.right {
  margin-right: 3vw;
}
</style>
