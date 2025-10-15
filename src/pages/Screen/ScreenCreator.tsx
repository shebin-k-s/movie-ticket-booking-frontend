import { useState } from "react";
import BlockInput from "./components/BlockInput";
import SeatMap from "./components/SeatMap";
import InputField from "./components/InputField";
import type { Block, Row, Seat } from "./components/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import { showToast } from "../../utils/showToast";
import { ScreenApi } from "../../api/endpoints/screenApi";
import LoadingButton from "../booking/components/LoadingButton";

const ScreenCreator = () => {
    const [screenName, setScreenName] = useState("");
    const [numBlocks, setNumBlocks] = useState(0);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState(false);

    const { theater } = useAppSelector((state) => state.auth);

    const handleNumBlocksChange = (num: number) => {
        setNumBlocks(num);
        setBlocks(
            Array.from({ length: num }, () => ({
                blockName: "",
                priceAdjustment: 0,
                rows: 1,
                cols: 1,
                layout: [],
            }))
        );
    };

    const validateBlocks = (): boolean => {
        for (let i = 0; i < blocks.length; i++) {
            const { blockName, rows, cols, layout } = blocks[i];
            if (!blockName.trim()) {
                showToast(`Please enter a name for Block ${i + 1}`, "info");
                return false;
            }
            if (!rows || rows < 1) {
                showToast(`Please enter valid rows for Block ${i + 1}`, "info");
                return false;
            }
            if (!cols || cols < 1) {
                showToast(`Please enter valid columns for Block ${i + 1}`, "info");
                return false;
            }
            if (!layout || layout.length === 0) {
                showToast(`Please generate layout for Block ${i + 1}`, "info");
                return false;
            }
            const hasSelectedSeat = layout.some((row) =>
                row.seats.some((seat) => seat.selected)
            );
            if (!hasSelectedSeat) {
                showToast(`Please select at least one seat in Block ${i + 1}`, "info");
                return false;
            }
        }
        return true;
    };

    const generateAllLayouts = () => {
        if (!screenName.trim()) {
            showToast("Please enter the screen name!", "info");
            return;
        }
        let globalRowIndex = 0;
        const updatedBlocks = blocks.map((block) => {
            const rows: Row[] = [];
            for (let i = 0; i < block.rows; i++) {
                const seats: Seat[] = Array.from({ length: block.cols }, (_, j) => ({
                    number: j + 1,
                    x: j,
                    y: globalRowIndex,
                    selected: false,
                }));
                rows.push({ row: `row${globalRowIndex}`, seats });
                globalRowIndex++;
            }
            return { ...block, layout: rows };
        });

        setBlocks(updatedBlocks);
    };

    const toggleSeatSelection = (blockIndex: number, rowLabel: string, seatNumber: number) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((b, bIdx) => {
                if (bIdx !== blockIndex) return b;
                return {
                    ...b,
                    layout: b.layout.map((row) =>
                        row.row === rowLabel
                            ? {
                                ...row,
                                seats: row.seats.map((seat) =>
                                    seat.number === seatNumber
                                        ? { ...seat, selected: !seat.selected }
                                        : seat
                                ),
                            }
                            : row
                    ),
                };
            })
        );
    };

    const toggleRowSelection = (blockIndex: number, rowLabel: string) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((b, bIdx) => {
                if (bIdx !== blockIndex) return b;
                return {
                    ...b,
                    layout: b.layout.map((row) =>
                        row.row === rowLabel
                            ? {
                                ...row,
                                seats: row.seats.map((seat) => ({
                                    ...seat,
                                    selected: !row.seats.every((s) => s.selected),
                                })),
                            }
                            : row
                    ),
                };
            })
        );
    };

    const toggleColumnSelection = (blockIndex: number, colNumber: number) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((b, bIdx) => {
                if (bIdx !== blockIndex) return b;

                const allSelected = b.layout.every((row) =>
                    row.seats.some((seat) => seat.number === colNumber && !seat.selected) === false
                );

                return {
                    ...b,
                    layout: b.layout.map((row) => ({
                        ...row,
                        seats: row.seats.map((seat) =>
                            seat.number === colNumber
                                ? { ...seat, selected: !allSelected }
                                : seat
                        ),
                    })),
                };
            })
        );
    };

    const handleSubmit = async () => {
        if (!screenName.trim()) {
            showToast("Please enter the screen name!", "info");
            return;
        }
        if (!theater || !theater.theaterId) {
            showToast("Theater information is missing. Please select a theater!", "error");
            return;
        }
        if (!validateBlocks()) return;

        setLoading(true);

        try {
            let globalRowLetterIndex = 0;
            const formattedBlocks = blocks.map(({ blockName, priceAdjustment, layout }) => {
                const formattedLayout: Row[] = [];
                layout.forEach((row) => {
                    const selectedSeats = row.seats.filter((s) => s.selected);
                    if (selectedSeats.length === 0) return;

                    const rowLetter = String.fromCharCode(65 + globalRowLetterIndex++);
                    const seatsWithLabels = selectedSeats.map((seat, seatIndex) => ({
                        number: seatIndex + 1,
                        x: seat.x,
                        y: seat.y,
                    }));

                    formattedLayout.push({ row: rowLetter, seats: seatsWithLabels });
                });

                return { blockName, priceAdjustment, layout: formattedLayout };
            });

            const payload = {
                name: screenName,
                theaterId: theater.theaterId,
                seatMap: formattedBlocks,
            };

            console.log(payload);

            await ScreenApi.createScreen(payload);

            showToast("Screen saved successfully!", "success");

            setScreenName("");
            setNumBlocks(0);
            setBlocks([]);
        } catch (error: any) {
            console.error(error);
            showToast(error?.message || "Failed to create screen", "error");
        } finally {
            setLoading(false);
        }
    };

    const getStartingRowLetterIndexes = (): number[] => {
        const indexes: number[] = [];
        let previousLetters = 0;

        for (const block of blocks) {
            indexes.push(previousLetters);

            const selectedRows = block.layout.filter((row) =>
                row.seats.some((seat) => seat.selected)
            ).length;

            previousLetters += selectedRows;
        }

        return indexes;
    };

    const startingRowLetterIndexes = getStartingRowLetterIndexes();


    const getTotalSeats = () => {
        return blocks.reduce((total, block) => {
            const selectedSeats = block.layout.reduce((sum, row) => {
                return sum + row.seats.filter(seat => seat.selected).length;
            }, 0);
            return total + selectedSeats;
        }, 0);
    };

    return (
        <div>
            <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
                {/* Basic Info Card */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <h2 className=" text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                            Create New Screen
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg ml-15">Design your screen layout and seat configuration</p>
                </div>

                {/* Basic Info Form */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            value={screenName}
                            placeholder="e.g., Screen 1, IMAX Hall, 4DX Screen"
                            label="Screen Name"
                            onChange={setScreenName}
                        />
                        <InputField
                            type="number"
                            value={numBlocks === 0 ? "" : numBlocks.toString()}
                            placeholder="How many seating sections?"
                            label="Number of Blocks"
                            onChange={(val) => {
                                const parsed = Number(val);
                                if (!isNaN(parsed) && parsed >= 0) handleNumBlocksChange(parsed);
                            }}
                        />
                    </div>

                    {/* Stats Row */}
                    {blocks.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-700/50 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-gray-700/30 rounded-xl px-4 py-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-300 font-medium">{blocks.length} Block{blocks.length !== 1 ? 's' : ''} Configured</span>
                            </div>
                            {getTotalSeats() > 0 && (
                                <div className="flex items-center gap-2 bg-gray-700/30 rounded-xl px-4 py-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-300 font-medium">{getTotalSeats()} Total Seats Selected</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Block Configuration */}
                {blocks.length > 0 && (
                    <div className="mb-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                            <h3 className="text-2xl font-bold text-white">Block Configuration</h3>
                        </div>

                        {blocks.map((_, i) => (
                            <BlockInput key={i} index={i} setBlocks={setBlocks} />
                        ))}
                    </div>
                )}

                {/* Generate Layout Button */}
                {blocks.length > 0 && (
                    <div className="mb-8 flex justify-center">
                        <button
                            onClick={generateAllLayouts}
                            disabled={numBlocks === 0}
                            className="group relative bg-gradient-to-r from-indigo-600  to-blue-600 hover:from-blue-500  hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-blue-900/50 transition-all duration-300 flex items-center gap-3 transform hover:scale-103 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                            <span className="relative z-10">Generate All Block Layouts</span>
                        </button>
                    </div>
                )}

                {/* Seat Maps */}
                {blocks.some(block => block.layout.length > 0) && (
                    <div className="space-y-8 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                            <h3 className="text-2xl font-bold text-white">Seat Layout Designer</h3>
                        </div>

                        {blocks.map((block, i) => {
                            if (block.layout.length === 0) return null;

                            const startingRowLetterIndex = startingRowLetterIndexes[i];

                            const allSelected = block.layout.every((row) =>
                                row.seats.every((seat) => seat.selected)
                            );

                            const selectedCount = block.layout.reduce((sum, row) => {
                                return sum + row.seats.filter(seat => seat.selected).length;
                            }, 0);

                            const totalCount = block.layout.reduce((sum, row) => {
                                return sum + row.seats.length;
                            }, 0);

                            const toggleBlockSelection = () => {
                                setBlocks((prevBlocks) =>
                                    prevBlocks.map((b, bIdx) => {
                                        if (bIdx !== i) return b;

                                        return {
                                            ...b,
                                            layout: b.layout.map((row) => ({
                                                ...row,
                                                seats: row.seats.map((seat) => ({
                                                    ...seat,
                                                    selected: !allSelected,
                                                })),
                                            })),
                                        };
                                    })
                                );
                            };

                            return (
                                <div key={i} className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-2xl">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                                                    <span className="text-emerald-400 font-bold text-lg">{String.fromCharCode(65 + i)}</span>
                                                </div>
                                                <h3 className="text-white font-bold text-2xl">
                                                    {block.blockName || `Block ${i + 1}`}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-3 ml-13">
                                                <span className="text-gray-400 text-sm">
                                                    {selectedCount} / {totalCount} seats selected
                                                </span>
                                                {block.priceAdjustment !== 0 && (
                                                    <span className={`text-sm font-semibold ${block.priceAdjustment > 0 ? 'text-green-400' : 'text-orange-400'}`}>
                                                        {block.priceAdjustment > 0 ? '+' : ''}₹{block.priceAdjustment}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={toggleBlockSelection}
                                            className="cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-900/50 flex items-center gap-2 transform hover:scale-105"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {allSelected ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                )}
                                            </svg>
                                            {allSelected ? "Deselect All" : "Select All"}
                                        </button>
                                    </div>

                                    {/* Screen Indicator */}
                                    <div className="mb-6 flex flex-col items-center">
                                        <div className="w-full max-w-3xl h-3 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-full mb-2 shadow-lg"></div>
                                        <span className="text-gray-400 text-sm font-medium">SCREEN</span>
                                    </div>

                                    <SeatMap
                                        block={block}
                                        bIdx={i}
                                        toggleSeatSelection={toggleSeatSelection}
                                        toggleRowSelection={toggleRowSelection}
                                        toggleColumnSelection={toggleColumnSelection}
                                        startingRowLetterIndex={startingRowLetterIndex}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Submit Button */}
                {blocks.some(block => block.layout.length > 0) && (
                    <div className="flex justify-center items-center">
                        <LoadingButton
                            text="Create Screen"
                            loadingText="Creating Screen..."
                            loading={loading}
                            onClick={handleSubmit}
                            disabled={loading}
                            color="green"
                        />

                    </div>
                )}
            </div>
        </div>
    );
};

export default ScreenCreator;
