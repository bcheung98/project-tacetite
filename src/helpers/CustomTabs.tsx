import { styled } from "@mui/material/styles"
import { Typography, Tabs, Tab, Box } from "@mui/material"

export const TabPanel = (props: any) => {

    const { children, value, index, ...other } = props
    return (
        <div
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    )
}

interface CustomTabsProps {
    children?: React.ReactNode,
    value: number,
    onChange: (event: React.SyntheticEvent, newValue: number) => void
}

export const StyledTabs = styled((props: CustomTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        width: "100%",
        backgroundColor: "rgb(202, 166, 112)",
    },
})

interface CustomTabProps {
    label: string | any
}

export const StyledTab = styled((props: CustomTabProps) =>
    <Tab disableRipple {...props} />
)(
    ({ theme }) => ({
        color: `${theme.text.color}`,
        fontFamily: "Segoe UI, Roboto",
        fontWeight: "bold",
        "&.Mui-selected": {
            color: `${theme.text.highlight}`,
        },
    }),
)