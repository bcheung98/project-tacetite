// MUI imports
import { useTheme } from "@mui/material/styles"
import { AppBar, Box, Typography, IconButton } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

function BottomNav() {

    const theme = useTheme()

    return (
        <AppBar position="static"
            sx={{
                mt: 10,
                mb: -5,
                pt: 2,
                textAlign: "center",
                backgroundColor: `${theme.appbar.backgroundColor}`,
                borderTop: `1px solid ${theme.border.color}`,
            }}
        >
            <Typography sx={{ fontWeight: "bold", mb: "5px" }} variant="body2">Project Tacetite is not affiliated with Kuro Games.<br />Wuthering Waves, images and data are registered trademarks of Kuro Games.</Typography>
            <Box>
                <IconButton disableRipple href={"https://github.com/bcheung98/project-tacetite"} target="_blank" color="inherit">
                    <GitHubIcon />
                </IconButton>
            </Box>
        </AppBar>
    )

}

export default BottomNav