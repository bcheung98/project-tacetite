import * as React from "react"

// Component imports
import EchoPopup from "./EchoPopup"
import Image from "../_custom/Image"

// MUI imports
import { useTheme, useMediaQuery, Typography, Card, Box, Dialog, SwipeableDrawer } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { echoClassId } from "./EchoBrowser"
import { GetRarityColor } from "../../helpers/RarityColors"

// Type imports
import { Echo } from "../../types/echo"

function EchoCard({ echo }: { echo: Echo }) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const { name, cost, sonata } = echo

    const rarity = echoClassId[echo.class]

    const [open, setDialogOpen] = React.useState(false)
    const handleDialogOpen = () => {
        setDialogOpen(true)
    }
    const handleDialogClose = () => {
        setDialogOpen(false)
    }
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return
                }
                setDialogOpen(open)
            }

    return (
        <Card
            sx={{
                position: "relative",
                width: "320px",
                height: "90px",
                backgroundColor: `${theme.materialImage.backgroundColor}`,
                border: `2px solid ${GetRarityColor(rarity)}`,
                borderRadius: "5px",
            }}
        >
            <Grid container spacing={{ xs: 3, sm: 0 }}>
                <Grid size="grow">
                    <Box onClick={matches ? () => handleDialogOpen() : toggleDrawer(true)}>
                        <Image
                            src={`echoes/icons/${name}`}
                            alt={name}
                            style={{
                                width: "90px",
                                height: "auto",
                                backgroundColor: `${theme.materialImage.backgroundColor}`,
                                borderRight: `1px solid ${theme.border.color}`,
                                boxShadow: `inset 0 0 24px 4px ${GetRarityColor(rarity)}`,
                                cursor: "pointer"
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={8}>
                    <Typography
                        noWrap
                        sx={{
                            fontWeight: theme.font.styled.weight,
                            mr: "30px",
                            mt: "5px",
                            fontSize: "14.5px",
                            cursor: "pointer",
                        }}
                        onClick={matches ? () => handleDialogOpen() : toggleDrawer(true)}
                    >
                        {echo.displayName ? echo.displayName : name}
                    </Typography>
                    <Box
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            width: "30px",
                            height: "30px",
                            p: "1px 0",
                            backgroundColor: theme.chip.color,
                            borderRadius: "0 0 0 5px",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: "18px", userSelect: "none" }}>
                            {cost}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", mt: "10px" }}>
                        {
                            sonata.map((sonata: string, index: number) =>
                                <Image
                                    key={index}
                                    src={`echoes/sonata/${sonata}`}
                                    alt={sonata}
                                    style={{
                                        width: "22.5px",
                                        height: "22.5px",
                                        marginRight: "5px"
                                    }}
                                    tooltip={{ title: sonata }}
                                />
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
            {
                matches ?
                    <Dialog
                        open={open}
                        onClose={handleDialogClose}
                        maxWidth={false}
                    >
                        <EchoPopup echo={echo} handleClose={handleDialogClose} />
                    </Dialog>
                    :
                    <SwipeableDrawer
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        sx={{
                            [`& .MuiDrawer-paper`]: {
                                borderTop: `2px solid ${theme.border.colorAlt}`,
                                backgroundColor: `${theme.appbar.backgroundColor}`,
                                height: "auto",

                            }
                        }}
                    >
                        <EchoPopup echo={echo} handleClose={toggleDrawer(false)} />
                    </SwipeableDrawer>
            }
        </Card>
    )

}

export default EchoCard