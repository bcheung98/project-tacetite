import * as React from "react"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types"
import { TableCell, TableHead, TableRow, Typography } from "@mui/material"
import TableSortLabel, { tableSortLabelClasses } from "@mui/material/TableSortLabel"
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp"

interface EnhancedTableProps {
    order: any
    orderBy: string
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void
    headCells: any
}

export function EnhancedTableHead(props: EnhancedTableProps) {

    const theme = useTheme()

    const { order, orderBy, onRequestSort, headCells } = props
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead sx={{ borderBottom: `2px solid ${theme.border.color}` }}>
            <TableRow>
                {headCells.map((headCell: any) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                            IconComponent={((orderBy === headCell.id) ? IconActive : IconInactive) as React.JSXElementConstructor<{ className: string }>}
                        >
                            <Typography variant="body1" sx={{ fontWeight: "bold", color: `${theme.text.color}` }}>
                                {headCell.label}
                            </Typography>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired,
}

function descendingComparator(a: any, b: any, orderBy: any) {
    if (orderBy === "subStatString") {
        return (b[orderBy]).localeCompare(a[orderBy], undefined, { numeric: true })
    }
    else {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
    }
    return 0
}

export function getComparator<Key extends keyof any>(
    order: string,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const IconActive = styled((props) => (
    <KeyboardArrowDownSharpIcon {...props} />
))(() => ({
    [`&.${tableSortLabelClasses.icon}`]: {
        color: "gold !important"
    }
}))

const IconInactive = styled((props) => (
    <KeyboardArrowDownSharpIcon {...props} />
))(() => ({
    [`&.${tableSortLabelClasses.icon}`]: {
        color: "white !important"
    }
}))