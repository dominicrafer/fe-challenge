import tailwindConfig from "./tailwind.config";

const { primary, secondary } = tailwindConfig.theme?.extend?.colors;
export default {
  extras: {
    fontIcons: ['material-icons']
  },
  config: {
    brand: {
      primary,
      secondary,
      // accent: "#9C27B0",

      // dark: "#1d1d1d",
      // "dark-page": "#121212",

      // positive: "#21BA45",
      // negative: "#C10015",
      // info: "#31CCEC",
      // warning: "#F2C037",
    },
  },
};
