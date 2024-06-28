import * as React from "react"

// Component imports
import EchoPopup from "./EchoPopup"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, CardHeader, Typography, Dialog } from "@mui/material"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { StyledTableCellNoVert, StyledTableRows } from "../../helpers/CustomTable"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const EchoRow = (props: any) => {

    const theme = useTheme()

    let { row, index, echoes } = props
    const currentEcho = echoes.filter((echo: any) => echo.name === row.name)[0]

    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <StyledTableRows
                key={index}
                sx={{
                    backgroundImage: `linear-gradient(to left, ${theme.table.body.backgroundColor}, 92%, ${EchoRowColor(currentEcho.class)})`,
                    "&:hover": {
                        backgroundImage: `linear-gradient(to left, ${theme.table.body.hover}, 92%, ${EchoRowColor(currentEcho.class)})`
                    }
                }}
            >

                { /* Name + Icon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <img
                                    src={(`${process.env.REACT_APP_URL}/echoes/icons/${currentEcho.name}.png`)}
                                    alt={row.name}
                                    style={{ width: "48px", cursor: "pointer" }}
                                    onError={ErrorLoadingImage}
                                    onClick={() => handleClickOpen()}
                                />
                            }
                            title={
                                <Typography variant="body1"
                                    sx={{
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: "rgb(30, 175, 255)",
                                            textDecoration: "underline",
                                        },
                                    }}
                                    onClick={() => handleClickOpen()}
                                >
                                    {currentEcho.displayName ? currentEcho.displayName : row.name}
                                </Typography>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Code */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {row.code}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* Class */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {currentEcho.class}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* Cost */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {row.cost}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* Sonata */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {
                            currentEcho.sonata.map((sonata: string, index: number) => (
                                <CustomTooltip title={sonata} arrow placement="top" key={index}>
                                    <img
                                        src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata}.png`}
                                        alt={sonata}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "5px"
                                        }}
                                        onError={ErrorLoadingImage}
                                    />
                                </CustomTooltip>
                            ))
                        }
                    </Box>
                </StyledTableCellNoVert>

            </StyledTableRows>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
            >
                <EchoPopup echo={currentEcho} />
            </Dialog>

        </React.Fragment>
    )

}

export default EchoRow

export const EchoRowColor = (echoClass: string) => {

    const theme = useTheme()
    const opacity = 0.45

    switch (echoClass) {
        case "Calamity":
            return `rgb(255, 69, 69, ${opacity})`
        case "Overlord":
            return `rgb(243, 239, 90, ${opacity})`
        case "Elite":
            return `rgb(100, 231, 93, ${opacity})`
        case "Common":
            return `rgb(140, 140, 140, ${opacity})`
        default:
            return `${theme.chip.color}`
    }

}