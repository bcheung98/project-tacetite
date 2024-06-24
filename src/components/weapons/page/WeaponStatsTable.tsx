// MUI imports
import { useTheme } from "@mui/material/styles"
import { Table, TableBody, TableContainer, TableHead, Paper } from "@mui/material"

// Helper imports
import { StyledTableCell, StyledTableRows } from "../../../helpers/CustomTable"
import { baseATKScaling, subStatScaling } from "../../../helpers/WeaponScalings"

const WeaponStatsTable = (props: any) => {

    const theme = useTheme()

    let { stats } = props.weapon

    let levels = []
    props.weapon.rarity > 2 ? levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"] : levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70"]
    let atkArray = baseATKScaling[stats.atk as keyof {}]
    let subStatArray = [] as any[]
    stats.subStat && (subStatArray = subStatScaling[stats.atk as keyof {}][stats.subStat as keyof {}])
    const weaponStatRows = levels.map((level, index) => stats.subStat ? createWeaponStats(level, atkArray[index], subStatArray[index]) : createWeaponStats(level, atkArray[index], ""))

    return (
        <TableContainer component={Paper}
            sx={{
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <Table sx={{ backgroundColor: `${theme.table.body.backgroundColor}` }}>
                <TableHead>
                    <StyledTableRows>
                        <StyledTableCell>Level</StyledTableCell>
                        <StyledTableCell>Base ATK</StyledTableCell>
                        <StyledTableCell>{stats.subStat}</StyledTableCell>
                    </StyledTableRows>
                </TableHead>
                <TableBody>
                    {weaponStatRows.map((row) => (
                        <StyledTableRows key={row.level}>
                            <StyledTableCell>{row.level}</StyledTableCell>
                            <StyledTableCell>{row.atk}</StyledTableCell>
                            <StyledTableCell>{row.subStat}</StyledTableCell>
                        </StyledTableRows>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default WeaponStatsTable

const createWeaponStats = (level: string, atk: number, subStat: string) => {
    return { level, atk, subStat }
}