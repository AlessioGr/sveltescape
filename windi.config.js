import { defineConfig } from "windicss/helpers";
import typography from "windicss/plugin/typography";


export default defineConfig({
  darkMode: "class",
  attributify: true,
  plugins: [typography()],
  extract: {
    include: [
      "index.html",
      "./src/**/*.{html,js,svelte,ts}",
      "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
    ]
  },
  theme: {
    extend: {
      colors: {
        "background-light-100": "#f8f8f8",
        "background-dark-100": "#1f1f1f",
        "primary-100": "#762633",
        "primary2-100": "#3c4457"
      }
    }
  },
  shortcuts: {
    "body-background": "bg-background-light-100 dark:bg-background-dark-100",
    "body-text": "text-black dark:text-white"
  }
});
