import React from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";
import { StyledMenuItem } from "styled/StyledMenu";
import { StyledSwitch } from "styled/StyledSwitch";
import { StyledTooltip } from "styled/StyledTooltip";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import {
    useTheme,
    Autocomplete,
    Card,
    IconButton,
    TableContainer,
    Table,
    TableBody,
    Stack,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import store from "rtk/store";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectCharacterBanners, selectWeaponBanners } from "reducers/banner";
import { isTBA } from "helpers/utils";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import { Banner } from "types/banner";
import BannerListRow from "./BannerListRow";

interface BannerListProps {
    type: "character" | "weapon";
}

function BannerList({ type }: BannerListProps) {
    const theme = useTheme();

    const banners =
        type === "character"
            ? useAppSelector(selectCharacterBanners)
            : useAppSelector(selectWeaponBanners);

    const characters = useAppSelector(selectCharacters);
    const weapons = useAppSelector(selectWeapons);

    const [rows, setRows] = React.useState<BannerRow[]>([]);

    const [values, setValue] = React.useState<BannerOption[]>([]);
    const options = createOptions(banners, type);

    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState("subVersion");

    const handleRequestSort = (
        _: React.BaseSyntheticEvent,
        property: string
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const [selected, setSelected] = React.useState(true);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const headColumns: HeadColumn[] = [{ id: "subVersion", label: "Version" }];

    const smallIconStyle = { width: "20px", height: "20px" };

    React.useEffect(() => {}, [characters, weapons]);

    React.useEffect(() => {
        setRows(createBannerRows(banners, values, selected));
    }, [banners, values, selected]);

    return (
        <>
            <Autocomplete
                multiple
                autoComplete
                filterSelectedOptions
                options={options}
                getOptionLabel={(option) => option.displayName}
                filterOptions={(options, { inputValue }) =>
                    options.filter(
                        (option) =>
                            option.name
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase()) ||
                            option.displayName
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase())
                    )
                }
                noOptionsText={
                    type === "character" ? "No Resonators" : "No Weapons"
                }
                value={values}
                isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                }
                onChange={(_: any, newValue: BannerOption[] | null) =>
                    setValue(newValue as BannerOption[])
                }
                renderInput={(params) => (
                    <SearchBar
                        params={params}
                        placeholder={
                            type === "character" ? "Resonators" : "Weapons"
                        }
                        inputIcon={
                            type === "character" ? (
                                <Image
                                    src="icons/Character"
                                    alt="Resonators"
                                    style={{
                                        width: "32px",
                                        marginLeft: "4px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor,
                                        borderRadius: "64px",
                                    }}
                                />
                            ) : (
                                <Image
                                    src="icons/Weapon"
                                    alt="Weapons"
                                    style={{
                                        width: "32px",
                                        marginLeft: "4px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor,
                                        borderRadius: "64px",
                                    }}
                                />
                            )
                        }
                    />
                )}
                renderOption={(props, option) => (
                    <StyledMenuItem
                        {...props}
                        key={option.displayName}
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.menu.hover,
                            },
                            "&:not(:last-child)": {
                                borderBottom: `1px solid ${theme.border.color.primary}`,
                            },
                        }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Stack spacing={1}>
                                {option.element && (
                                    <Image
                                        src={`elements/${option.element}`}
                                        alt={option.element}
                                        style={smallIconStyle}
                                        tooltip={option.element}
                                    />
                                )}
                                <Image
                                    src={`weapons/icons/${option.weaponType}`}
                                    alt={option.weaponType}
                                    style={smallIconStyle}
                                    tooltip={option.weaponType}
                                />
                            </Stack>
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <Image
                                    src={
                                        type === "character"
                                            ? `characters/icons/${option.name}`
                                            : `weapons/${option.name}`
                                    }
                                    alt={option.name}
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        border: `2px solid ${getRarityColor(
                                            option.rarity
                                        )}`,
                                        borderRadius:
                                            theme.mainContentBox.borderRadius,
                                        backgroundColor: theme.background(2),
                                        boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                            option.rarity
                                        )}`,
                                    }}
                                />
                                <TextStyled noWrap>
                                    {option.displayName}
                                </TextStyled>
                            </Stack>
                        </Stack>
                    </StyledMenuItem>
                )}
            />
            <FlexBox sx={{ my: "8px", height: "30px" }}>
                <StyledSwitch
                    checked={selected}
                    onChange={handleSelect}
                    sx={{ mt: "3px" }}
                />
                <TextStyled variant="body2-styled">
                    Toggle "AND" Filter
                </TextStyled>
                <StyledTooltip
                    title="If toggled, will filter banners that only contain all selected items."
                    arrow
                    placement="top"
                >
                    <IconButton disableRipple>
                        <HelpIcon />
                    </IconButton>
                </StyledTooltip>
            </FlexBox>
            <TableContainer component={Card} sx={{ width: "100%" }}>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {(rows as unknown as { [x: string]: string | number }[])
                            .sort(getComparator(order, orderBy))
                            .map((row, index) => (
                                <BannerListRow
                                    key={index}
                                    loading={
                                        [...characters, ...weapons].length === 0
                                    }
                                    type={type}
                                    row={row as unknown as BannerRow}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BannerList;

interface BannerOption {
    name: string;
    displayName: string;
    rarity: Rarity;
    element?: Element;
    weaponType: WeaponType;
}

function createOptions(banners: Banner[], type: "character" | "weapon") {
    const options = [
        ...new Set(
            banners
                .map((banner) => [...banner.fiveStars, ...banner.fourStars])
                .flat()
                .filter((item) => !isTBA(item))
                .sort((a, b) => a.localeCompare(b))
        ),
    ];
    const characters = store.getState().characters.characters;
    const weapons = store.getState().weapons.weapons;
    return options
        .map((option) => {
            if (type === "character") {
                const character = characters.find(
                    (char) => char.name === option
                );
                return {
                    name: character?.name || "TBA",
                    displayName: character?.fullName || "TBA",
                    rarity: character?.rarity || 1,
                    element: character?.element,
                    weaponType: character?.weapon,
                } as BannerOption;
            } else {
                const weapon = weapons.find((wep) => wep.name === option);
                return {
                    name: weapon?.name || "TBA",
                    displayName: weapon?.displayName || "TBA",
                    rarity: weapon?.rarity || 1,
                    weaponType: weapon?.type,
                } as BannerOption;
            }
        })
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export interface BannerRow {
    version: string;
    subVersion: string;
    start: string;
    end: string;
    fiveStars: string;
    fourStars: string;
}

function createBannerRows(
    banners: Banner[],
    searchValue: BannerOption[],
    unique: boolean
): BannerRow[] {
    if (searchValue.length > 0) {
        banners = banners.filter((banner) => {
            function filterFn(item: BannerOption) {
                return [...banner.fiveStars, ...banner.fourStars].includes(
                    item.name
                );
            }
            if (unique) {
                return searchValue.every(filterFn);
            } else {
                return searchValue.some(filterFn);
            }
        });
    }
    const rows = banners.map((banner) => ({
        version: banner.version,
        subVersion: banner.subVersion,
        start: banner.start,
        end: banner.end,
        fiveStars: JSON.stringify(banner.fiveStars),
        fourStars: JSON.stringify(banner.fourStars),
    }));
    return rows;
}
