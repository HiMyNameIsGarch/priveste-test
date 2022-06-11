import VueCard from '@/components/data-display/VueCard/VueCard.vue';
import VueStack from '@/components/layout/VueStack/VueStack.vue';
import VueText from '@/components/typography/VueText/VueText.vue';

export default {
  title: 'Foundation/Intro',
  component: null,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
  parameters: { controls: { disabled: true } },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    VueCard,
    VueStack,
    VueText,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<vue-card>
  <vue-stack space="16">
    <vue-text look="large-title" weight="semi-bold">Design System</vue-text>
    <vue-text look="description">All necessary files are located under <vue-text look="description" weight="semi-bold">./src/assets/design-system.</vue-text></vue-text>
    <vue-text as="p" look="description">
      Achieving a unique Brand Identity with a UI toolkit that is already build on top of<br/>
      another Design System (e.g. Material Design, Bootstrap, Ant) isn't easy and<br/>
      the same applies to consistency, especially by combining multiple UI libraries.
      <br/>
      <br/>
      Our component blueprints provide the most common features for you<br/>
      to extend and give you the ability to fit their appearance your Corporate Design.<br/>
      <br/>
      <br/>
      We are aware that not everyone has to implement their own Design System.<br/>
      If this is the case for you, you might be interested in <a href="https://github.com/nuxt-community/vuetify-module" target="_blank" rel="noopener">Vuetify</a> or <a href="https://tailwindcss.nuxtjs.org/" target="_blank" rel="noopener">tailwind</a>
    </vue-text>
  </vue-stack>
  </vue-card>`,
});

export const DesignSystem = Template.bind({});
