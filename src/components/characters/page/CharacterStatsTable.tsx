// Component imports
import { StyledTableCell, StyledTableRows } from "../../_styled/StyledTable"

// MUI imports
import { useTheme, Table, TableBody, TableContainer, TableHead } from "@mui/material"

function CharacterStatsTable(props: any) {

    const theme = useTheme()

    const { stats } = props.character

    // const levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
    const levels = ["1", "20", "40", "50", "60", "70", "80", "90"]
    const rows = levels.map((level, index) => createCharacterStats(level, stats.hp[index], stats.atk[index], stats.def[index]))

    return (
        <TableContainer
            sx={{
                border: `2px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <Table sx={{ backgroundColor: `${theme.table.body.backgroundColor}` }}>
                <TableHead>
                    <StyledTableRows>
                        <StyledTableCell>Level</StyledTableCell>
                        <StyledTableCell>HP</StyledTableCell>
                        <StyledTableCell>ATK</StyledTableCell>
                        <StyledTableCell>DEF</StyledTableCell>
                    </StyledTableRows>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) =>
                            <StyledTableRows key={row.level}>
                                <StyledTableCell>{row.level}</StyledTableCell>
                                <StyledTableCell>{Number(row.hp).toLocaleString()}</StyledTableCell>
                                <StyledTableCell>{row.atk}</StyledTableCell>
                                <StyledTableCell>{row.def}</StyledTableCell>
                            </StyledTableRows>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default CharacterStatsTable

const createCharacterStats = (level: string, hp: number, atk: number, def: number) => {
    return { level, hp, atk, def }
}