import { Theme } from "@mui/material";
import { Element } from "types/_common";

export function getElementColor(theme: Theme, element?: Element) {
    return element
        ? theme.text[element.toLowerCase() as keyof typeof theme.text]
        : "";
}
