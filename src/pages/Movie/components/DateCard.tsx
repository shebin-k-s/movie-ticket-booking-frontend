
type Props = {
    date: string;
    selected?: boolean;
    onClick?: () => void;
}

const DateCard = ({ date, selected = false, onClick }: Props) => {
    const day = new Date(date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
    const weekday = new Date(date).toLocaleDateString(undefined, { weekday: 'short' });

    return (
        <div
            onClick={onClick}
            className={`flex flex-col flex-shrink-0 gap-2 items-center px-6 py-2 border-1 border-white rounded-lg cursor-pointer text-white
                        ${selected ? 'bg-green-700' : ''}`}
        >
            <span className="font-medium">{day}</span>
            <span className="font-bold text-lg">{weekday}</span>
        </div>
    )
}

export default DateCard;
