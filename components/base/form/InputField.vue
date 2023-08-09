<template>
  <q-input v-bind="$attrs" v-model="value" :type="showPassword ? 'text' : type" :label="label"
    :error="errors.length ? true : undefined" :error-message="errorMessage" :placeholder="placeholder" no-error-icon>
    <template #label v-if="$slots.label">
      <slot name="label"></slot>
    </template>
  </q-input>
</template>

<script>
import { useField } from "vee-validate";
import { useCurrencyInput } from "vue-currency-input";
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    name: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: null,
    },
    step: {
      type: String,
      default: "1",
    },
    rules: {
      type: [String, Object],
    },
    modelValue: {
      type: [String, Number],
    },
    isDirty: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    let inputRef = ref(`inputRef`);
    let currencyFormattedValue = ref(null);
    let currencySetValue = ref(null);
    let currencyNumberValue = ref(null);

    const { errorMessage, meta, errors, value, handleChange } = useField(
      props.name,
      props.rules,
      {
        bails: false,
        initialValue: props.modelValue,
        label: props.label ? props.label : props.name,
      }
    );
    if (props.currency) {
      let options = props.currencyOptions;
      let valueRange = {};
      if (props.min) {
        valueRange = {
          ...valueRange,
          min: props.min,
        };
      }
      if (props.max) {
        valueRange = {
          ...valueRange,
          max: props.max,
        };
      }
      const {
        inputRef: currencyField,
        formattedValue: currencyFormat,
        setValue,
        numberValue,
      } = useCurrencyInput({
        ...options,
        precision: props.currencyPrecision,
        valueRange,
      });
      currencySetValue = setValue;
      inputRef = currencyField;
      currencyFormattedValue = currencyFormat;
      currencyNumberValue = numberValue;
      onMounted(() => {
        // Currently there is a bug where you have to wait until after mount for useCurrencyInput to properly set the value
        setTimeout(() => {
          // sets the initial value if provided
          if (value.value) {
            currencySetValue(value.value);
          }
        }, 300);
      });

      watch(currencyNumberValue, (newValue) => {
        // sync it with vee-validate, this will trigger validation
        handleChange(newValue);
        // handleChange(newValue, false); // doesn't trigger validation
      });
    }
    const showPassword = ref(false);
    const focused = ref(false);

    const updateValue = (event) => {
      if (!props.currency) {
        emit("update:modelValue", event.target.value);
      }
    };
    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );

    return {
      value,
      focused,
      errorMessage,
      meta,
      showPassword,
      updateValue,
      errors,
      inputRef,
      currencyFormattedValue,
    };
  },
};
</script>
