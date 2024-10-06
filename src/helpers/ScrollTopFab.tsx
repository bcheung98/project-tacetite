// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Fade, useScrollTrigger, Fab } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

function ScrollTopFab(props: any) {

    const theme = useTheme()

    return (
        <ScrollTop {...props}>
            <Fab
                size="medium"
                disableRipple
                sx={{
                    backgroundColor: `${theme.button.selected}`,
                    "&:hover": {
                        backgroundColor: `${theme.button.hover}`
                    }
                }}
            >
                <KeyboardArrowUpIcon sx={{ color: `${theme.text.color}` }} />
            </Fab>
        </ScrollTop>
    )

}

export default ScrollTopFab

interface ScrollTopProps {
    children: React.ReactNode
}

const ScrollTop: React.FC<ScrollTopProps> = (props) => {
    const { children } = props
    const trigger = useScrollTrigger({ threshold: 600 })

    const handleClick = (event: React.BaseSyntheticEvent) => {
        const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor")
        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
            })
        }
    }

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                sx={{ position: "fixed", bottom: 128, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    )
}