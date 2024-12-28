import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(0, 16, 32)", "rgb(8, 32, 72)", "rgb(32, 56, 96)"];

const border = {
    color: "rgb(168, 147, 105)",
    highlight: `rgb(233, 194, 39)`,
};

const backgroundColors = [
    {
        main: "rgb(200, 200, 200)",
        light: "rgb(210, 210, 210)",
        dark: "rgb(190, 190, 190)",
    },
    {
        main: "rgb(225, 225, 225)",
        light: "rgb(235, 235, 235)",
        dark: "rgb(215, 215, 215)",
    },
    {
        main: "rgb(250, 250, 250)",
        light: "rgb(255, 255, 255)",
        dark: "rgb(240, 240, 240)",
    },
];

export const lightThemeData = {
    name: "Light",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    palette: {
        primary: {
            main: "rgb(0, 16, 32)",
        },
        secondary: {
            main: "rgb(8, 32, 72)",
        },
        tertiary: {
            main: "rgb(32, 56, 96)",
            light: "rgb(52, 76, 116)",
            dark: "rgb(22, 46, 86)",
        },
        info: {
            main: "rgb(25, 118, 210)",
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
            "body2-styled": {
                xs: 12,
                sm: 14,
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
            body2: {
                xs: 12,
                sm: 14,
            },
        },
    },
    text: {
        primary: "rgb(0, 0, 0)",
        contrast: "rgb(255, 255, 255)",
        selected: "rgb(30, 175, 255)",
        description: "rgb(16, 16, 16)",
        highlight: "rgb(0, 0, 0)",
        highlight2: "#CA9C00",
        physical: "#CA9C00",
        ice: "#1DAFAD",
        fire: "#FF5623",
        electric: "#33B6FE",
        ether: "#FE427E",
        wind: "#0AC272",
        value: "#2BAD00",
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
        backgroundColor: appbarColors[2],
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[1].main,
    },
    menu: {
        primary: backgroundColors[2].dark,
        hover: backgroundColors[2].light,
        selected: backgroundColors[0].dark,
        selectedHover: backgroundColors[0].light,
    },
    table: {
        body: {
            primary: backgroundColors[0].dark,
            hover: backgroundColors[0].light,
        },
    },
};

export const lightTheme = createTheme(lightThemeData);
