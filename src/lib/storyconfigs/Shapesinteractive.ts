import type {Story} from "$lib/types";
import ShapesInteractive from "$components/stories/ShapesInteractive.svelte";

export const ShapesInteractiveConfig: Story = {
    component: ShapesInteractive,
    name: "ShapesInteractive",
    label: "Shapes (Interactive)",
    props: {
        "demo": {
            defaultValue: true,
            type: "boolean",
        },
        "shapes": {
            array: true,
            props: [
                {
                    "shapeType": {
                        defaultValue: 1,
                        type: "number",
                    },
                    "direction": {
                        defaultValue: "top",
                        type: "string",
                        specialType: "enum",
                        specialTypeArgs: ["top", "bottom"]
                    },
                    "colorCSS": {
                        defaultValue: "#111111",
                        type: "string",
                        specialType: 'hexColor',
                        label: "color",
                    },
                    "darkBG": {
                        type: "boolean",
                    },
                    "xScale": {
                        type: "number",
                    },
                    "xShift": {
                        type: "number",
                    },
                    "yScale": {
                        type: "number",
                    },
                    "yShift": {
                        type: "number",
                    },
                    "defaultHeight": {
                        type: "number",
                        label: "height",
                    },
                    "invertX": {
                        type: "boolean",
                    },
                    "invertY": {
                        type: "boolean",
                    },
                    "containerCSS": {
                        type: "string",
                        readOnly: true,
                        output: false,
                    },
                    "containerStyle": {
                        type: "string",
                        readOnly: true,
                        output: false,
                    },
                    "svgStyle": {
                        type: "string",
                        readOnly: true,
                        output: false,
                    },
                    "viewBox": {
                        type: "string",
                        readOnly: true,
                        output: false,
                    },
                    "pathD": {
                        type: "string",
                        readOnly: true,
                        output: false,
                    },
                    "generatedCurve": {
                        enabled: false,
                        props: {
                            "seed": {
                                defaultValue: "anyseed",
                                type: "string",
                            },
                            "amplitude": {
                                defaultValue: 60,
                                type: "number",
                            },
                            "waveCount": {
                                defaultValue: 4,
                                type: "number",
                            },
                            "waveLength": {
                                defaultValue: 100,
                                type: "number",
                            },
                            "invert": {
                                defaultValue: false,
                                type: "boolean",
                            }
                        }
                    },
                    "generatedZigZag": {
                        enabled: false,
                        props: {
                            "seed": {
                                defaultValue: "anyseed",
                                type: "string",
                            },
                            "amplitude": {
                                defaultValue: 60,
                                type: "number",
                            },
                            "waveCount": {
                                defaultValue: 4,
                                type: "number",
                            },
                            "waveLength": {
                                defaultValue: 100,
                                type: "number"
                            },
                            "invert": {
                                defaultValue: false,
                                type: "boolean",
                            }
                        }
                    }
                }
            ],
        },
    },

};
