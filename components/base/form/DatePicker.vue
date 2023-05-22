<template>
  <div class="date-picker">
    <label :name="name" class="date-picker__label" v-if="$slots.label">
      <span
        class="text-paprika"
        v-if="
          showRequiredIcon &&
          ($_.includes(rules, 'required') || $_.has(rules, 'required'))
        "
        >*
      </span>
      <slot name="label"></slot>
    </label>
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
      v-model="date"
      :placeholder="placeholder"
      :format="format"
      :flow="flow"
      :range="range"
      :min-date="min"
      :max-date="max"
      :enable-time-picker="enableTimePicker"
      :time-picker="timePicker"
      :input-class-name="`custom-input-datepicker-class ${
        errorMessage ? 'has-error' : null
      }`"
      :disabled="disabled"
      @update:model-value="onChange"
    />
    <div class="date-picker__error error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useField } from "vee-validate";
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
      type: [String, Array, Date],
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
    inputClassName: {
      type: String,
      default: null,
    },
    rules: {
      type: [String, Object],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [Date, String, Object],
      default: null,
    },
    max: {
      type: [Date, String, Object],
      default: null,
    },
    showRequiredIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    // const date = ref(props.modelValue);

    const {
      errorMessage,
      meta,
      value: date,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    });

    async function onChange(event) {
      emit("update:modelValue", event);
      emit("change", event);
    }
    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );
    return {
      errorMessage,
      date,
      onChange,
    };
  },
  components: {
    Datepicker,
  },
};
</script>

<style lang="postcss">
.date-picker {
  @apply flex flex-col gap-[4px];
  &__label {
    @apply text-[0.875rem] text-primary font-medium;
    @apply ml-[10px];
  }
  &__error {
    @apply text-paprika text-xs;
  }
}
.custom-input-datepicker-class {
  @apply border-l-0 border-r-0 border-t-0 rounded-none;
  &.has-error {
    @apply border-b-paprika border-b !important;
  }
}
</style>
