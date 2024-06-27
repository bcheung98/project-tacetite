import * as React from "react"
import { StyledTableCellNoVert, StyledTableRows } from "../../helpers/CustomTable"
import { Box } from "@mui/system"
import { ButtonBase, CardHeader, Typography } from "@mui/material"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const WeaponRow = (props: any) => {

    let { row, index, weapons } = props
    const currentWeapon = weapons.filter((wep: any) => wep.name === row.name)[0]

    return (
        <React.Fragment>
            <StyledTableRows key={index}>

                { /* Name + Icon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <ButtonBase disableRipple href={`/project-tacetite/weapon/${currentWeapon.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                    <img alt={row.name} src={(`${process.env.REACT_APP_URL}/weapons/${currentWeapon.name}.png`)} style={{ width: "48px", cursor: "pointer" }} onError={ErrorLoadingImage} />
                                </ButtonBase>
                            }
                            title={
                                <ButtonBase disableRipple href={`/project-tacetite/weapon/${currentWeapon.name.split(" ").join("_").toLowerCase()}`} target="_blank">
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
                                        {currentWeapon.displayName ? currentWeapon.displayName : row.name}
                                    </Typography>
                                </ButtonBase>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Rarity */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ color: "rgb(255, 208, 112)", textShadow: "#e3721b 1px 1px 10px", userSelect: "none" }} variant="h5">
                            {[...Array(row.rarity).keys()].map(() => "✦")}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* Weapon Type */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <img alt={row.type} src={(`${process.env.REACT_APP_URL}/weapons/icons/${row.type}.png`)}
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
                                    {row.type}
                                </Typography>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Base ATK */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {row.atk}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* Sub Stat */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {row.subStatString}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

            </StyledTableRows>
        </React.Fragment>
    )
}

export default WeaponRow