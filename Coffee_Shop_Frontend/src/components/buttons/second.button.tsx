interface Props {
    name: string;
    onclick: Function;
    bg_color: string | null;
    bg_hover: string;
    bg_active: string;
    br_color: string | null
}


const SecondButton = (props: Props): JSX.Element => {

    return (
        <button
            onClick={() => props.onclick}
            className={`w-full h-[40px] font-round text-sm bg-[${props.bg_color && props.bg_color}] ` +
                `border-[1px] border-[${props.br_color && props.br_color}]
            hover:bg-[${props.bg_hover}] ${props.bg_color && 'text-white'} rounded-full my-1 active:bg-[${props.bg_active}]`}>{props.name}
        </button>
    );
}

export default SecondButton;
