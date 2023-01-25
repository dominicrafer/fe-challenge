<template>
  <div class="components page">
    <PageHeader title="Components" />
    <div class="components__list page__body">
      <div class="list__component">
        <span class="component__name">Button</span>

        <div class="component__samples">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Alerts</span>

        <div class="component__samples">
          <Alert type="success" title="Success"
            >Lorem ipsum dolor sit amet, consectetur.</Alert
          >
          <Alert type="danger" title="Danger"
            >Lorem ipsum dolor sit amet, consectetur.</Alert
          >
          <Alert type="info" title="Info"
            >Lorem ipsum dolor sit amet, consectetur.</Alert
          >
          <Alert type="warning" title="Warning"
            >Lorem ipsum dolor sit amet, consectetur.</Alert
          >
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Toasts / Pop-up Alerts</span>

        <div class="component__samples">
          <a
            href="https://sweetalert2.github.io/"
            class="text-blue-500"
            target="_blank"
          >
            https://sweetalert2.github.io/</a
          >
        </div>
      </div>
      <Form v-slot="{errors}">
        {{errors}}
        <div class="list__component">
          <span class="component__name">Input</span>
          <div class="component__samples">
            <InputField
              name="default-input"
              placeholder="Enter Text"
              rules="alpha"
              v-model="test"
            >
              <template #label> Text Input </template>
            </InputField>
            <InputField
              name="number"
              type="number"
              placeholder="Enter Number"
              v-model="test"
              rules="digits:3"
            >
              <template #label> Number Input </template>
            </InputField>
            <InputField
              name="password"
              placeholder="Enter Password"
              v-model="test"
              type="password"
            >
              <template #label> Input Icon </template>
            </InputField>
            <InputField
              name="disabled"
              type="text"
              placeholder="Disabled"
              v-model="test"
              disabled
            >
              <template #label> Disabled </template>
            </InputField>
          </div>
        </div>
      </Form>
      <div class="list__component">
        <span class="component__name">Checkbox</span>
        <div class="component__samples">
          <Checkbox name="default-checkbox" label="Checkbox Input" />
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Radio Button</span>
        <div class="component__samples">
          <RadioButton name="default-radio-button" label="Radio Input" />
        </div>
      </div>
      <Form>
      <div class="list__component">
        <span class="component__name">Textarea</span>
        <div class="component__samples">
          <Textarea name="default-textarea" label="Textarea Input" v-model="textArea"           rules="digits:3"/>
        </div>
      </div>
      </Form>
      <div class="list__component">
        <span class="component__name">Card</span>
        <div class="component__samples">
          <Card title="Card Title"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.</Card
          >
          <Card title="Card Title" subtitle="subtitle"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.</Card
          >
          <Card title="Card Title" subtitle="subtitle"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.

            <template #footer>Footer</template>
          </Card>
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Drawer</span>
        <div class="component__samples">
          <Button @click="leftDrawerVisible = true">Left Drawer</Button>
          <Button @click="rightDrawerVisible = true">Right Drawer</Button>
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Modal</span>
        <div class="component__samples">
          <Button @click="modalVisible = true">Modal Button</Button>
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Date / Time Picker</span>
        <div class="component__samples">
          <a
            href="https://vue3datepicker.com/props/modes/"
            class="text-blue-500"
            target="_blank"
          >
            https://vue3datepicker.com/props/modes/</a
          >
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Select / Multi Select</span>
        <div class="component__samples">
          <a
            href="https://vue-multiselect.js.org/#sub-props"
            class="text-blue-500"
            target="_blank"
          >
            https://vue-multiselect.js.org/#sub-props</a
          >
        </div>
      </div>
      <div class="list__component">
        <span class="component__name">Icons</span>
        <div class="component__samples">
          <a
            href="https://icon-sets.iconify.design/"
            class="text-blue-500"
            target="_blank"
          >
            https://icon-sets.iconify.design/</a
          >
        </div>
      </div>
    </div>
    <Modal title="Modal" :show="modalVisible" @close="modalVisible = false" />
    <Drawer
      title="Left Drawer Title"
      :show="leftDrawerVisible"
      position="left"
      @close="leftDrawerVisible = false"
    >
      <template #footer>Footer</template></Drawer
    >
    <Drawer
      title="Right Drawer Title"
      :show="rightDrawerVisible"
      position="right"
      @close="rightDrawerVisible = false"
    >
      <template #footer>Footer</template></Drawer
    >
  </div>
</template>

<script>
import { Form, useForm } from "vee-validate";
export default {
  setup() {
    const leftDrawerVisible = ref(false);
    const rightDrawerVisible = ref(false);
    const modalVisible = ref(false);

    const test = ref(null);
    const textArea = ref('textArea');
    return {
      leftDrawerVisible,
      rightDrawerVisible,
      modalVisible,
      test,
      textArea
    };
  },
  components: {
    Form,
  },
};
</script>

<style lang="postcss" scoped>
.components {
  @apply p-[12px];
  &__header {
    @apply text-[24px] font-bold;
  }
  &__list {
    @apply p-[12px] flex flex-col gap-[15px];
    .list__component {
      @apply bg-slate-50;
      @apply p-[12px];
      .component__name {
        @apply text-[18px] font-semibold;
      }
      .component__samples {
        @apply mt-[12px];
        @apply flex flex-row items-start gap-[10px];
      }
    }
  }
}
</style>