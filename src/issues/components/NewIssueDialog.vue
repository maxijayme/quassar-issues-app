<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type Label from '../interfaces/label';
import useIssueMutation from '../composables/useIssueMutation';

interface Props{
  isOpen: boolean,
  labels: Label[]
}

interface Emits{
  (e: 'onClose'): void
}

const { issueMutation } = useIssueMutation();

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const isDialogOpen = ref<boolean>(false)
const title = ref<string>('')
const body = ref<string>('')
const dialogLabels = ref<string[]>([])

const labelsOptions = computed(() => {
  return props.labels.map(label => (label.name))
})

watch(props, () => {
  isDialogOpen.value = props.isOpen
})

watch( issueMutation.isSuccess, (isSuccess) => {
  if(isSuccess){

    title.value = ''
    body.value = ''
    dialogLabels.value = []

    issueMutation.reset()
    emits('onClose')
  }
})

</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isDialogOpen" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form @submit="issueMutation.mutate({ title, body, labels: dialogLabels })">

          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Issue</div>
              <div class="text-grey">Add new issue with labels</div>
            </div>

            <q-space />
            <div>
              <q-input dense v-model="title" label="Title" aria-placeholder="Title" class="q-mb-sm" :rules="[ val => !!val || 'Field is required']"/>

              <q-select
                dense
                filled
                v-model="dialogLabels"
                multiple
                :options="labelsOptions"
                use-chips
                stack-label
                label="Multiple selecction"
                class="q-mb-sm"
              />
              <!-- MarkDownEditor -->
              <MdEditor v-model="body" placeholder="# Markdown" language="en-US"/>
            </div>
          </q-card-section>

          <q-card-actions class="row wrap justify-end">
            <q-btn
              :disable="issueMutation.isPending.value"
              type="submit"
              flat
              label="Add Issue"
              color="dark"
            />
            <q-btn
              :disable="issueMutation.isPending.value"
              flat
              label="Cancel"
              color="primary"
              v-close-popup
              @click="emits('onClose')"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

</style>
