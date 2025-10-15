import type { Show } from "../../../features/movieDetail/movieDetailTypes"

type Props = {
    show: Show,
    selected?: boolean,
    onClick: () => void
}

const TimeCard = ({ show, selected, onClick }: Props) => {

    const time = new Date(show.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return (
        <div
            onClick={onClick}
            className={`border flex flex-col flex-shrink-0 border-white gap-2 items-center px-4 py-2 rounded-lg cursor-pointer text-white
                        ${selected ? 'bg-green-700' : ''}`}>
            <span>{time}</span>
        </div>
    )
}

export default TimeCard