# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

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
- Lodash