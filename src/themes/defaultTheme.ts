export const defaultTheme = {
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "Segoe UI, Roboto",
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "rgb(83, 71, 69)"
                }
            }
        }
    },
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
        hover: "rgb(125, 105, 62)",
    },
    chip: {
        color: "rgb(160, 134, 80)"
    }
}