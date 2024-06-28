import * as React from "react"

// Component imports
import CharacterRow from "./CharacterRow"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Table, TableBody, TableContainer, Toolbar, Typography, Paper } from "@mui/material"

// Helper imports
import { EnhancedTableHead, getComparator, stableSort } from "../../helpers/CustomSortTable"

// Type imports
import { CharacterData } from "../../types/CharacterData"

const CharacterList = (props: any) => {

    const theme = useTheme()

    const [order, setOrder] = React.useState("asc")
    const [orderBy, setOrderBy] = React.useState("name")

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const rows = props.characters.map((char: CharacterData) => createData(char.name, char.rarity, char.element, char.weapon, char.nation, char.release.date, char.release.version, char.id))

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
                    <Typography variant="h5" component="div"
                        sx={{
                            fontWeight: "bold",
                            display: "block",
                            margin: "auto"
                        }}
                    >
                        {props.characters.length} {props.characters.length === 1 ? "Resonator" : "Resonators"}
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
                                .map((row, index) => {
                                    return (
                                        <CharacterRow key={index} row={row} characters={props.characters} />
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default CharacterList

const createData = (name: string, rarity: number, element: string, weapon: string, nation: string, releaseDate: string, version: string, id: number) => {
    return { name, rarity, element, weapon, nation, releaseDate, version, id }
}

const headCells = [
    { id: "name", label: "Name" },
    { id: "rarity", label: "Rarity" },
    { id: "element", label: "Element" },
    { id: "weapon", label: "Weapon" },
    { id: "nation", label: "Nation" },
    { id: "id", label: "Release Date" }
]