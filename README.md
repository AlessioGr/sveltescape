SvelteScape is a Storybook alternative made for Svelte. Its goal is to also allow managing very complex component, as seen in the [Shapes](https://story.bonfireleads.com/ShapesInteractive) example.

<img width="1723" alt="image" src="https://user-images.githubusercontent.com/70709113/210283373-f419a00e-7340-486c-a1ce-8c60c63e8bfd.png">

## Unique features
- Allows more complex data structures to be edited
- Prop pre- and post-processors, to move load from the svelte component to SvelteScape. Very useful in the shapes example, so you do not have to ship an entire SVG curve generator with negative runtime performance benefits. Instead, this generates the svg paths via the postprocessor.

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```
