import { styled } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableRow, { tableRowClasses } from "@mui/material/TableRow"

interface CustomTableRowProps {
    children?: React.ReactNode
}

export const StyledTableRows = styled((props: CustomTableRowProps) => (
    <TableRow hover {...props} />
))(({ theme }) => ({
    [`&.${tableRowClasses.hover}`]: {
        "&:hover": {
            backgroundColor: `${theme.table.body.hover}`,
        },
    },
    color: `${theme.text.color}`,
}))

interface CustomTableCellProps {
    children?: React.ReactNode
}

export const StyledTableCell = styled((props: CustomTableCellProps) => (
    <TableCell align="center" size="small" component="th" {...props} />
))(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: `${theme.table.header.backgroundColor}`,
        color: `${theme.text.color}`,
        fontSize: "16px",
        fontFamily: theme.font.styled.family,
        fontWeight: theme.font.styled.weight
    },
    color: `${theme.text.color}`,
    fontSize: "10pt",
    border: `1px solid ${theme.border.color}`,
}))

export const StyledTableCellNoVert = styled((props: CustomTableCellProps) => (
    <TableCell align="center" size="small" component="th" {...props} />
))(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: `${theme.table.header.backgroundColor}`,
        color: `${theme.text.color}`,
    },
    color: `${theme.text.color}`,
    borderTop: `1px solid ${theme.border.color}`,
    borderBottom: `1px solid ${theme.border.color}`,
}))