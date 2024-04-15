<template>
  <div>
    <q-input v-bind="$attrs" :label="label" v-model="value" :placeholder="placeholder" mask="date" :name="name">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="value">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  rules: {
    type: [String, Object]
  },
  modelValue: {
    type: String
  },
  isDirty: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["update:modelValue", "update:isDirty", "change"]);
const { errorMessage, meta, errors, value, handleChange } = useField(props.name, props.rules, {
  bails: false,
  initialValue: props.modelValue,
  label: props.label ? props.label : props.name
});
</script>

<style></style>
