import { useLocation } from "react-router-dom";
import SeatSelection from "../../Movie/components/SeatSelection";

interface LocationState {
    showId: string;
}

const SeatSelectionWrapper = () => {
    const location = useLocation();
    const showId = (location.state as LocationState)?.showId;


    if (!showId) return <div>No show selected</div>;

    return (
        <div className="flex items-center">

            <div className="mx-auto p-5 overflow-x-auto">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl w-min">

                    <SeatSelection showId={showId} />
                </div>
            </div>

        </div>

    )
};


export default SeatSelectionWrapper;
