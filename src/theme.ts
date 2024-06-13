import { createTheme } from "@mui/material"

declare module "@mui/material/styles" {
    interface Theme {
        appbar: {
            backgroundColor: string,
        },
        border: {
            color: string,
        },
        paper: {
            backgroundColor: string,
        },
        card: {
            backgroundColor: string,
        },
        table: {
            header: {
                backgroundColor: string,
            },
            body: {
                backgroundColor: string,
                hover: string,
            },
        },
        toolbar: {
            backgroundColor: string,
        },
        materialImage: {
            backgroundColor: string,
        },
        text: {
            color: string,
            highlight: string,
        },
        button: {
            selected: string,
        }
    }
    interface ThemeOptions {
        appbar?: {
            backgroundColor?: string,
        },
        border?: {
            color?: string,
        },
        paper?: {
            backgroundColor?: string,
        },
        card?: {
            backgroundColor?: string,
        },
        table?: {
            header?: {
                backgroundColor?: string,
            },
            body?: {
                backgroundColor?: string,
                hover?: string,
            },
        },
        toolbar?: {
            backgroundColor?: string,
        },
        materialImage?: {
            backgroundColor?: string,
        },
        text?: {
            color?: string,
            highlight?: string,
        },
        button?: {
            selected?: string,
        }
    }
}

export const defaultTheme = createTheme({
    appbar: {
        backgroundColor: "rgb(20, 19, 17)",
    },
    border: {
        color: "rgb(83, 71, 69)",
    },
    paper: {
        backgroundColor: "rgb(25, 21, 26)",
    },
    card: {
        backgroundColor: "rgb(25, 21, 26)",
    },
    table: {
        header: {
            backgroundColor: "rgb(20, 19, 17)",
        },
        body: {
            backgroundColor: "rgb(34, 28, 36)",
            hover: "rgb(45, 41, 46)",
        },
    },
    toolbar: {
        backgroundColor: "rgb(20, 19, 17)",
    },
    materialImage: {
        backgroundColor: "rgb(15, 11, 16)",
    },
    text: {
        color: "white",
        highlight: "rgb(202, 166, 112)",
    },
    button: {
        selected: "rgb(169, 142, 84)",
    }
})