import type { StorybookConfig } from "@storybook/react-vite";
import path from 'path';

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
  // async viteFinal(config, { configType }) {
  //   // Use ViteStaticCopy to copy the README.md file during the build
  //   if (configType === 'PRODUCTION') {
  //     config.plugins!.push(
  //       ViteStaticCopy({
  //         targets: [
  //           {
  //             src: path.resolve(__dirname, '../README.md'), // Source file
  //             dest: '.', // Destination is root of storybook-static
  //           },
  //         ],
  //       })
  //     );
  //   }
  // },
  staticDirs: ['../public']

  // managerHead: head => {
  //   // let cleanedHtml = head? head.replace(/<link\s+rel=["']icon["'][^>]*>/gi, ''):''
  //   return `${head}<link rel="icon" type="image/svg+xml" href="/favicon2.svg">‍‍`
  // }
};
export default config;
