# Vue 3 + Nuxt 3 + TailwindCSS Admin Dashboard Boilerplate

NuxtJS - https://nuxt.com/docs/getting-started/introduction

TailwindCSS - https://tailwindcss.com/
## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## AWS Amplify Setup
Create <i>aws-exports.js</i> file and follow the format written on <i>aws-exports-sample.js</i>

## ENV Setup
Create <i>.env</i> file and follow the format on <i>.env-example</i>


## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run start
```


## Helpers

- DayJS - JS library for parsing, validation, manipulation of dates / time. visit the link for more info regarding the library https://day.js.org/docs/en/installation/installation
```bash
<template>
    <div>
        {{$dayjs().format('YYYY-MM-DD')}}
    </div>
</template>
<script>
setup() {
    const {$dayjs} = useNuxtApp();
}
</script>
```
- Lodash - Javascript library for object, array, data manipulation. https://lodash.com/
```bash
<script>
setup() {
    const {$_} = useNuxtApp();

    const test = $_.map([1,2,3], (data) => {
        return data;
    })
}
</script>
```
- vee-validate - https://vee-validate.logaretm.com/v3/guide/basics.html#validation-provider

## Components
Visit the <i>/components</i> path for the list of components available.

## API Management
This boilerplate uses factory pattern in managing APIs

### Factory - <i>/plugins/api.js</i>
### Endpoints - <i>/api/*</i>

### API Interceptor - <i>/composables/api-interceptor.js</i>

