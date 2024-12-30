import React from "react";

// Component imports
import EchoTableRow from "./EchoTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Helper imports
import { echoes as echoData } from "data/common";

// Type imports
import { Echo } from "types/echo";

export type EchoRow = Pick<
    Echo,
    "id" | "name" | "displayName" | "code" | "class" | "cost"
>;

function EchoTable({ echoes }: { echoes: Echo[] }) {
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState("rarity");

    const handleRequestSort = (
        _: React.BaseSyntheticEvent,
        property: string
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "displayName", label: "Name" },
        { id: "code", label: "Code" },
        { id: "rarity", label: "Class" },
        { id: "cost", label: "Cost" },
        { id: "sonataEffects", label: "Sonata Effect" },
    ];

    const rows = echoes.map((echo) => {
        return {
            id: echo.id,
            name: echo.name,
            displayName: echo.displayName,
            code: echo.code,
            class: echo.class,
            rarity: echoData[echo.class].rarity,
            cost: echo.cost,
            sonataEffects: echo.sonata.join("|"),
        };
    });

    return (
        <MainContentBox
            title={`${echoes.length} ${
                echoes.length === 1 ? "Echo" : "Echoes"
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
                            <EchoTableRow key={row.displayName} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default EchoTable;
