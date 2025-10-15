import locationImg from '../../../assets/location.png'
import type { Theater } from '../../../features/movieDetail/movieDetailTypes'

type Props = {
    theater: Theater;
    onClick: () => void;
    selected?: boolean;
}

const TheaterCard = ({ theater, onClick, selected }: Props) => {
    return (
        <div
            onClick={onClick}

            className={`border inline-flex flex-shrink-0 gap-2 items-center px-4 py-2 rounded-3xl border-white cursor-pointer
                        ${selected ? 'bg-green-700' : ''}`}>
            <img
                src={locationImg}
                alt="location-img"
                className="w-6 h-6 object-contain"
            />
            <span className="text-white font-medium">{theater.name}</span>
        </div>
    )
}

export default TheaterCard