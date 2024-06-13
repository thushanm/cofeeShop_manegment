interface Props {
    icon: any;
    flag: boolean
    index: number;

    handleOption(index: number): void
}

const SidebarIcon = (props: Props): JSX.Element => {
    return (
        <div
            className={`w-12 aspect-square my-1.5 flex justify-center items-center text-white cursor-pointer 
            hover:rounded-2xl ${props.flag ? 'bg-[#FFA16C] rounded-2xl' : 'bg-gray-700 rounded-full'}`}
            onClick={() => props.handleOption(props.index)}>
            {props.icon}
        </div>
    );
}

export default SidebarIcon;


