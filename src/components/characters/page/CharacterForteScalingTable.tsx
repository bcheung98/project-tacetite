// MUI imports
import { useTheme } from "@mui/material/styles"
import { Table, TableBody, TableContainer, TableHead, Typography } from "@mui/material"

// Helper imports
import { StyledTableCell, StyledTableRows } from "../../../helpers/CustomTable"

const CharacterForteScalingTable = (props: any) => {

    const theme = useTheme()

    const rows = props.stats.map((stat: string[]) => createTalentScaling(stat[0], stat[1], stat[2], stat[3], stat[4], stat[5], stat[6], stat[7], stat[8], stat[9], stat[10]))

    const rowStyle = {
        fontSize: "9.5pt"
    }

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
                        <StyledTableCell>
                            <Typography sx={{ fontWeight: "bold" }}>LVL</Typography>
                        </StyledTableCell>
                        {
                            [...Array(10).keys()].map(i => (
                                <StyledTableCell key={i}>
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{i + 1}</Typography>
                                </StyledTableCell>)
                            )
                        }
                    </StyledTableRows>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row: Row, index: number) => (
                            <StyledTableRows key={index}>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.level}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.a}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.b}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.c}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.d}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.e}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.f}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.g}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.h}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.i}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography variant="body2" sx={rowStyle}>{row.j}</Typography>
                                </StyledTableCell>
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