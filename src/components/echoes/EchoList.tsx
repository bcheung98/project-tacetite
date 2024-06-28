import * as React from "react"

// Component imports
import EchoRow from "./EchoRow"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Table, TableBody, TableContainer, Toolbar, Typography, Paper } from "@mui/material"

// Helper imports
import { EnhancedTableHead, getComparator, stableSort } from "../../helpers/CustomSortTable"
import { echoClassId } from "./EchoBrowser"

// Type imports
import { EchoData } from "../../types/EchoData"

const EchoList = (props: any) => {

    const theme = useTheme()

    const [order, setOrder] = React.useState("desc")
    const [orderBy, setOrderBy] = React.useState("classID")

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const rows = props.echoes.map((echo: EchoData) => createData(echo.name, echo.code, echoClassId[echo.class as keyof typeof echoClassId], echo.cost, echo.sonata.join(" ")))

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
                        {props.echoes.length} {props.echoes.length === 1 ? "Echo" : "Echoes"}
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
                                        <EchoRow key={index} row={row} echoes={props.echoes} />
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default EchoList

const createData = (name: string, code: string, classID: number, cost: number, sonataString: string) => {
    return { name, code, classID, cost, sonataString }
}

const headCells = [
    { id: "name", label: "Name" },
    { id: "code", label: "Code" },
    { id: "classID", label: "Class" },
    { id: "cost", label: "Cost" },
    { id: "sonataString", label: "Sonata Effect" }
]