<script lang="ts">
    import type {NavLinks} from "$lib/types";
    const currentLocale = null;

    export let navLinks: NavLinks;

    export let dark = false;


</script>
<nav class="<lg:hidden {dark ? 'text-black' : 'text-white'} font-bold text-xl">
    <ul class="flex flex-row gap-8">
        {#each navLinks as link}
            <li>
                <a href={link.href}>{link.label}</a>
            </li>
        {/each}
    </ul>
</nav>

<a href="/" class="hidden lg:flex ml-8">
    <img
            alt={$currentLocale?.alt}
            src={$currentLocale?.languageFlagURL}
            width={32}
            height={21}
            loading="eager"
            class="rounded-md {$currentLocale ? '' : 'hidden'}" />
</a>

