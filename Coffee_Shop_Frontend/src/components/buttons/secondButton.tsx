interface customButtonProps {
    text: string;
    bg_color: string;
    is_active: boolean;
    onClick: Function;
}

const SecondButton = (props: customButtonProps): JSX.Element => {

    return (
         <button
             onClick={ event => props.onClick(event)}
             type={'button'}
             className={`text-[13px] bg-white bg-[${props.bg_color}]
             font-normal mx-1 px-4 text-center py-1.5 font-round rounded-3xl
             hover:${!props.is_active && 'bg-gray-200'} active:border-gray-300
             active:${!props.is_active && 'bg-gray-300'} cursor-default text-${props.is_active ? 'white': 'gray-500'} border-[1px] border-gray-300 my-2`}>
             {props.text}
         </button>
    );
}

export default SecondButton;
