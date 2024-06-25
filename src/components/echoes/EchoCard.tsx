import * as React from "react"

// Component imports
import EchoPopup from "./EchoPopup"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Card, CardContent, Box, Dialog } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const EchoCard = (props: any) => {

    const theme = useTheme()

    let { name, cost, sonata } = props.echo

    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Card
            sx={{
                width: "320px",
                height: "90px",
                mr: "15px",
                mb: "20px",
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `2px solid ${theme.border.color}`,
                borderRadius: "15px 25px 15px 15px",
            }}
        >
            <CardContent sx={{ py: "10px" }}>
                <Grid container>
                    <Grid xs>
                        <img
                            src={`${process.env.REACT_APP_URL}/echoes/${name}.png`}
                            alt={name}
                            style={{
                                width: "96px",
                                height: "96px",
                                marginLeft: "-18px",
                                marginTop: "-15px",
                                backgroundColor: `${theme.materialImage.backgroundColor}`,
                                borderRight: `2px solid ${theme.border.color}`,
                                boxShadow: `inset 0 0 30px 5px ${EchoColor(props.echo.class)}`,
                                cursor: "pointer"
                            }}
                            onError={ErrorLoadingImage}
                            onClick={() => handleClickOpen()}
                        />
                    </Grid>
                    <Grid xs={7.75}>
                        <Box sx={{ maxWidth: "155px" }}>
                            <Typography
                                noWrap
                                variant="body2"
                                sx={{
                                    color: `${theme.text.color}`,
                                    fontWeight: "bold",
                                    ml: "-10px",
                                    fontSize: "11.5pt",
                                    cursor: "pointer"
                                }}
                                onClick={() => handleClickOpen()}
                            >
                                {name}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                position: "relative"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    position: "absolute",
                                    right: "-18px",
                                    top: "-32px",
                                    width: "35px",
                                    height: "35px",
                                    backgroundColor: `${theme.chip.color}`,
                                    borderRadius: "0px 5px 0px 5px",
                                    alignItems: "center"
                                }}
                            >
                                <Typography sx={{ color: `${theme.text.color}`, fontWeight: "bold", ml: "12px", userSelect: "none" }} variant="body2">
                                    {cost}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", ml: "-10px", mt: "10px" }}>
                            {
                                sonata.map((sonata: string, index: number) => (
                                    <CustomTooltip title={sonata} arrow placement="top" key={index}>
                                        <img
                                            src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata}.png`}
                                            alt={sonata}
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                marginRight: "5px"
                                            }}
                                            onError={ErrorLoadingImage}
                                        />
                                    </CustomTooltip>
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
            >
                <EchoPopup echo={props.echo} />
            </Dialog>
        </Card>
    )

}

export default EchoCard

const EchoColor = (echoClass: string) => {

    const theme = useTheme()

    switch (echoClass) {
        case "Calamity":
            return "rgb(255, 69, 69)"
        case "Overlord":
            return "rgb(243, 239, 90)"
        case "Elite":
            return "rgb(100, 231, 93)"
        case "Common":
            return "rgb(140, 140, 140)"
        default:
            return `${theme.chip.color}`
    }

}