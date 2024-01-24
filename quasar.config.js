import tailwindConfig from "./tailwind.config";

const { primary, secondary } = tailwindConfig.theme?.extend?.colors;
export default {
  extras: {
    fontIcons: ['material-icons']
  },
  plugins: ["Notify"],
  config: {
    brand: {
      primary,
      secondary,
    },
  },
};
