import React from "react";

// Component imports
import CharacterTableRow from "./CharacterTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Type imports
import { Character } from "types/character";

export type CharacterRow = Pick<
    Character,
    "id" | "name" | "fullName" | "rarity" | "element" | "weapon"
>;

function CharacterTable({ characters }: { characters: Character[] }) {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState("fullName");

    const handleRequestSort = (
        _: React.BaseSyntheticEvent,
        property: string
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "fullName", label: "Name" },
        { id: "rarity", label: "Rarity" },
        { id: "element", label: "Attribute" },
        { id: "weapon", label: "Weapon" },
        { id: "id", label: "Release Date" },
    ];

    const rows = characters.map((char) => ({
        id: char.id,
        name: char.name,
        fullName: char.fullName,
        rarity: char.rarity,
        element: char.element,
        weapon: char.weapon,
        releaseDate: char.release.date,
        version: char.release.version,
    }));

    return (
        <MainContentBox
            title={`${characters.length} ${
                characters.length === 1 ? "Agent" : "Agents"
            }`}
            contentProps={{ padding: 0 }}
        >
            <TableContainer>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {rows.sort(getComparator(order, orderBy)).map((row) => (
                            <CharacterTableRow key={row.fullName} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default CharacterTable;
