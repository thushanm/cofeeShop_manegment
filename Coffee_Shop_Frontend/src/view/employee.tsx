import EmployeeCard from "../components/card/employeeCard.tsx";
import {createRef, useEffect, useState} from "react";

import axios from "axios";
import {GrNext} from "react-icons/gr";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import Search from "../components/search/search.tsx";
import AddEmployee from "../components/layout/add/add.employee.tsx";


interface Data {
    _id: string;
    name: string;
    email: string;
    address: string;
    age: number;
    contact: string;
    image: string;
}

const Employee = (): JSX.Element => {

    const [data, setData] = useState<Data[]>([]);
    const addEmployeeRef = createRef();


    const handleSetEmployee = (employee: Data) => {
        // @ts-ignore
        addEmployeeRef?.current?.setEmployee(employee);
    }


    const fetchData = (): void => {

        // 'http://localhost:8080/emplaoyee?size=100&page=1'
        axios.get('http://localhost:8080/employee/getAll')
            .then(response => {
                setData(response.data.data);

            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className={'w-full h-full bg-[#f6f6f6] flex'}>

            {/*bg-[#fff4ed]*/}
            <div className={'w-[78%] h-full'}>
                <div className={'py-4 px-10  font-Index tracking-wider bg-white border-b-[1px] border-gray-200'}>
                    <h1 className={'text-2xl font-bold text-[#3c3c3c]'}>Employee's</h1>
                    <h4 className={'text-[12px] text-gray-400'}>Good morning kasun. You have update 4 employee details .</h4>
                    <div className={'flex gap-2 py-3'}>
                        <div className={' px-4 w-fit pl-2 pr-3 py-2 rounded-xl font-Index text-[12px] text-gray-400 bg-blue-100 '}>You
                            have new 3 orders
                        </div>
                        <div className={' px-4 w-fit pl-2 pr-3 py-2 rounded-xl font-Index text-[12px] text-gray-400 bg-red-100 '}>No
                            updated employee's
                        </div>
                    </div>
                    <Search/>
                </div>
                <div className={'pt-4 px-4'}>
                    <div className={'bg-white px-10 py-2 w-full h-full rounded-xl border-[1px] border-gray-200'}>
                        <div className={'w-full min-h-[60vh] flex flex-col overflow-y-scroll'}>
                            {
                                data.length > 0 &&
                                data.map((value) => {
                                    return <EmployeeCard
                                        key={value._id}
                                        _id={value._id}
                                        name={value.name}
                                        email={value.email}
                                        address={value.address}
                                        age={value.age}
                                        contact={value.contact}
                                        setEmployee={handleSetEmployee}
                                        handleOnLoad={fetchData}
                                        image={`http://localhost:8080/images/${value.image}`}/>
                                })

                            }
                        </div>
                    </div>

                </div>

            </div>

            <div className={'w-[22%] h-full border-l-2 pt-16 bg-white border-gray-200 '}>
                <AddEmployee ref={addEmployeeRef} onLoadAction={fetchData} onSetEmployee={handleSetEmployee}/>
            </div>
        </section>
    );
}

export default Employee;
