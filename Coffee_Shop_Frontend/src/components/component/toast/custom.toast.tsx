import {IoCheckmark, IoCloseOutline} from "react-icons/io5";
import {IoMdInformation} from "react-icons/io";

interface Props {
    title: string;
    message: string;
}

const CustomToast = (props: Props): JSX.Element => {
    return (
        <div
            className={`w-full px-2 py-3 flex items-center border-l-8 ${props.title === "Success" ? 'border-green-500' : props.title === "Error" ? 'border-red-500' : 'border-yellow-500'}`}>
            <div
                className={`w-11 aspect-square ${props.title === "Success" ? 'bg-green-100' : props.title === "Error" ? 'bg-red-100' : 'bg-yellow-200'} rounded-full flex justify-center items-center mr-3`}>
                {props.title === "Success" ? <IoCheckmark className={'text-green-500 text-lg'}/>
                    : props.title === "Error" ? <IoCloseOutline className={'text-red-500 text-lg'}/>
                        : <IoMdInformation  className={'text-yellow-600 text-[30px]'}/>
                }
            </div>
            <div>
                <h1 className={`text-xs my-1 ${props.title === "Success" ? 'text-green-500' : props.title === "Error" ? 'text-red-500' : 'text-yellow-500'}`}>{props.title}</h1>
                <h2 className={'text-[13px] text-gray-600 font-Robot tracking-wide'}>{props.message}</h2>
            </div>
        </div>
    );
}

export default CustomToast;
