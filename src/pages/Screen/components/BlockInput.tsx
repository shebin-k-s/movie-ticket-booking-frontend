import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import type { Block } from "./types";

type Props = {
    index: number;
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
};

const BlockInput: React.FC<Props> = ({  index, setBlocks }) => {

    const [blockName, setBlockName] = useState("");
    const [priceAdjustment, setPriceAdjustment] = useState("");
    const [rows, setRows] = useState("");
    const [cols, setCols] = useState("");


    useEffect(() => {
        setBlocks((prev) =>
            prev.map((b, idx) =>
                idx === index
                    ? {
                        ...b,
                        blockName,
                        priceAdjustment: priceAdjustment ? Number(priceAdjustment) : 0,
                        rows: rows ? Math.max(1, Number(rows)) : 1,
                        cols: cols ? Math.max(1, Number(cols)) : 1,
                        layout: b.layout || [],
                    }
                    : b
            )
        );
    }, [blockName, priceAdjustment, rows, cols, index, setBlocks]);

    return (
        <div className="border p-4 rounded mb-6 bg-gray-900 text-white">
            <h3 className="mb-2 font-semibold">Block {index + 1}</h3>

            <InputField
                value={blockName}
                placeholder="Block Name"
                label="Block Name"
                onChange={setBlockName}
            />

            <InputField
                value={priceAdjustment}
                type="number"
                placeholder="Price Adjustment"
                label="Price Adjustment"
                min={0}
                onChange={setPriceAdjustment}
            />

            <InputField
                value={rows}
                type="number"
                placeholder="Rows"
                label="Number of Rows"
                min={1}
                onChange={setRows}
            />

            <InputField
                value={cols}
                type="number"
                placeholder="Columns"
                label="Number of Columns"
                min={1}
                onChange={setCols}
            />
        </div>
    );
};

export default BlockInput;
