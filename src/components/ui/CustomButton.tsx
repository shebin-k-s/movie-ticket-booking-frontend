import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  onClick?: () => void;
  bgColor?: string;
  outlined?: boolean;
  to?: string;
  fullWidth?: boolean;
};

const CustomButton = ({ text, onClick, bgColor, outlined = false, to, fullWidth = false }: Props) => {
  const navigate = useNavigate();

  const baseClasses = `cursor-pointer rounded-md flex items-center justify-center w-28 h-9 text-white text-[1.07rem]`;
  const filledClasses = bgColor;
  const outlinedClasses = `border border-white bg-transparent text-white`;

  console.log("i am also");
  
  return (
    <div
      onClick={() => {
        if (to) navigate(to);
        if (onClick) onClick();
      }}
      className={`${baseClasses} ${fullWidth ? 'w-full' : ''} ${outlined ? outlinedClasses : filledClasses}`}
    >
      {text}
    </div>
  );
};

export default CustomButton;
