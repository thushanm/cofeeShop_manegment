import ItemCard from "../components/card/itemCard.tsx";
import {createRef, useEffect, useState} from "react";
import AddCoffee from "../components/layout/add/add.coffee.tsx";
import AddDessert from "../components/layout/add/add.dessert.tsx";
import axios from "axios";
import EmptyItem from "../components/component/empty/empty.item.tsx";

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
    price:number;
    qty: number;
    image: string;
}

const Item = (): JSX.Element => {

    const [coffeeState, setCoffeeState] = useState(true);
    const [dessertState, setDessertState] = useState(false);

    const [coffeeData, setCoffeeData] = useState<CoffeeData[]>([]);
    const [dessertData, setDessertData] = useState<DessertData[]>([]);
    const coffeeRef = createRef();
    const dessertRef = createRef();

    const setCardDataToRef = (data: CoffeeData | DessertData, cardType: string) => {

        if (cardType === "coffee"){
            // @ts-ignore
            coffeeRef?.current?.setCoffee(data);
            return;
        }
        // @ts-ignore
        dessertRef?.current?.setDessert(data);
    }

    const setCoffee = (coffee: CoffeeData) => {
        // @ts-ignore
        coffeeRef?.current?.setCoffee(coffee);
    }

    const setDessert = (dessert: DessertData) => {
        // @ts-ignore
        dessertRef?.current?.setDessert(dessert);
    }

    const fetchData = (): void => {

        console.log(coffeeState)
        if (coffeeState) {
            // 'http://localhost:8080/emplaoyee?size=100&page=1'
            axios.get('http://localhost:8080/coffee/getAll')
                .then(response => {
                    setCoffeeData(response.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            // 'http://localhost:8080/emplaoyee?size=100&page=1'
            axios.get('http://localhost:8080/dessert/getAll')
                .then(response => {
                    setDessertData(response.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        fetchData();
    }, [dessertState, coffeeState]);


    const changeButton = (event: any): void => {
        switch (event.target.innerText) {
            case 'Coffee':
                setCoffeeState(true);
                setDessertState(false);
                break;
            case 'Dessert':
                setCoffeeState(false);
                setDessertState(true);
                break;
        }
    }

    return (
        <section className={'w-full h-full bg-white flex'}>
            <div className={'w-[78%] h-full'}>
                <div className={'pl-10 py-4 font-Index tracking-wider'}>
                    <h1 className={'text-2xl font-bold text-[#3c3c3c]'}>Items</h1>
                    <h4 className={'text-[12px] text-gray-400'}>Good morning kasun. You have added new 4 items .</h4>
                </div>
                <div className={'w-full h-8 flex px-10 gap-2'}>
                    <button
                        onClick={changeButton}
                        type={'button'}
                        className={`w-20 h-10 cursor-pointer text-[13px] ${coffeeState ? 'bg-[#3C3C3C] text-white rounded-xl' : 'border-[1px] border-gray-300 rounded-[25px]'} 
                         font-round hover:rounded-xl transition-all ease-linear duration-200`}>Coffee
                    </button>
                    <button
                        onClick={changeButton}
                        type={'button'}
                        className={`w-20 h-10 cursor-pointer text-[13px] ${dessertState ? 'bg-[#3C3C3C] text-white rounded-xl' : 'border-[1px] border-gray-300 rounded-[25px]'} 
                         font-round hover:rounded-xl transition-all ease-linear duration-200`}>Dessert
                    </button>
                </div>
                <div
                    className={'w-full h-[80vh] flex flex-wrap mt-4 overflow-y-scroll px-10 pt-3 pb-12 bg-[#f6f6f6] border-t-[1px] border-gray-200'}>
                    {
                        coffeeState ?
                                coffeeData.length > 0 ? coffeeData.map(value => {
                                    return <ItemCard
                                        cardType={"coffee"}
                                        onLoadAction={fetchData}
                                        setCardData={setCardDataToRef}
                                        qty={value.qty}
                                        key={value._id}
                                        smallSize={value.smallSize}
                                        largeSize={value.largeSize}
                                        name={value.name}
                                        _id={value._id}
                                        desc={value.desc}
                                        image={`http://localhost:8080/images/${value.image}`}/>
                                })
                                    :
                                    <EmptyItem/>

                            :

                                dessertData.length > 0 ? dessertData.map(value => {
                                return <ItemCard
                                    cardType={"dessert"}
                                    onLoadAction={fetchData}
                                    setCardData={setCardDataToRef}
                                    qty={value.qty}
                                    key={value._id}
                                    size={value.size}
                                    price={value.price}
                                    name={value.name}
                                    _id={value._id}
                                    desc={value.desc}
                                    image={`http://localhost:8080/images/${value.image}`}/>
                            })
                                :
                                <EmptyItem/>
                    }
                </div>
            </div>

            <div className={'w-[22%] h-full border-l-2 border-gray-200 bg-white px-4 pt-20'}>
                {
                    coffeeState ? <AddCoffee ref={coffeeRef} onLoadAction={fetchData} onSetCoffee={setCoffee}/> :
                        <AddDessert ref={dessertRef} onLoadAction={fetchData} onSetDessert={setDessert}/>
                }
            </div>

        </section>
    );
}

export default Item;
