import {useEffect, useState} from "react";
import axios from "axios";
import HistoryTable from "../components/tables/history.table.tsx";
import TableColum from "../components/tables/colum/table.colum.tsx";

interface Data{
    _id:string;
    date:string;
    orderDetails: [];
}
const History = ():JSX.Element => {

    const [options, setOptions] = useState<boolean[]>([true, false, false])
    const [data, setData] = useState<Data[]>([]);
    const showMenu = (index:number) => {
        const array = [false, false, false];
        array[index] = true;
        setOptions(array);
    }

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {

        axios.get('http://localhost:8080/order/getAll')
            .then(response => {
                console.log(response.data)
                setData(response.data.data);

            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <section className={'w-full h-full bg-[#f6f6f6]'}>
            <div className={'pl-10 py-4 font-Index tracking-wider bg-white'}>
                <h1 className={'text-2xl font-bold text-[#3c3c3c]'}>You Order History</h1>
                <h4 className={'text-[12px] text-gray-400'}>Good morning kasun. You have placed 4 order's for now .</h4>
            </div>
            <div className={'flex w-full px-10 gap-2 bg-white'}>
                <div className={' px-4 w-fit pl-2 pr-3 py-2 rounded-xl font-Index text-[12px] text-gray-400 bg-green-100 '}>You have new 3 orders</div>
                <div className={' px-4 w-fit pl-2 pr-3 py-2 rounded-xl font-Index text-[12px] text-gray-400 bg-purple-100 '}>You last 3 orders</div>
            </div>
            <div className={'w-full h-14 pt-3 px-4 bg-white border-b-[1px] border-gray-200'}>
                <ul className={'w-full h-full flex pl-4 font-Index text-[13px] text-gray-400'}>
                    <li onClick={() => showMenu(0)}
                        className={`w-6 h-full flex items-center cursor-pointer justify-center mr-6 border-b-[3px] ${options[0] ? 'text-[#3c3c3c] border-[#3c3c3c]': 'border-white '}`}>All</li>
                    <li onClick={() => showMenu(1)}
                        className={`h-full flex items-center cursor-pointer justify-center mr-6 border-b-[3px] ${options[1] ? 'text-[#3c3c3c] border-[#3c3c3c]': 'border-white '}`}>Coffee</li>
                    <li onClick={() => showMenu(2)}
                        className={`h-full flex items-center cursor-pointer justify-center border-b-[3px] ${options[2] ? 'text-[#3c3c3c] border-[#3c3c3c]': 'border-white '}`}>Dessert</li>
                </ul>
            </div>
            <section className={'px-4 py-4'}>
                <div className={'w-[70%] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'}>
                    <HistoryTable/>
                    <div className={'h-[50vh] overflow-y-scroll bg-white'}>
                        {data.map((value:Data, index:number) => {
                            return <TableColum key={index} _id={value._id} date={value.date} orderDetails={value.orderDetails}>
                            </TableColum>
                        })}
                    </div>
                    <div className={'w-full h-12 bg-gray-500'}></div>
                </div>
            </section>
        </section>
    );
}

export default History;
