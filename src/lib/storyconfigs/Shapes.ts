import type {Props, PropsArray, Story} from "$lib/types";
import {generateBezierCurveSVG, generateZigZagSVG} from "$components/stories/SVGGenerator";
import Shapes from "$components/stories/Shapes.svelte";

export const ShapesConfig: Story = {
    component: Shapes,
    name: "Shapes",
    label: "Shapes (Static)",
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
                        output: false
                    },
                    "direction": {
                        defaultValue: "top",
                        type: "string",
                        specialType: "enum",
                        specialTypeArgs: ["top", "bottom"],
                        output: false
                    },
                    "colorCSS": {
                        defaultValue: "#111111",
                        label: "color",
                        type: "string",
                        specialType: 'hexColor',
                        output: false
                    },
                    "darkBG": {
                        type: "boolean",
                        output: false
                    },
                    "xScale": {
                        type: "number",
                        output: false
                    },
                    "xShift": {
                        type: "number",
                        output: false
                    },
                    "yScale": {
                        type: "number",
                        output: false
                    },
                    "yShift": {
                        type: "number",
                        output: false
                    },
                    "defaultHeight": {
                        type: "number",
                        label: "height",
                        output: false
                    },
                    "invertX": {
                        type: "boolean",
                        output: false
                    },
                    "invertY": {
                        type: "boolean",
                        output: false
                    },
                    "containerCSS": {
                        type: "string",
                        readOnly: true,
                        input: false
                    },
                    "containerStyle": {
                        type: "string",
                        readOnly: true,
                        input: false
                    },
                    "svgStyle": {
                        type: "string",
                        readOnly: true,
                        input: false
                    },
                    "viewBox": {
                        type: "string",
                        readOnly: true,
                        input: false
                    },
                    "pathD": {
                        type: "string",
                        readOnly: true,
                        input: false
                    },
                    "generatedCurve": {
                        enabled: false,
                        output: false,
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
                        output: false,
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
                    }
                }
            ],
        },
    },
    storyPropsPreProcessor: props => {
        console.error("Running preprocessor", props)
        const shapesProp = props["shapes"];
        if(shapesProp && shapesProp.props) {
            shapesProp.props = parseShapes(shapesProp.props as PropsArray)
            /*for (const shapeProps of (shapesProp.props as PropsArray))
            {
                const colorCSS = shapeProps["colorCSS"];
                if (colorCSS) {
                    const foundProp = shapeProps["colorInLight"];
                    if(foundProp){
                        foundProp.value = colorCSS.value+"7d";
                    }else{
                        shapeProps["colorInLight"] = {
                            value: colorCSS.value+"7d",
                            type: "string",
                            specialType: "hexColor",
                            readOnly: true,
                        }
                    }
                }
            }*/
        }

        return props;
    },/*
        storyPropsPostProcessor: props => {
            for(const prop of props){
                if(prop.key === "shapes" && prop.props){
                    for(const shapesProp of prop.props){
                        for(const shapeProp of shapesProp as Prop[]){
                            if(shapeProp.key === "colorCSS"){
                                shapeProp.value = "#111";
                            }
                        }

                    }

                }
            }
            return props;
        },*/

};

function parseShapes(shapes: PropsArray){
    for(const shape of shapes){
        if(shape.direction.value === "top" && shape.invertY.value === undefined) {
            shape.invertY.value = true;
        }

        shape.containerCSS.value = "shape left-0 right-0 absolute overflow-hidden pointer-events-none leading-0 z-2 "
        shape.containerCSS.value += (shape.direction.value === "top" ? "topShape " : "bottomShape ") + (shape.invertX.value ? "sInvertX " : "") + (shape.invertY.value ? "sInvertY " : "");


        shape.containerStyle.value = "";
        let defaultHeight;
        let viewBox;
        let pathD;
        if(!shape.generatedCurve.enabled && !shape.generatedZigZag.enabled){
            switch (shape.shapeType.value) {
                case 1:
                    defaultHeight = shape.direction.value === "top" ? 100 : 120;
                    viewBox = "0 0 1200 194.3";
                    pathD = "M1200 133.3l-50 8.9c-50 8.6-150 26.9-250 31.1-100 4.2-200-4.2-300-26.7S400 89.2 300 62.2C200 35.8 100 17.5 50 8.9L0 0v194.3h1200v-61z";
                    break;
                case 2:
                    defaultHeight = 40;
                    viewBox = "0 0 1200 350";
                    pathD = "M1200 350V0C22.4 60.3 0 336.7 0 336.7V350h1200z";
                    break;
                case 3:
                    defaultHeight = 60;
                    viewBox = "0 0 1200 194.3";
                    pathD = "M1200 133.3l-50 8.9c-50 8.6-150 26.9-250 31.1-100 4.2-200-4.2-300-26.7S400 89.2 300 62.2C200 35.8 100 17.5 50 8.9L0 0v194.3h1200v-61z";
                    break;
                case 4: //zigzag
                    viewBox = "0 0 1200 100"
                    defaultHeight = 60;
                    pathD = "M1200 77.2L400 0 0 77.2V100h1200z";
                    break;
                case 6: //zigzag Like an inverted 4
                    viewBox = "0 0 1200 100";
                    defaultHeight = 80;
                    pathD = "M1200 100H0V0l400 77.2L1200 0z"
                    break;
                case 5:
                    viewBox = "0 0 1200 176"
                    defaultHeight = 120;
                    pathD = "M0 176h1200V14L800 88 400 0 0 156z";
                    break;
                case 7: //round
                    viewBox = "0 0 1200 150.98286501068407";
                    defaultHeight = 400;
                    pathD = "M 0 120C 201.8178479351445 120, 201.8178479351445 134.9622588591544, 403.635695870289 134.9622588591544C 591.4325058019131 134.9622588591544, 591.4325058019131 107.27091068634763, 779.2293157335371 107.27091068634763C 963.0609152139592 107.27091068634763, 963.0609152139592 150.98286501068407, 1146.8925146943814 150.98286501068407 V 194.3 H 0 V 0";
                    break;
            }
        }else{
            let result: {dPath: string, height: number};
            if(shape.generatedCurve?.enabled){
                result = generateBezierCurveSVG(shape.generatedCurve.props.seed.value, shape.generatedCurve.props.amplitude.value, shape.generatedCurve.props.waveCount.value, shape.generatedCurve.props.waveLength.value, shape.generatedCurve.props.invert.value);
                console.log("Generatedcurve result", result)
            } else if(shape.generatedZigZag?.enabled){
                result = generateZigZagSVG(shape.generatedZigZag.props.seed.value, shape.generatedZigZag.props.amplitude.value, shape.generatedZigZag.props.waveCount.value, shape.generatedZigZag.props.waveLength.value, shape.generatedZigZag.props.invert.value);
            }
            viewBox = `0 0 1200 ${result.height}`;
            defaultHeight = 400;
            pathD = result.dPath;
        }

        if(shape.defaultHeight.value){
            defaultHeight = shape.defaultHeight.value
        }


        shape.viewBox.value = viewBox;
        shape.pathD.value = pathD;



        shape.svgStyle.value = "width: calc(100% + 1px); height: " + defaultHeight + "px; ";

        if(shape.darkBG.value){
            shape.containerCSS.value += "text-background-white dark:text-background-dark-50 ";
        }else{
            shape.containerCSS.value += "text-background-light-100 dark:text-background-dark-100 ";
        }

        if(shape.yScale.value){
            const newHeight = defaultHeight*shape.yScale.value;
            shape.svgStyle.value += "height: " + newHeight + "px; ";
        }
        if(shape.yShift.value){
            shape.containerStyle.value += "bottom: " + shape.yShift.value + "px; "
        }

        if(shape.xScale.value){
            shape.svgStyle.value += "width: calc(" + (100*shape.xScale.value) + "%); "
        }
        if(shape.xShift.value){
            shape.containerStyle.value += "left: " + shape.xShift.value + "px; "
        }

        if(shape.colorCSS?.value){
            shape.containerStyle.value += "color: " + shape.colorCSS.value + "; "
        }
    }
    return shapes;
}
