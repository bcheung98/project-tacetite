import * as React from "react"
import { useSelector } from "react-redux"

// Component imports
import EchoPopup from "./EchoPopup"
import { CustomTooltip } from "../_styled/StyledTooltip"
import { StyledTableCellNoVert, StyledTableRows } from "../_styled/StyledTable"

// MUI imports
import { Box, CardHeader, Typography, Dialog } from "@mui/material"

// Helper imports
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { RootState } from "../../redux/store"
import { Echo } from "../../types/echo"

const EchoRow = (props: any) => {

    const { row } = props
    const echoes = useSelector((state: RootState) => state.echoes.echoes)
    const currentEcho = echoes.filter((echo: Echo) => echo.name === row.name)[0]

    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <StyledTableRows>

                { /* Name + Icon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <img
                                    src={(`${process.env.REACT_APP_URL}/echoes/icons/${row.name.split(" ").join("_")}.png`)}
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
                                    {row.displayName}
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
                            {row.class}
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
                            row.sonata.split("_").map((sonata: string, index: number) =>
                                <CustomTooltip title={sonata} arrow placement="top" key={index}>
                                    <img
                                        src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata.split(" ").join("_")}.png`}
                                        alt={sonata}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "5px"
                                        }}
                                        onError={ErrorLoadingImage}
                                    />
                                </CustomTooltip>
                            )
                        }
                    </Box>
                </StyledTableCellNoVert>

            </StyledTableRows>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
            >
                <EchoPopup echo={currentEcho} handleClose={handleClose} />
            </Dialog>
        </React.Fragment>
    )

}

export default EchoRow