
interface Props {
    type: string;
    name: string;
    placeholder?: string;
    errorMsg: string | null;
    callBack: (event: string| number, name: string) => void;
    value:string | number;
}
const CustomInput = (props: Props): JSX.Element => {
    return (

        <div className={'relative'}>
            <div className={'row py-2 pr-2'}>
                <label className={'font-cde text-[11px] text-gray-400 py-0.5 px-0.5'}>
                    {props.name}
                </label>
                <input
                    value={props.value}
                    placeholder={props.placeholder}
                    type={props.type}
                    id={props.name}
                    onChange={(event) => {
                        props.callBack(event.target.value, props.name);
                    }}
                    className={'w-full py-2 capitalize placeholder:transition-all placeholder:duration-200 transition-all duration-200 rounded-[5px] border-[1px] border-gray-300 outline-none focus:border-[#ffa16c] focus:placeholder:pl-1 focus:shadow-[rgba(17,_17,_10,_0.1)_0px_0px_16px] font-round text-sm'}/>
                {
                    props.errorMsg &&
                    <div className={'absolute font-round text-[10px] text-red-500'}>{props.errorMsg}</div>
                }
            </div>
        </div>
    );
}

export default CustomInput;
