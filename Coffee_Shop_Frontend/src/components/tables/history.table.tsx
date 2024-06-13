import {useState} from "react";

const HistoryTable = ():JSX.Element => {

    const [headers, setHeaders] = useState(['ID', 'Date', 'QTY', 'Total', 'Status', 'Action']);

    return (
        <section className={'w-full'}>
            <div className={'px-4 h-16 flex items-center text-xl border-[1px] rounded-tl-xl rounded-tr-xl bg-white border-gray-300 font-cde text-gray-500'}>
                <h1>You recent orders</h1>
            </div>
            <div className={'w-full bg-[#2c2c2c] flex gap-3 bg-opacity-5 h-10 border-[1px] border-gray-200'}>
                {
                    headers.map(value => {
                        return <div className={`${value == 'Date' ? 'w-[380px]' : 'w-56'} flex items-center pl-8 uppercase text-gray-500 font-[500] text-[13px]`}>
                            <h3>{value}</h3>
                        </div>
                    })
                }
            </div>
        </section>
    );
}

export default HistoryTable;
