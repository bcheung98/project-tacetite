import * as React from "react"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Table, TableBody, TableContainer, TableHead } from "@mui/material"

// Helper imports
import { StyledTableCell, StyledTableRows } from "../../../helpers/CustomTable"

const CharacterForteScalingTable = (props: any) => {

    const theme = useTheme()

    const rows = props.stats.map((stat: string[]) => createTalentScaling(stat[0], stat[1], stat[2], stat[3], stat[4], stat[5], stat[6], stat[7], stat[8], stat[9], stat[10]))

    return (
        <TableContainer
            sx={{
                border: `2px solid ${theme.border.color}`,
                borderRadius: "5px",
                ml: "20px",
                width: "98%",
            }}
        >
            <Table sx={{ backgroundColor: `${theme.table.body.backgroundColor}` }}>
                <TableHead>
                    <StyledTableRows>
                        <StyledTableCell>LVL</StyledTableCell>
                        {[...Array(10).keys()].map(i => <StyledTableCell key={i}>{i + 1}</StyledTableCell>)}
                    </StyledTableRows>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row: Row, index: number) => (
                            <StyledTableRows key={index}>
                                <StyledTableCell>
                                    {row.level}
                                </StyledTableCell>
                                <StyledTableCell>{row.a}</StyledTableCell>
                                <StyledTableCell>{row.b}</StyledTableCell>
                                <StyledTableCell>{row.c}</StyledTableCell>
                                <StyledTableCell>{row.d}</StyledTableCell>
                                <StyledTableCell>{row.e}</StyledTableCell>
                                <StyledTableCell>{row.f}</StyledTableCell>
                                <StyledTableCell>{row.g}</StyledTableCell>
                                <StyledTableCell>{row.h}</StyledTableCell>
                                <StyledTableCell>{row.i}</StyledTableCell>
                                <StyledTableCell>{row.j}</StyledTableCell>
                            </StyledTableRows>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default CharacterForteScalingTable

interface Row {
    level: string, a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string, i: string, j: string
}

const createTalentScaling = (level: string, a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string, i: string, j: string) => {
    return { level, a, b, c, d, e, f, g, h, i, j }
}