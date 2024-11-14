import * as React from "react"

// Component imports
import EchoRow from "./EchoRow"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Table, TableBody, TableContainer, Toolbar, Typography, Paper } from "@mui/material"

// Helper imports
import { EnhancedTableHead, getComparator, stableSort } from "../_custom/EnhancedTableHead"
import { echoClassId } from "./EchoBrowser"

// Type imports
import { Echo } from "../../types/echo"

function EchoList({ echoes }: { echoes: Echo[] }) {

    const theme = useTheme()

    const [order, setOrder] = React.useState("desc")
    const [orderBy, setOrderBy] = React.useState("classID")

    const handleRequestSort = (event: React.BaseSyntheticEvent, property: "asc" | "desc") => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const rows = echoes.map((echo: Echo) => ({
        name: echo.name,
        displayName: echo.displayName ? echo.displayName : echo.name,
        code: echo.code,
        class: echo.class,
        classID: echoClassId[echo.class],
        cost: echo.cost,
        sonata: echo.sonata.join("_")
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
                <Toolbar sx={{ backgroundColor: `${theme.toolbar.backgroundColor}` }}>
                    <Typography sx={{ fontSize: "20px", fontWeight: theme.font.styled.weight }}>
                        {echoes.length} {echoes.length === 1 ? "Echo" : "Echoes"}
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
                                    <EchoRow key={index} row={row} echoes={echoes} />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default EchoList

const headCells = [
    { id: "name", label: "Name" },
    { id: "code", label: "Code" },
    { id: "classID", label: "Class" },
    { id: "cost", label: "Cost" },
    { id: "sonata", label: "Sonata Effect" }
]