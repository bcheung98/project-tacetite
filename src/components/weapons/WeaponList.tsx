import * as React from "react"

// Component imports
import WeaponRow from "./WeaponRow"
import { EnhancedTableHead, getComparator, stableSort } from "../_custom/EnhancedTableHead"

// MUI imports
import { useTheme, Box, Table, TableBody, TableContainer, Toolbar, Typography, Paper } from "@mui/material"

// Helper imports
import { baseATKScaling, BaseATKScalingKeys, SubStatsKeys, subStatScaling } from "../../data/WeaponScalings"

// Type imports
import { Weapon } from "../../types/weapon"

function WeaponList({ weapons }: { weapons: Weapon[] }) {

    const theme = useTheme()

    const [order, setOrder] = React.useState("asc")
    const [orderBy, setOrderBy] = React.useState("name")

    const handleRequestSort = (event: React.BaseSyntheticEvent, property: "asc" | "desc") => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const rows = weapons.map((weapon: Weapon) => {
        const baseATK = weapon.stats.atk as BaseATKScalingKeys
        const atk = baseATKScaling[baseATK].slice(-1)[0]
        const subStat = weapon.stats.subStat as SubStatsKeys
        const subStatArray = subStatScaling[baseATK][subStat]
        const subStatValue = subStatArray?.slice(-1)[0]
        const subStatString = `${subStat} ${subStatValue}`
        return {
            name: weapon.name,
            displayName: weapon.displayName ? weapon.displayName : weapon.name,
            rarity: weapon.rarity,
            type: weapon.type,
            atk: atk,
            subStat: subStatString
        }
    })

    return (
        <Box sx={{ width: "100%" }}>
            <Paper
                sx={{
                    backgroundColor: `${theme.paper.backgroundColor}`,
                    border: `2px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    color: `${theme.text.color}`,
                }}
            >
                <Toolbar sx={{ backgroundColor: `${theme.toolbar.backgroundColor}` }}>
                    <Typography sx={{ fontSize: "20px", fontWeight: theme.font.styled.weight }}>
                        {weapons.length} {weapons.length === 1 ? "Weapon" : "Weapons"}
                    </Typography>
                </Toolbar>
                <hr style={{ border: `0.5px solid ${theme.border.color}`, marginTop: "0px" }} />
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) =>
                                    <WeaponRow key={index} row={row} weapons={weapons} />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default WeaponList

const headCells = [
    { id: "name", label: "Name" },
    { id: "rarity", label: "Rarity" },
    { id: "type", label: "Type" },
    { id: "atk", label: "ATK" },
    { id: "subStat", label: "Substat" }
]