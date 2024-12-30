// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack, useTheme } from "@mui/material";

// Helper imports
import { combineStyles } from "helpers/utils";

// Type imports
import { EchoRow } from "./EchoTable";
import { Rarity } from "types/_common";

interface EchoTableRowProps extends EchoRow {
    rarity: Rarity;
    sonataEffects: string;
}

function EchoTableRow({ row }: { row: EchoTableRowProps }) {
    const theme = useTheme();

    const columns = [
        {
            label: row.displayName,
            labelStyle: {
                cursor: "pointer",
                "&:hover": {
                    color: theme.text.selected,
                    textDecoration: "underline",
                },
            },
            img: `echoes/icons/${row.name}`,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href: `/echoes/${row.name.split(" ").join("_").toLowerCase()}`,
        },
        { label: row.code },
        { label: row.class },
        { label: row.cost },
        {
            img: row.sonataEffects
                .split("|")
                .map((sonata) => `echoes/sonata/${sonata}`),
        },
    ];

    return (
        <StyledTableRow color="secondary" hover>
            {columns.map((col, index) => (
                <StyledTableCell key={index}>
                    <FlexBox columnGap="16px">
                        {col.img &&
                            (col.href ? (
                                <RouterLink to={col.href}>
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
                            ) : Array.isArray(col.img) ? (
                                <Stack spacing={1} direction="row">
                                    {col.img.map((src, idx) => (
                                        <Image
                                            key={idx}
                                            src={src}
                                            alt={col.label}
                                            style={combineStyles(
                                                {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                col.imgStyle
                                            )}
                                            tooltip={src.split("/")[2]}
                                        />
                                    ))}
                                </Stack>
                            ) : (
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
                            ))}
                        {col.label &&
                            (col.href ? (
                                <RouterLink to={col.href}>
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

export default EchoTableRow;
