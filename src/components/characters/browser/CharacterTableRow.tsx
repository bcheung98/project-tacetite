// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject } from "helpers/dates";
import { combineStyles } from "helpers/utils";

// Type imports
import { CharacterRow } from "./CharacterTable";
import RarityStars from "custom/RarityStars";

interface CharacterTableRowProps extends CharacterRow {
    releaseDate: string;
    version: string;
}

function CharacterTableRow({ row }: { row: CharacterTableRowProps }) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const columns = [
        {
            label: row.fullName,
            labelStyle: {
                cursor: "pointer",
                "&:hover": {
                    color: theme.text.selected,
                    textDecoration: "underline",
                },
            },
            img: `characters/icons/${row.name}`,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href: `/resonators/${row.name.split(" ").join("_").toLowerCase()}`,
        },
        {
            label: <RarityStars rarity={row.rarity} variant="h4-styled" />,
        },
        {
            label: row.element,
            img: `elements/${row.element}`,
        },
        {
            label: row.weapon,
            img: `weapons/icons/${row.weapon}`,
        },
        {
            label: `${
                createDateObject({ date: row.releaseDate, region: region }).date
            } (${row.version})`,
        },
    ];

    return (
        <StyledTableRow color="secondary" hover>
            {columns.map((col, index) => (
                <StyledTableCell key={index} sx={{ maxWidth: "275px" }}>
                    <FlexBox columnGap="16px">
                        {col.img && (
                            <RouterLink
                                to={col.href || ""}
                                sx={{
                                    cursor: col.href ? "pointer" : "default",
                                    userSelect: col.href
                                        ? "pointer"
                                        : "default",
                                }}
                            >
                                <Image
                                    src={col.img}
                                    alt={col.label}
                                    style={combineStyles(
                                        {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        col.imgStyle
                                    )}
                                />
                            </RouterLink>
                        )}
                        {col.label &&
                            (col.href ? (
                                <RouterLink
                                    to={col.href}
                                    sx={{
                                        cursor: "pointer",
                                        userSelect: "pointer",
                                    }}
                                >
                                    <TextStyled
                                        sx={combineStyles(
                                            { textAlign: "left" },
                                            col.labelStyle
                                        )}
                                    >
                                        {col.label}
                                    </TextStyled>
                                </RouterLink>
                            ) : (
                                <TextStyled
                                    sx={combineStyles(
                                        { textAlign: "left" },
                                        col.labelStyle
                                    )}
                                >
                                    {col.label}
                                </TextStyled>
                            ))}
                    </FlexBox>
                </StyledTableCell>
            ))}
        </StyledTableRow>
    );
}

export default CharacterTableRow;
