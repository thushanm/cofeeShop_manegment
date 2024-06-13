import Swal from "sweetalert2";
import axios from "axios";
import {useSpring, animated} from "@react-spring/web";
import React, {useRef, useState} from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Edit, MoreVertical, Trash} from "react-feather";
import {FiMoreVertical} from "react-icons/fi";
import {TiDocumentText} from "react-icons/ti";

interface Data {
    _id: string;
    name: string;
    email: string;
    address: string;
    age: number;
    contact: string;
    image: string;
}

interface Props {
    _id: string;
    name: string;
    email: string;
    address: string;
    age: number;
    contact: string;
    image: string;

    setEmployee(employee: Data): void;

    handleOnLoad(): void;
}


const EmployeeCard = (props: Props): JSX.Element => {

    const [openOption, setOpenOption] = useState(false);
    const iconRef = useRef();

    const handleGetEmployeeById = (_id: string): void => {

        axios.get(`http://localhost:8080/employee/getById/${_id}`)
            .then(response => {
                props.setEmployee(response.data.data);
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
                console.log(err)

            });
    }

    const handleDeleteEmployee = (_id: string): void => {

        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure do you to delete this Employee !",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"

        }).then((result) => {
            if (result.isConfirmed) {

                /*const config = {
                    headers: {
                        'Authorization': Cookies.get('token')
                    }
                };*/
                axios.delete(`http://localhost:8080/employee/${_id}`, /*config*/)

                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your employee has been deleted.",
                            icon: "success"
                        });
                        props.handleOnLoad();
                        console.log(res)
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                        console.log(err.message)
                    });
            }
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

    const handleWindowClick = (e: any): void => {
        if (openOption) {
            if (iconRef.current && !iconRef.current.contains(e.target)) {
                setOpenOption(false);
            }
        }
    }
    window.addEventListener('click', handleWindowClick);

    return (
        <animated.div style={styles}
                      className={'w-full relative rounded-[5px] flex bg-white text-[13px] font-[500] items-center h-16 px-5 border-b-[1px] border-gray-200 cursor-default'}>
            <div className={'flex h-full items-center'}>
                <img src={props.image} alt="profile"
                     className={'w-11 h-11 rounded-full object-cover mr-3'}/>
            </div>
            <div className={''}>
                <h1 className={'mx-2 text-[#ffa16c] text-[15px] '}>{props.name}</h1>
                <div className={'font-normal flex text-gray-400 text-[12px]'}>
                    <h3 className={'mx-2'}>{props.email}</h3>
                    <h3 className={'mx-2'}>{props.address}</h3>
                    <h3 className={'mx-2'}>{props.age}</h3>
                    <h3 className={'mx-2'}>{props.contact}</h3>
                </div>
            </div>
            <div className={'absolute right-4 '}>
                <div ref={iconRef} className={'w-12'}><FiMoreVertical
                    onClick={() => setOpenOption(!openOption)}
                    className={`text-sm text-gray-500 cursor-pointer active:bg-gray-100 rounded-full w-6 h-6 px-1`}/>
                </div>
                <div
                    className={`${openOption ? 'z-[500] opacity-1' : 'z-[-10] opacity-0'} transition-transform duration-700  flex-col text-gray-600 font-[300] font-Robot text-[13px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-32 rounded-md absolute right-[30px] py-2 top-6 flex items-center border-[1px] border-gray-200 bg-white`}>
                    <span onClick={() => handleGetEmployeeById(props._id)}
                        className={'w-full active:bg-blue-500 active:text-white py-2.5 pl-8  flex items-center gap-2 justify-start hover:bg-[#FFA16C] hover:bg-opacity-10 hover:text-[#fe7439] hover:cursor-pointer'}>
                    <Edit className='text-lg' size={16}/> <span className='align-middle pt-1'>Edit</span>
                </span>
                    <span onClick={() => handleDeleteEmployee(props._id)}
                        className={'w-full active:bg-red-500 active:text-white py-2.5 pl-8 flex items-center gap-2 justify-start hover:bg-[#FFA16C] hover:bg-opacity-10 hover:text-[#fe7439] hover:cursor-pointer'}>
                    <Trash className='text-lg' size={16}/> <span className='align-middle pt-1'>Delete</span>
                </span>
                </div>
                {/* <button
                    onClick={() => handleDeleteEmployee(props._id)}
                    type={'button'}
                    className={'text-[13px] font-normal mx-1 px-4 my-2 py-1.5 text-center border-[1px] ' +
                        'border-red-400 rounded-[6px] hover:bg-red-500 transition-all duration-100 ease-linear ' +
                        'active:bg-blue-600  cursor-default text-red-500 hover:text-white'}>
                    Remove
                </button>
                <button
                    onClick={() => handleGetEmployeeById(props._id)}
                    type={'button'}
                    className={'text-[13px] font-normal mx-1 px-4 my-2 py-1.5 text-center text-white bg-gray-400  ' +
                        'rounded-[6px]  hover:bg-blue-500 transition-all duration-100 ease-linear ' +
                        'active:bg-blue-600  cursor-default'}>
                    Update
                </button>*/}
            </div>
        </animated.div>
    );
}

export default EmployeeCard;
