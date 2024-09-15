import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ['../public']

  // managerHead: head => {
  //   // let cleanedHtml = head? head.replace(/<link\s+rel=["']icon["'][^>]*>/gi, ''):''
  //   return `${head}<link rel="icon" type="image/svg+xml" href="/favicon2.svg">‍‍`
  // }
};
export default config;
