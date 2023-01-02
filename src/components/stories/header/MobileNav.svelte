<script lang="ts">
    import type {NavLinks} from "$lib/types";
    import {page} from "$app/stores";

    export let navLinks: NavLinks;
    export let dark = false;

    const currentLocale = null;

    function closeMenu() {
        document.getElementById('active').click();
    }

    export let toggleBG = false;


    $: mobileMenuToggleClasses = toggleBG||dark ? "bg-black" : "";
</script>


<div class="block lg:hidden">
    <input class="mobileMenuCheckbox hidden" type="checkbox" id="active" />
    <label
            class="mobileMenuButton absolute z-60 right-5 top-5 h-50px w-50px text-center leading-50px rounded-full text-lg text-white cursor-pointer notouchcolor {mobileMenuToggleClasses}"
            for="active">
        <svg
                class="filter invert inline-block mobileMenuButtonUnToggled"
                viewBox="0 0 512 512"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em">
            <path
                    d="M0 96c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-10.745-24-24zm0 160c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-10.745-24-24zm0 160c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-10.745-24-24z" />
        </svg>
        <svg
                class="filter invert hidden mobileMenuButtonToggled"
                viewBox="0 0 512 512"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em">
            <path
                    d="M71.029 71.029c9.373-9.372 24.569-9.372 33.942 0L256 222.059l151.029-151.03c9.373-9.372 24.569-9.372 33.942 0 9.372 9.373 9.372 24.569 0 33.942L289.941 256l151.03 151.029c9.372 9.373 9.372 24.569 0 33.942-9.373 9.372-24.569 9.372-33.942 0L256 289.941l-151.029 151.03c-9.373 9.372-24.569 9.372-33.942 0-9.372-9.373-9.372-24.569 0-33.942L222.059 256 71.029 104.971c-9.372-9.373-9.372-24.569 0-33.942z" />
        </svg>
    </label>
    <div
            class="mobileMenuWrapper fixed top-0 left-0 h-full w-full flex z-50 flex-col justify-center items-center bg-[length:400%_400%] transition-all ease-in-out duration-300 motion-reduce:transition-none">
        <ul class="text-center">
            {#each navLinks as navLink}
                <li class="{$page.url.pathname === navLink.href ? 'selected' : ''} list-none">
                    <a
                            on:click={closeMenu}
                            class="text-white text-4xl leading-13 font-normal no-underline"
                            href={navLink.href}>{navLink.label}</a>
                </li>
            {/each}
        </ul>
        <a on:click={closeMenu} href="/" class="flex absolute top-8 right-24">
            <img
                    alt={$currentLocale?.alt}
                    src={$currentLocale?.languageFlagURL}
                    width={32}
                    height={21}
                    loading="eager"
                    class="rounded-md {$currentLocale ? '' : 'hidden'}" />
        </a>
    </div>
</div>


<style>
    .mobileMenuCheckbox:checked ~ .mobileMenuButton {
        color: #fff;
    }
    .mobileMenuCheckbox:checked ~ .mobileMenuButton .mobileMenuButtonUnToggled {
        display: none;
    }
    .mobileMenuCheckbox:checked ~ .mobileMenuButton .mobileMenuButtonToggled {
        display: inline-block;
    }
    .mobileMenuCheckbox:checked ~ .mobileMenuWrapper {
        clip-path: circle(100%);
    }
    .mobileMenuCheckbox:checked ~ .mobileMenuButton {
        position: fixed;
    }

    .mobileMenuWrapper {
        display: flex;

        clip-path: circle(0px at calc(100% - 45px) 45px);
        background: linear-gradient(90deg, #762633, #3c4457);
    }

    .headerLink.active {
        background-color: rgba(74, 0, 224, 0.12);
    }
    :global(.dark) .headerLink.active {
        background-color: rgba(255, 255, 255, 0.12);
    }
</style>
