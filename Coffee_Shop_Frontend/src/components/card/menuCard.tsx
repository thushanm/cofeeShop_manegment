import {HiMinusSmall} from "react-icons/hi2";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {IoAdd} from "react-icons/io5";
import {animated, useSpring, useTransition} from "@react-spring/web";

interface CoffeeData {
    _id: string;
    name: string;
    desc: string;
    largeSize: number;
    smallSize: number;
    qty: number;
    image: string;
}

interface DessertData {
    _id: string;
    name: string;
    desc: string;
    size: number;
    price: number;
    qty: number;
    image: string;
}

interface CartData {
    _id: string;
    name: string;
    size: string | number;
    qty: number;
    image: string;
    total: number;
    unitPrice: number;
    maxQty: number;
}

interface Props {
    cardType: string;
    item: (CoffeeData | DessertData);

    addForCart(data: CartData): void;

    showNotification(title: string, message: string): void;
}

const MenuCard = (props: Props): JSX.Element => {

    const [selected, setSelected] = useState([false, false])
    const [qty, setQty] = useState(0);
    const [added, setAdded] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const setSelectedItem = (index: number) => {
        const newArr = [false, false];
        newArr[index] = true;
        setSelected(newArr);
        setQty(0);
        setAdded(false);
    }

    const handleAddItem = () => {

        if (props.cardType === "coffee" && ((!selected[0] || selected[1]) && (selected[0] || !selected[1]))) {
            props.showNotification("Error", `Please Select the ${props.item.name} size`);
            return;
        }
        if (qty === 0) {
            props.showNotification("Error", `Please Select the ${props.item.name} quantity`);
            return;
        }
        setAdded(!added);
        props.addForCart({
            _id: props.item._id,
            name: props.item.name,
            size: props.cardType === "coffee" ? selected[0] ? "Small" : "Large" : props.item?.size,
            qty: qty,
            image: props.item.image,
            total: props.cardType === "coffee" ? selected[0] ? (qty * props.item?.smallSize) : (qty * props.item?.largeSize) : eval(qty + props.item?.price),
            unitPrice: props.cardType === "coffee" ? selected[0] ? props.item?.smallSize : props.item?.largeSize : props.item.price,
            maxQty: props.item.qty
        });
    }


    const styles = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    });

    return (

        <animated.div style={styles}
                      className={'w-[330px] h-[215px] border-[1px] border-gray-200 bg-white rounded-[20px] m-2 flex shadow-[rgba(17,_17,_26,_0.05)_0px_0px_10px]'}>
            {/*pic div*/}
            <div className={'w-[35%] h-full p-2 '}>
                <div className={'w-full h-[70%] bg-gray-100 rounded-xl flex justify-center items-center'}>
                    <img src={`http://localhost:8080/images/${props.item.image}`} alt="image"/>
                </div>
                {/*button div*/}
                <div className={'w-full h-[30%] flex justify-center items-center'}>
                    <HiMinusSmall onClick={() => {
                        qty !== 0 && setQty(qty - 1);
                    }}
                                  className={`w-7 h-7 p-1.5 border-[1px] border-gray-200 rounded-full text-black hover:bg-gray-100 active:text-white active:bg-[#3c3c3c] cursor-pointer`}/>
                    <div className={'text-black mx-2 cursor-default'}>
                        {qty}
                    </div>
                    <IoAdd onClick={() => qty < props.item.qty && setQty(qty + 1)}
                           className={`w-7 h-7 p-1.5 ${qty === props.item.qty ? 'cursor-not-allowed bg-gray-500 text-white hover:bg-gray-500 active:bg-gray-500' : 'active:bg-[#3c3c3c]'} 
                        border-[1px] border-gray-200 rounded-full text-black hover:bg-gray-100 active:text-white cursor-pointer`}/>
                </div>
            </div>
            {/*content*/}
            <div className={'w-[65%] h-full py-4 px-3 '}>
                <div className={'w-full relative'}>
                    <h3 className={'text-[15px] text-gray-800 tracking-wide font-bold font-Index'}>{props.item.name}</h3>
                    <h3 className={'font-round absolute right-2 top-[-4px] text-[18px] text-[#FFA16C]'}>{
                        props.cardType === "coffee" ? props?.item?.largeSize : props.item.price
                    }
                        <span className={'pl-1 text-xs'}>USD</span>
                    </h3>
                </div>
                <p className={'text-gray-400 py-2 leading-1 text-[13px] font-Index'}>{props.item.desc} </p>

                {
                    props.cardType === "coffee" ?
                        <div className={'w-full flex items-center py-1'}>
                            <h3 className={'font-round mr-3 text-sm text-[#FFA16C]'}>Size</h3>
                            <button className={`px-3.5 py-1.5 border-[1px] font-Index rounded-2xl 
                            border-gray-200 text-[12px] ${!selected[0] && 'hover:bg-gray-100'} mr-1 
                            ${selected[0] ? 'bg-[#3c3c3c] text-white' : 'bg-none text-gray-500'}`}
                                    onClick={() => setSelectedItem(0)}>Small
                            </button>
                            <button className={`px-3.5 py-1.5 border-[1px] font-Index rounded-2xl 
                            border-gray-200 text-[12px] ${!selected[1] && 'hover:bg-gray-100'} mr-1 
                            ${selected[1] ? 'bg-[#3c3c3c] text-white' : 'bg-none text-gray-500'}`}
                                    onClick={() => setSelectedItem(1)}>Large
                            </button>
                        </div>
                        :
                        <div className={'w-full flex items-center py-1'}>
                            <h3 className={'font-round mr-3 text-sm text-[#FFA16C]'}>Size</h3>
                            <span className={`px-4 py-1.5 font-Index rounded-2xl text-[12px] 
                            mr-1 bg-[#3c3c3c] text-white`}>{props.item.size + " g"}
                            </span>
                        </div>
                }

                <button onClick={() => handleAddItem()}
                        className={`mt-2 w-full py-2 rounded-3xl font-Index text-[12px] font-[400] border-[1px] 
                    border-opacity-60 border-[#FFA16C] ${qty > 0 && 'active:bg-[#FFA16C] active:text-white'}  transition-all
                     duration-100 ease-linear ${added ? 'bg-[#FFA16C] text-white' : 'bg-white text-[#FFA16C]'}`}>{
                    added ? 'Added to Cart' : 'Add to Cart'
                }
                </button>
            </div>
        </animated.div>


    );
}

export default MenuCard;
