interface Props{
    color:string;
    text:string;
    value:string;
    icon:any;
}

const RevenueCard = (props:Props):JSX.Element => {
    return (
        <div className={'w-40 min-h-28 flex items-center justify-center'}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${props.color}`}>{props.icon}</div>
            <div className={'flex flex-col px-3'}>
                <div className={'text-lg font-[500] text-gray-600'}>{props.value}</div>
                <div className={'text-xs text-gray-400'}>{props.text}</div>
            </div>
        </div>
    );
}

export default RevenueCard;
