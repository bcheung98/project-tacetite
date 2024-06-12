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
        backgroundColor: "rgb(15, 15, 15)",
    },
    border: {
        color: "rgb(168, 147, 105)",
    },
    paper: {
        backgroundColor: "rgb(30, 30, 30)",
    },
    card: {
        backgroundColor: "rgb(30, 30, 30)",
    },
    table: {
        header: {
            backgroundColor: "rgb(15, 15, 15)",
        },
        body: {
            backgroundColor: "rgb(26, 22, 24)",
            hover: "rgb(50, 50, 50)",
        },
    },
    toolbar: {
        backgroundColor: "rgb(15, 15, 15)",
    },
    materialImage: {
        backgroundColor: "rgb(20, 20, 20)",
    },
    text: {
        color: "white",
        highlight: "rgb(202, 166, 112)",
    },
    button: {
        selected: "rgb(169, 142, 84)",
    }
})