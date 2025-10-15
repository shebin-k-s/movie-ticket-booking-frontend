import type { Screen } from "../../../features/movieDetail/movieDetailTypes";

type Props = {
    screen: Screen;
    selected?: boolean;
    onClick: () => void;
};

const ScreenCard = ({ screen, selected, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className={`border inline-flex flex-shrink-0 gap-2 items-center px-4 py-2 rounded-3xl cursor-pointer text-white
                        ${selected ? "bg-green-700" : ""}`}
        >
            <span className="font-medium">{screen.name}</span>
        </div>
    );
};

export default ScreenCard;
