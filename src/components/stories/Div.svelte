<script lang="ts">
    export let backgroundImage: string;
    export let backgroundImageClasses: string;

    let clazz;
    export { clazz as class };
</script>

<div class="relative inline-block overflow-hidden w-full {clazz}">
    <slot/>
    {#if backgroundImage}
        <img class="pointer-events-none absolute w-full h-full -z-1 top-0 object-cover {backgroundImageClasses}" src="{backgroundImage}" alt="background image"/>
    {/if}
</div>
