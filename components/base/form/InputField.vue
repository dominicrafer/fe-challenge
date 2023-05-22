<template>
  <div class="input">
    <div class="input__label-height-placeholder" v-if="$slots.label"></div>
    <div class="input__input-container">
      <!-- inputClass -->
      <input
        :key="name"
        :id="name"
        :name="name"
        :value="currency ? currencyFormattedValue : value"
        :type="showPassword || currency ? 'text' : type"
        :class="{
          'has-icon': type === 'password' || $slots.icon,
          'has-error': errors.length,
          'show-placeholder': !$slots.label,
          [padding]: true,
          [fontSize]: true,
          [inputWidth]: true,
          [align]: true,
          [borderStyle]: true,
        }"
        :disabled="disabled"
        :placeholder="placeholder"
        :step="step"
        @blur="(meta.touched = true), (focused = false)"
        @focus="focused = true"
        @input="updateValue"
        class="input-container__input"
        ref="inputRef"
      />
      <label
        :name="name"
        class="input-container__floating-label"
        :class="modelValue || modelValue === 0 || focused ? 'float' : null"
        v-if="$slots.label"
      >
        <span
          class="text-paprika"
          v-if="
            showRequiredIcon &&
            ($_.includes(rules, 'required') || $_.has(rules, 'required'))
          "
          >*</span
        >
        <slot name="label"></slot>
      </label>

      <div class="input-container__icon" :class="`${customIconClass}`">
        <slot name="icon"></slot>
        <Icon
          name="mdi:eye-outline"
          v-if="type === 'password' && !showPassword"
          @click="showPassword = !showPassword"
          color="#29345B"
          width="20"
          height="20"
        />
        <Icon
          name="mdi:eye-off-outline"
          v-if="type === 'password' && showPassword"
          @click="showPassword = !showPassword"
          color="#29345B"
          width="20"
          height="20"
        />
      </div>
    </div>
    <div class="input__error error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div class="input__instructions" v-if="$slots.instructions">
      <slot name="instructions" />
    </div>
  </div>
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
    padding: {
      type: String,
      default: "py-[6px] px-[12px]",
    },
    fontSize: {
      type: String,
      default: "text-[0.875rem]",
    },
    inputWidth: {
      type: String,
      default: "w-full",
    },
    align: {
      type: String,
      default: "text-left",
    },
    borderStyle: {
      type: String,
      default: null,
    },
    instructions: {
      type: String,
      default: null,
    },
    customIconClass: {
      type: String,
      default: null,
    },
    showRequiredIcon: {
      type: Boolean,
      default: true,
    },
    currency: {
      type: Boolean,
      default: false,
    },
    currencyOptions: {
      type: Object,
      default: {
        currency: "PHP",
        currencyDisplay: "hidden",
        hideCurrencySymbolOnFocus: false,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false,
        autoDecimalDigits: false,
        useGrouping: true,
      },
    },
    currencyMin: {
      type: Number,
      default: 0,
    },
    currencyMax: {
      type: Number,
      default: 0,
    },
    currencyPrecision: {
      type: Number,
      default: 0,
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

<style lang="postcss" scoped>
.input {
  @apply flex flex-col gap-[4px] relative justify-start;
  &__label-height-placeholder {
    @apply h-[20px] w-full;
  }
  &__input-container {
    @apply relative;

    .input-container__input {
      @apply border-b border-gray-200;
      /* @apply py-[6px] px-[12px]; */

      @apply outline-none;

      &.has-error {
        @apply border-paprika;
      }

      &.has-icon {
        @apply pl-[12px] pr-[28px];
      }

      /* &:focus ~ .input-container__floating-label,
      &:not(:focus):valid ~ .input-container__floating-label,
      &:disabled ~ .input-container__floating-label,
      &:autofill ~ .input-container__floating-label {
        @apply left-[10px] top-[-25px] text-primary !important;
        opacity: 1;
      } */
      &.show-placeholder {
        &::placeholder {
          @apply text-gray-400 !important;
        }
      }
      &:not(:focus),
      &:focus:not(:invalid) {
        &::placeholder {
          @apply text-transparent;
          transition: 0.2s ease all;
        }
      }

      &:disabled {
        @apply text-gray-400;
      }
    }

    .input-container__icon {
      @apply cursor-pointer;
      @apply absolute right-[10px] top-[4px];
    }

    .input-container__floating-label {
      @apply z-10 absolute pointer-events-none text-gray-400 font-medium;
      @apply left-[10px] top-[5px] text-[0.875rem];
      transition: 0.2s ease all;
      &.float {
        @apply left-[10px] top-[-25px] text-primary !important;
        opacity: 1;
      }
    }
  }

  &__error {
    @apply text-paprika;
    @apply text-[0.75rem] ml-[10px];
  }

  &__instructions {
    @apply text-gray-400 text-xs ml-[10px];
  }
}
</style>
