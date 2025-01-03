import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(16, 16, 16)", "rgb(26, 28, 32)", "rgb(44, 37, 41)"];

const border = {
    color: "rgb(196, 172, 125)",
    highlight: `rgb(233, 194, 39)`,
};

const backgroundColors = [
    {
        main: "rgb(54, 49, 53)",
        light: "rgb(64, 59, 63)",
        dark: "rgb(44, 39, 43)",
    },
    {
        main: "rgb(26, 28, 32)",
        light: "rgb(36, 38, 42)",
        dark: "rgb(16, 18, 22)",
    },
    {
        main: "rgb(16, 16, 16)",
        light: "rgb(26, 26, 26)",
        dark: "rgb(6, 6, 6)",
    },
];

export const wuwaThemeData = {
    name: "WuWa",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    palette: {
        primary: {
            main: "rgb(16, 16, 16)",
        },
        secondary: {
            main: "rgb(26, 28, 32)",
        },
        tertiary: {
            main: "rgb(44, 37, 41)",
            light: "rgb(54, 47, 51)",
            dark: "rgb(34, 27, 31)",
        },
        info: {
            main: "rgb(134, 115, 75)",
        },
        divider: border.color,
    },
    font: {
        main: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300,
        },
        styled: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300,
        },
        element: {
            weight: 300,
        },
        highlight: {
            weight: 300,
        },
        sizes: {
            "h4-styled": {
                xs: 26,
                sm: 28,
            },
            "h5-styled": {
                xs: 22,
                sm: 24,
            },
            "h6-styled": {
                xs: 18,
                sm: 20,
            },
            "body1-styled": {
                xs: 14,
                sm: 16,
            },
            "subtitle1-styled": {
                xs: 13,
                sm: 15,
            },
            "body2-styled": {
                xs: 12,
                sm: 14,
            },
            "subtitle2-styled": {
                xs: 11,
                sm: 13,
            },
            h4: {
                xs: 26,
                sm: 28,
            },
            h5: {
                xs: 22,
                sm: 24,
            },
            h6: {
                xs: 18,
                sm: 20,
            },
            body1: {
                xs: 14,
                sm: 16,
            },
            subtitle1: {
                xs: 13,
                sm: 15,
            },
            body2: {
                xs: 12,
                sm: 14,
            },
            subtitle2: {
                xs: 11,
                sm: 13,
            },
        },
    },
    text: {
        primary: "rgb(255, 255, 255)",
        contrast: "rgb(0, 0, 0)",
        selected: "rgb(196, 172, 125)",
        description: "rgb(205, 205, 205)",
        highlight: "#F7CA2F",
        highlight2: "#E0BB00",
        star: "rgb(255, 238, 157)",
        header: "#EEC477",
        refinement: "#F7CA2F",
        aero: "#55FFB5",
        electro: "#AC70F1",
        fusion: "#F0744E",
        glacio: "#49ABF7",
        havoc: "#C989B1",
        spectro: "#FAE56C",
        value: "#F7CA2F",
    },
    appbar: {
        backgroundColor: appbarColors[0],
        hover: appbarColors[1],
        selectedHover: appbarColors[2],
        color: "rgb(255, 255, 255)",
    },
    border: {
        color: {
            primary: border.color,
            highlight: border.highlight,
        },
    },
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[2].main,
    },
    icon: {
        backgroundColor: appbarColors[1],
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[1].main,
    },
    menu: {
        primary: backgroundColors[0].dark,
        hover: backgroundColors[0].light,
        selected: backgroundColors[1].dark,
        selectedHover: backgroundColors[1].light,
    },
    table: {
        body: {
            primary: backgroundColors[0].dark,
            hover: backgroundColors[0].light,
        },
    },
};

export const wuwaTheme = createTheme(wuwaThemeData);
