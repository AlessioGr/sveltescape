import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from "svelte-preprocess";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '$components': './src/components',
    },
  },
  vitePlugin: {
    experimental: {
      inspector: {
        toggleKeyCombo: 'control-x',
        holdMode: true,
        showToggleButton: 'always',
        toggleButtonPos: 'bottom-right'
      }
    }
  }
};

export default config;
