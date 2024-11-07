// Component imports
import { StyledTableCell, StyledTableRows } from "../../_styled/StyledTable"

// MUI imports
import { useTheme, Table, TableBody, TableContainer, TableHead } from "@mui/material"

// Helper imports
import { baseATKScaling, subStatScaling } from "../../../data/WeaponScalings"

function WeaponStatsTable(props: any) {

    const theme = useTheme()

    const { stats } = props.weapon

    let levels = []
    props.weapon.rarity > 2 ? levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"] : levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70"]
    let atkArray = baseATKScaling[stats.atk as keyof {}]
    let subStatArray = [] as any[]
    stats.subStat && (subStatArray = subStatScaling[stats.atk as keyof {}][stats.subStat as keyof {}])
    const weaponStatRows = levels.map((level, index) => stats.subStat ? createWeaponStats(level, atkArray[index], subStatArray[index]) : createWeaponStats(level, atkArray[index], ""))

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
                        <StyledTableCell>Base ATK</StyledTableCell>
                        <StyledTableCell>{stats.subStat}</StyledTableCell>
                    </StyledTableRows>
                </TableHead>
                <TableBody>
                    {
                        weaponStatRows.map((row) =>
                            <StyledTableRows key={row.level}>
                                <StyledTableCell>{row.level}</StyledTableCell>
                                <StyledTableCell>{row.atk}</StyledTableCell>
                                <StyledTableCell>{row.subStat}</StyledTableCell>
                            </StyledTableRows>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default WeaponStatsTable

const createWeaponStats = (level: string, atk: number, subStat: string) => {
    return { level, atk, subStat }
}