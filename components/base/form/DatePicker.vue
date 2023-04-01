<template>
  <div class="date-picker">
    <label :name="name" class="date-picker__label">
      <slot name="label"></slot>
    </label>
    <VField
      v-slot="{ meta, field }"
      :value="modelValue"
      :rules="rules"
      :name="name"
    >
      <!-- 
        NOTES:
            > time-picker -> converts datepicker into a time picker
            > enable-timepicker -> removes time selection on calendar
            > flow -> Define the select order from the following:
                ('month' | 'year' | 'calendar' | 'time' | 'minutes' | 'hours' | 'seconds')[]
            > range -> convert datepicker to date range picker
            > format -> define displayed format
      -->
      <Datepicker
        v-bind="field"
        v-model="date"
        :placeholder="placeholder"
        :format="format"
        :flow="flow"
        :range="range"
        :enable-time-picker="enableTimePicker"
        :time-picker="timePicker"
        :class="!meta.valid ? `has-error` : null"
      />
    </VField>
    <VErrorMessage :name="name" v-slot="{ message }">
      <div class="date-picker__error">
        {{ message }}
      </div>
    </VErrorMessage>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    format: {
      type: String,
      default: "Y/MM/d HH:mm",
    },
    rules: {
      type: [String, Object],
    },
    placeholder: {
      type: String,
      default: "Select date...",
    },
    flow: {
      type: Array,
      default: [],
    },
    modelValue: {
      type: [String, Array],
      default: new Date(),
    },
    range: {
      type: Boolean,
      default: false,
    },
    enableTimePicker: {
      type: Boolean,
      default: true,
    },
    timePicker: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const date = ref(props.modelValue);

    return {
      date,
    };
  },
  components: {
    Datepicker,
  },
};
</script>

<style lang="postcss" scoped>
.date-picker {
  @apply flex flex-col gap-[4px];
  &__label {
    @apply text-[1rem] font-medium;
    @apply ml-[10px];
  }
  &__error {
    @apply text-paprika;
  }
}
</style>
