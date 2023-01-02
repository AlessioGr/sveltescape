import type {Story} from "$lib/types";
import pkg from 'really-relaxed-json';
const { toJson } = pkg;

import {ShapesConfig} from "$lib/storyconfigs/Shapes";
import {ShapesInteractiveConfig} from "$lib/storyconfigs/Shapesinteractive";
import {FooterConfig} from "$lib/storyconfigs/Footer";
import {HeaderConfig} from "$lib/storyconfigs/Header";

export const stories: Story[] = [
    HeaderConfig,
    FooterConfig,
    ShapesConfig,
    ShapesInteractiveConfig,

]




export function toRelaxedJson(jsonString) {
    const correctedJson = jsonString// Replace ":" with "@colon@" if it's between double-quotes
        .replace(/:\s*"([^"]*)"/g, function(match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"';
        })
        // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/:\s*'([^']*)'/g, function(match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"';
        })
        // Add double-quotes around any tokens before the remaining ":"
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
        // Turn "@colon@" back into ":"
        .replace(/@colon@/g, ':')

    return JSON.parse(toJson(correctedJson));
}
