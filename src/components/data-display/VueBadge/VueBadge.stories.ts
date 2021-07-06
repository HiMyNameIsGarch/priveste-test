import { storiesOf } from '@storybook/vue';
import ComponentDocs from '@/assets/design-system/docs/components/ComponentDocs.vue';
import VueInline from '@/components/layout/VueInline/VueInline.vue';
import VueText from '@/components/typography/VueText/VueText.vue';
import VueColumns from '@/components/layout/VueColumns/VueColumns.vue';
import VueColumn from '@/components/layout/VueColumns/VueColumn/VueColumn.vue';
import { badgeStatuses } from '../../prop-validators';
import VueBadge from './VueBadge.vue';

const story = storiesOf('Data Display|Badge', module) as any;

story.add(
  'Statuses',
  () => ({
    components: { ComponentDocs, VueBadge, VueInline, VueText, VueColumns, VueColumn },
    data(): any {
      return {
        variations: badgeStatuses,
      };
    },
    template: `
      <component-docs
        component-name="Badge"
        usage="Badges are used to inform users of the status of an object or of an action that’s been taken."
        story="Display all statuses for the Badge component."
      >
      <vue-inline stack-phone stack-tablet-portrait stack-tablet-landscape stack-small-desktop stack-large-desktop>
        <vue-columns v-for="variation in variations" :key="variation">
          <vue-column width="250px">
            <vue-text look="small-title">{{ variation }}</vue-text>
          </vue-column>
          <vue-column width="contain">
            <vue-badge :status="variation">Label</vue-badge>
          </vue-column>
        </vue-columns>

      </vue-inline>
      </component-docs>`,
  }),
  {
    info: {
      components: { VueBadge },
    },
  },
);
