// MUI imports
import { useTheme } from "@mui/material/styles"
import { Table, TableBody, TableContainer, TableHead, Paper, Typography } from "@mui/material"

// Helper imports
import { StyledTableCell, StyledTableRows } from "../../../helpers/CustomTable"

const CharacterStatsTable = (props: any) => {

    const theme = useTheme()

    let { stats } = props.character

    // const levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
    const levels = ["1", "20", "40", "50", "60", "70", "80", "90"]
    const rows = levels.map((level, index) => createCharacterStats(level, stats.hp[index], stats.atk[index], stats.def[index]))

    return (
        <TableContainer
            component={Paper}
            sx={{
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <Table sx={{ backgroundColor: `${theme.table.body.backgroundColor}` }}>
                <TableHead>
                    <StyledTableRows>
                        <StyledTableCell>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Level
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography sx={{ fontWeight: "bold" }}>
                                HP
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography sx={{ fontWeight: "bold" }}>
                                ATK
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography sx={{ fontWeight: "bold" }}>
                                DEF
                            </Typography>
                        </StyledTableCell>
                    </StyledTableRows>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRows key={row.level}>
                            <StyledTableCell>
                                <Typography variant="body2">
                                    {row.level}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="body2">
                                    {Number(row.hp).toLocaleString()}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="body2">
                                    {row.atk}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="body2">
                                    {row.def}
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRows>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default CharacterStatsTable

const createCharacterStats = (level: string, hp: number, atk: number, def: number) => {
    return { level, hp, atk, def }
}