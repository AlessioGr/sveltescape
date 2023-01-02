import Footer from "$components/stories/Footer.svelte";
import type {Story} from "$lib/types";
import {ShapesConfig} from "$lib/storyconfigs/Shapes";

export const FooterConfig: Story = {
    component: Footer,
    name: "Footer",
    props: {
        "color": {
            defaultValue: "#1b1b1b",
            type: "string",
            specialType: "hexColor"
        },
        "logoSRC": {
            defaultValue: "https://www.bonfireleads.com/wp-content/uploads/2020/08/Bonfire-Leads-Logo-Horizontal-1.svg",
            type: "string",
        },
        "logoWidth": {
            type: "number",
            defaultValue: undefined,
        },
        "logoHeight": {
            type: "number",
            defaultValue: undefined,
        },
        "footerBar": {
            defaultValue: undefined,
            props: {
                "left": {
                    array: true,
                    props: [
                        {
                            "label": {
                                type: "string",
                                defaultValue: "© 2022 - Bonfire Leads"
                            },
                            "href": {
                                type: "string"
                            },
                            "colorHex": {
                                label: "color",
                                type: "string",
                                specialType: 'hexColor',
                                defaultValue: undefined,
                                enabled: false
                            },
                        }
                    ],
                },
                "right": {
                    array: true,
                    props: [
                        {
                            "label": {
                                type: "string",
                                defaultValue: "Imprint"
                            },
                            "href": {
                                type: "string",
                                defaultValue: "/"
                            },
                            "colorHex": {
                                label: "color",
                                type: "string",
                                specialType: 'hexColor',
                                defaultValue: undefined,
                                enabled: false
                            },
                        }
                    ],
                }
            }
        },
        "shapes": {
            type: "story",
            specialType: ShapesConfig,
            defaultValue: {
                demo: false,
                shapes:[
                    {
                        shapeType: 6,
                        direction: "top",
                        colorCSS: null
                    },
                ]
            },
        },
    }
};
