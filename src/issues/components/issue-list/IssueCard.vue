<script setup lang="ts">
import useIssue from 'src/issues/composables/useIssue';
import { State, type Issue } from 'src/issues/interfaces/issue';
import { timeSince } from 'src/shared/helpers/time-since';
import { toRef } from 'vue';
import VueMarkdown from 'vue-markdown-render'

interface Props {
  issue: Issue;
}
const props = defineProps<Props>();

const issue = toRef(props, 'issue');

const { setIssueCacheData } = useIssue(issue.value.number, { autoload: false });
// const { prefetchIssue } = useIssue(issue.value.number, { autoload: false });

</script>


<template>
  <q-card @mouseenter="setIssueCacheData(issue)" class="text-black col-12 q-mb-md" flat bordered>
  <!-- <q-card @mouseenter="prefetchIssue(issue.number)" class="text-black col-12 q-mb-md" flat bordered> -->
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url" alt="User avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="`/issue/${ issue.number }`">{{ issue.title }}</router-link>
        </q-item-label>
        <q-item-label caption>
          Published {{timeSince(issue.created_at)}} ago
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue.comments }}
          </q-item-label>
          <q-chip v-if="issue.state === State.Closed" color="positive" text-color="white" icon="check"> Closed </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report"> Open </q-chip>
        </q-item-label>

      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md">
        <VueMarkdown :source="issue.body || ''" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip
          v-for="label of issue.labels"
          :key="label.node_id"
          :style="{color: `#${label.color}`}"
          outline>
          {{ label.name }}
        </q-chip>
      </div>
    </q-item-section>

  </q-card>
</template>


<style scoped>

</style>
