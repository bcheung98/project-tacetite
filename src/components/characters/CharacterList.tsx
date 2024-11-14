import * as React from "react"

// Component imports
import CharacterRow from "./CharacterRow"
import { EnhancedTableHead, getComparator, stableSort } from "../_custom/EnhancedTableHead"

// MUI imports
import { useTheme, Box, Table, TableBody, TableContainer, Toolbar, Typography, Paper } from "@mui/material"

// Helper imports
import { createDateObject } from "../../helpers/dates"

// Type imports
import { Character } from "../../types/character"

function CharacterList({ characters }: { characters: Character[] }) {

    const theme = useTheme()

    const [order, setOrder] = React.useState("asc")
    const [orderBy, setOrderBy] = React.useState("name")

    const handleRequestSort = (event: React.BaseSyntheticEvent, property: "asc" | "desc") => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const rows = characters.map((char: Character) => ({
        id: char.id,
        name: char.name,
        rarity: char.rarity as number,
        element: char.element,
        weapon: char.weapon,
        releaseDate: char.release.date !== "" ? createDateObject(char.release.date as string).date : "",
        version: char.release.version
    }))

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
                <Toolbar sx={{ backgroundColor: `${theme.toolbar.backgroundColor}`, borderRadius: "5px 5px 0px 0px" }}>
                    <Typography sx={{ fontSize: "20px", fontWeight: theme.font.styled.weight }}>
                        {characters.length} {characters.length === 1 ? "Resonator" : "Resonators"}
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
                            {
                                stableSort(rows, getComparator(order, orderBy))
                                    .map((row, index) =>
                                        <CharacterRow key={index} row={row} />
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default CharacterList

const headCells = [
    { id: "name", label: "Name" },
    { id: "rarity", label: "Rarity" },
    { id: "element", label: "Element" },
    { id: "weapon", label: "Weapon" },
    { id: "id", label: "Release Date" }
]