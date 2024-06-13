import moment from 'moment';
import {FiMoreVertical} from "react-icons/fi";
import {TiDocumentText} from "react-icons/ti";
import {useEffect, useRef, useState} from "react";

interface Props {
    _id: string;
    date: string;
    orderDetails: [];
}

interface Obj {
    image: string;
    name: string;
    productId: string;
    qty: number;
    size: string;
    total: number;
    _id: string;
}

const getQty = (array:Obj[]) => {
    let tot: number = 0;
    array.map(value => {
        tot += value.qty;
    });
    return tot;
}

const getTotal = (array:Obj[]) => {
    let tot: number = 0;
    array.map(value => {
        tot += value.total;
    });
    return tot;
}
const TableColum = (props: Props): JSX.Element => {

    const [openOption, setOpenOption] = useState(false);
    const iconRef = useRef();

    const handleWindowClick = (e: any): void => {
        if (openOption) {
            if (iconRef.current && !iconRef.current.contains(e.target)) {
                setOpenOption(false);
            }
        }
    }
    window.addEventListener('click', handleWindowClick);

    return (
        <div className={'relative w-full h-14 border-b-[1px] border-gray-200 flex items-center text-sm text-gray-500'}>
            <div className={'pl-8 w-48'}>{props._id}</div>
            <div className={'w-56'}>{moment(props.date).format('MMMM D, YYYY h:mm:ss A')}</div>
            <div className={'pl-6 w-40'}>{getQty(props.orderDetails)}</div>
            <div className={'pl-2 w-40 text-xs'}>{"USD "+getTotal(props.orderDetails)}</div>
            <div className={'w-40 flex items-center'}>
                {props._id.endsWith('1') ?
                        <div className={'px-2 font-Robot font-[400] rounded-lg bg-green-100 text-green-600 text-xs'}>Credit Payment</div> :
                    <div className={'px-2 font-Robot font-[400] rounded-lg bg-red-100 text-red-600 text-xs'}>Card Payment</div>
                }
            </div>
            <div ref={iconRef} className={'w-12'}><FiMoreVertical
                onClick={() => setOpenOption(!openOption)}
                className={`text-sm text-gray-500 cursor-pointer active:bg-gray-100 rounded-full w-6 h-6 px-1`}/>
            </div>
            <div className={`${openOption && 'opacity-100'} z-50 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] opacity-0 transition-all w-28 h-14 rounded-md absolute right-[110px] py-1 top-6 flex items-center border-[1px] border-gray-200 bg-white`}>
                <span className={'w-full py-2 text-gray-400 flex items-center gap-1 justify-center hover:bg-[#FFA16C] hover:bg-opacity-10 hover:text-[#FFA16C] hover:cursor-pointer'}>
                    <TiDocumentText className="text-lg"/><h4>Details</h4></span>
            </div>
        </div>
    );
}

export default TableColum;
