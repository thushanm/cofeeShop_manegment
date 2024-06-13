import MenuCard from "../components/card/menuCard.tsx";
import React, {createRef, useEffect, useState} from "react";
import axios from "axios";
import EmptyOrderItem from "../components/component/empty/empty.order.item.tsx";
import AddOrder from "../components/layout/add/add.order.tsx";
import {toast, ToastContainer} from "react-toastify";
import * as ToastUtil from "../util/toastUtil.tsx";
import { animated, useSpring } from '@react-spring/web'



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
    size:string | number;
    qty: number;
    image: string;
    total:number;
    maxQty:number;
}

const Menu = (): JSX.Element => {


    const [options, setOptions] = useState<boolean[]>([true, false, false]);
    const [coffeeData, setCoffeeData] = useState<CoffeeData[]>([]);
    const [dessertData, setDessertData] = useState<DessertData[]>([]);
    const [allArray, setAllArray] = useState<(DessertData | CoffeeData) []>([]);
    const orderCartRef = createRef();
    const toastId = React.useRef<any>(null);

    const fetchData = (): void => {

        if (options[1]) {
            handleGetCoffeeData();
            return;
        }
        if (options[2]) {
            handleGetDessertData();
        }
    }

    const handleGetCoffeeData = () => {

        // 'http://localhost:8080/emplaoyee?size=100&page=1'
        axios.get('http://localhost:8080/coffee/getAll')
            .then(response => {
                setCoffeeData(response.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleGetDessertData = () => {

        // 'http://localhost:8080/emplaoyee?size=100&page=1'
        axios.get('http://localhost:8080/dessert/getAll')
            .then(response => {
                setDessertData(response.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        handleGetCoffeeData();
        handleGetDessertData();
    }, []);

    useEffect(() => {
        setAllArray([...coffeeData, ...dessertData]);
    }, [coffeeData]);

    useEffect(() => {
        fetchData();
    }, [options]);

    useEffect(() => {
        if (options[0]) {
            setAllArray([...coffeeData, ...dessertData]);
        }
    }, [options[0]]);

    const showMenu = (index: number) => {
        const array = [false, false, false];
        array[index] = true;
        setOptions(array);
    }

    const addItemForCart = (data:CartData) => {
        orderCartRef?.current?.setData(data);
    }

    const showNotify = (title:string, message:string) => {
        console.log(title, message);
        toast.dismiss(toastId.current);
        toastId.current = ToastUtil.error(title, message);
    }



    return (
        <section className={'w-full h-full flex bg-white'}>
            {/*Menu*/}
            <div className={'w-[78%] h-full '}>
                <div className={'pl-10 py-4 font-Index tracking-wider'}>
                    <h1 className={'text-2xl font-bold text-[#3c3c3c]'}>Orders</h1>
                    <h4 className={'text-[12px] text-gray-400'}>Good morning kasun. You 4 pending orders .</h4>
                </div>
                {/*nav*/}
                <div className={'w-full h-10 px-10'}>
                    <ul className={'w-full h-full flex font-Index text-[13px] text-gray-400 gap-2'}>
                        <li onClick={() => showMenu(0)}
                            className={`w-20 h-9 flex justify-center items-center cursor-pointer transition-all 
                            ease-linear duration-200 hover:rounded-xl 
                            ${options[0] ? 'text-white bg-[#3c3c3c] rounded-xl' : 'rounded-[25px] border-[1px] border-gray-300'}`}>All
                        </li>
                        <li onClick={() => showMenu(1)}
                            className={`w-20 h-9 flex justify-center items-center cursor-pointer transition-all 
                            ease-linear duration-200 hover:rounded-xl 
                            ${options[1] ? 'text-white bg-[#3c3c3c] rounded-xl' : 'rounded-[25px] border-[1px] border-gray-300'}`}>Coffee
                        </li>
                        <li onClick={() => showMenu(2)}
                            className={`w-20 h-9 flex justify-center items-center cursor-pointer transition-all 
                            ease-linear duration-200 hover:rounded-xl 
                            ${options[2] ? 'text-white bg-[#3c3c3c] rounded-xl' : 'rounded-[25px] border-[1px] border-gray-300'}`}>Dessert
                        </li>
                    </ul>
                </div>

                {/*cards*/}

                <div className={'w-full h-[80vh] flex flex-wrap mt-4  px-4 overflow-y-scroll justify-center pt-3 pb-12 bg-[#f6f6f6] border-t-[1px] border-gray-200'}>
                    <ToastContainer toastClassName={"toast-class"} bodyClassName={"toast-body"}/>
                    {
                        options[1] ?
                            coffeeData.length > 0 ?
                                coffeeData.map(value => {
                                    return <MenuCard
                                        cardType={"coffee"}
                                        key={value._id}
                                        item={value}
                                        addForCart={addItemForCart}
                                        showNotification={showNotify}
                                    />
                                })
                                :
                                <EmptyOrderItem/>
                            :
                            options[2] ?
                                dessertData.length > 0 ?
                                    dessertData.map(value => {
                                        return <MenuCard
                                            cardType={"dessert"}
                                            key={value._id}
                                            item={value}
                                            addForCart={addItemForCart}
                                            showNotification={showNotify}
                                        />
                                    })
                                    :
                                    <EmptyOrderItem/>
                                :
                                allArray.length > 0 ?
                                    allArray.map((value: (CoffeeData | DessertData), index: number) => {
                                        return <MenuCard
                                            cardType={index < coffeeData.length ? "coffee" : "dessert"}
                                            key={value._id}
                                            item={value}
                                            addForCart={addItemForCart}
                                            showNotification={showNotify}
                                        />
                                    })
                                    :
                                    <EmptyOrderItem/>
                    }
                </div>
            </div>

            {/*Cart*/}
            <div className={'w-[22%] h-full border-l-2 bg-white border-gray-200 px-4 pt-24'}>
                <AddOrder ref={orderCartRef} showNotify={showNotify} resetOption={setOptions} selected={options}/>
            </div>
        </section>
    );
}

export default Menu;
