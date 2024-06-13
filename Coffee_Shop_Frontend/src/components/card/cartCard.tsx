import {HiMinusSmall} from "react-icons/hi2";
import {IoAdd} from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import {useSpring, animated} from "@react-spring/web";

interface Props {
    _id: string;
    name: string;
    size:string | number;
    qty: number;
    image: string;
    total:number;
    maxQty:number;
    editQty(qty:number, option:string, _id:string, size:string | number):void;
}


const CartCard = (props:Props):JSX.Element => {

    const styles = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    });

    return (
        <animated.div style={styles} className={'w-full h-[20vh] flex py-4 border-b-[1px] border-gray-200'}>
            <div className={'w-[30%] h-full bg-gray-100 rounded-xl flex justify-center items-center'}>
                <img src={`http://localhost:8080/images/${props.image}`} alt={"image"}/>
            </div>
            <div className={'w-[60%] h-full px-5 tracking-wide font-Robot justify-center items-center'}>
                <h1 className={'text-gray-700 tracking-wide'}>{props.name}</h1>
                <h3 className={'text-[12px] text-gray-400'}>{props.size}</h3>
                <div className={'w-full flex mt-5 font-Robot'}>
                    <h1 className={'flex min-w-24 items-center pr-6 text-gray-500'}>{props.total}<span className={'pl-2 text-xs text-gray-400'}>USD</span></h1>
                    <div className={'w-full h-[30%] flex justify-center items-center'}>
                        {
                            props.qty === 1 ? <AiOutlineDelete onClick={() => props.editQty(0, "Delete", props._id, props.size)}
                                    className={`w-7 h-7 rounded-full bg-red-100 text-red-500 text-xs p-1.5 cursor-pointer`}/>
                                :
                                <HiMinusSmall onClick={() => props.editQty(props.qty, "Div", props._id, props.size)} className={`w-7 h-7 p-1.5 border-[1px] border-gray-200 rounded-full text-black hover:bg-gray-100 active:text-white active:bg-[#3c3c3c] cursor-pointer`}/>
                        }


                        <div className={'text-black mx-2 cursor-default'}>
                            {props.qty}
                        </div>
                        <IoAdd onClick={() => props.editQty(props.qty, "Add", props._id, props.size)}
                               className={`w-7 h-7 p-1.5 ${props.qty === props.maxQty ? 'cursor-not-allowed bg-gray-500 text-white hover:bg-gray-500 active:bg-gray-500' : 'active:bg-[#3c3c3c]'} 
                        border-[1px] border-gray-200 rounded-full text-black hover:bg-gray-100 active:text-white cursor-pointer`}/>
                    </div>
                </div>
            </div>
        </animated.div>
    );
}

export default CartCard;
