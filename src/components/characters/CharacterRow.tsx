import * as React from "react"

// Component imports
import { StyledTableCellNoVert, StyledTableRows } from "../_styled/StyledTable"

// MUI imports
import { useTheme, Box, ButtonBase, CardHeader, Typography } from "@mui/material"

// Helper imports
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

function CharacterRow(props: any) {

    const theme = useTheme()

    const { row } = props

    return (
        <React.Fragment>
            <StyledTableRows>

                { /* Name + Icon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${row.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                    <img alt={row.name} src={(`${process.env.REACT_APP_URL}/characters/icons/${row.name.split(" ").join("_")}.png`)} style={{ width: "48px", cursor: "pointer" }} onError={ErrorLoadingImage} />
                                </ButtonBase>
                            }
                            title={
                                <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${row.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                    <Typography variant="body1"
                                        sx={{
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "rgb(30, 175, 255)",
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        {row.name}
                                    </Typography>
                                </ButtonBase>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Rarity */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ color: `${theme.text.star}`, textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }} variant="h5">
                            {[...Array(row.rarity).keys()].map(() => "✦")}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* Element */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <img alt={row.element} src={(`${process.env.REACT_APP_URL}/elements/icons/${row.element}.png`)} style={{ width: "32px" }} onError={ErrorLoadingImage} />
                            }
                            title={
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    {row.element}
                                </Typography>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Weapon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <img alt={row.weapon} src={(`${process.env.REACT_APP_URL}/weapons/icons/${row.weapon}.png`)}
                                    style={{
                                        width: "36px",
                                        border: "1px solid rgba(0, 30, 60, 0)",
                                        borderRadius: "64px",
                                    }}
                                    onError={ErrorLoadingImage}
                                />
                            }
                            title={
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    {row.weapon}
                                </Typography>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Release date */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {`${row.releaseDate} (${row.version})`}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

            </StyledTableRows>
        </React.Fragment>
    )
}

export default CharacterRow