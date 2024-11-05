import * as React from "react"

// Component imports
import { CustomTooltip } from "../_styled/StyledTooltip"
import { CustomMenuItem } from "../_styled/StyledMenu"
import SearchBar from "../_custom/SearchBar"
import BannerRow from "./BannerRow"

// MUI imports
import { useTheme, useMediaQuery, Box, Table, TableBody, TableContainer, Paper, Autocomplete, Typography } from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"

// Helper imports
import { EnhancedTableHead, getComparator, stableSort } from "../_custom/EnhancedTableHead"
import { isTBA } from "../../helpers/isTBA"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { Banner } from "../../types/banner"
import { CustomSwitch } from "../_styled/StyledSwitch"

function BannerList(props: any) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("md"))

    let { type, banners } = props

    let URL = type === "character" ? "characters/icons" : "weapons"

    const [rows, setRows] = React.useState<any[]>([])
    const [values, setValue] = React.useState<string[]>([])

    const [order, setOrder] = React.useState("desc")
    const [orderBy, setOrderBy] = React.useState("subVersion")

    const handleRequestSort = (event: React.BaseSyntheticEvent, property: "asc" | "desc") => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const [selected, setSelected] = React.useState(true)
    const handleSelect = () => {
        setSelected(!selected)
    }

    const options = createOptions(banners)

    React.useEffect(() => {
        setRows(filterBanners(banners, values, selected))
    }, [banners, values, selected])

    return (
        <Box>
            <Autocomplete
                multiple
                autoComplete
                options={options}
                getOptionLabel={(option: string) => option}
                filterSelectedOptions
                noOptionsText={type === "character" ? "No Characters" : "No Weapons"}
                value={values}
                onChange={(event: any, newValue: string[] | null) => {
                    setValue(newValue as string[])
                }}
                ChipProps={{
                    sx: {
                        color: `${theme.text.color}`,
                        fontFamily: `${theme.font.styled.family}`,
                        backgroundColor: `${theme.button.selected}`,
                        "& .MuiChip-deleteIcon": {
                            color: `${theme.text.color}`,
                            ":hover": {
                                color: `${theme.text.colorAlt}`
                            }
                        },
                    }
                }}
                ListboxProps={{
                    sx: { backgroundColor: `${theme.paper.backgroundColor}` }
                }}
                renderInput={(params) => (
                    <SearchBar params={params} placeholder={type === "character" ? "Characters" : "Weapons"} />
                )}
                renderOption={(props, option) => (
                    <CustomMenuItem
                        {...props}
                        key={option}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", p: 0, width: "100%" }}>
                            <img alt={option} src={`${process.env.REACT_APP_URL}/${URL}/${option.split(" ").join("_")}.png`} style={{ width: matches ? "42px" : "48px", marginRight: "20px" }} onError={ErrorLoadingImage} />
                            <Typography noWrap sx={{ fontFamily: `${theme.font.styled.family}`, fontSize: { xs: "14px", md: "16px" }, color: `${theme.text.color}` }}>
                                {option}
                            </Typography>
                        </Box>
                    </CustomMenuItem>
                )}
            />
            <Box sx={{ display: "flex", alignItems: "center", my: "10px" }}>
                <CustomSwitch checked={selected} onChange={handleSelect} sx={{ mt: "3px" }} />
                <Typography sx={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontSize: "13.5px" }}>
                    Toggle "AND" Filter
                </Typography>
                <CustomTooltip title="If toggled, will filter banners that only contain all selected items." arrow placement="top">
                    <HelpIcon sx={{ color: `${theme.text.color}`, cursor: "pointer", mx: "10px" }} />
                </CustomTooltip>
            </Box>
            <Paper
                sx={{
                    border: `2px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    backgroundColor: `${theme.paper.backgroundColor}`,
                    color: `${theme.text.color}`,
                    overflow: "hidden"
                }}
            >
                <TableContainer>
                    <Table sx={{ backgroundColor: `${theme.table.header.backgroundColor}` }}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody sx={{ backgroundColor: `${theme.paper.backgroundColor}` }}>
                            {
                                stableSort(rows, getComparator(order, orderBy))
                                    .map((row, index) => <BannerRow type={type} key={index} row={row as unknown as Banner} />)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default BannerList

const headCells = [
    { id: "subVersion", label: "Version" },
]

const filterBanners = (banners: Banner[], searchValue: string[], unique: boolean) => {
    if (searchValue.length > 0) {
        banners = banners.filter((banner: Banner) => {
            if (unique) {
                return searchValue.every((item) => banner.fiveStars.concat(banner.fourStars).includes(item))
            }
            else {
                return searchValue.some((item) => banner.fiveStars.concat(banner.fourStars).includes(item))
            }
        })
    }
    return banners
}

const createOptions = (banners: Banner[]) => {
    return [...new Set(banners
        .map((banner: Banner) => banner.fiveStars.concat(banner.fourStars))
        .flat().filter((item: string) => !isTBA(item))
        .sort((a: string, b: string) => a.localeCompare(b)))
    ]
}