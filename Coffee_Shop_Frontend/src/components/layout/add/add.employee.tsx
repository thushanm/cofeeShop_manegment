import {GrUpload} from "react-icons/gr";
import Input from "../../input/input.tsx";
import {createRef, forwardRef, useImperativeHandle, useRef, useState} from "react";
import * as validator from "../../../util/validator.ts";
import axios from "axios";
import Swal from "sweetalert2";


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
    onLoadAction: () => void;
    onSetEmployee: (Employee: Data) => void;
}

const AddEmployee = forwardRef((props: Props, ref):JSX.Element => {

    const [oldImage, setOldImage] = useState<File | string>('');
    const [image, setImage] = useState<any>('');
    const fileInputRef = useRef();
    const [errorSate, setErrorSate] = useState([false, false, false, false, false]);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [age, setAge] = useState<number | string>('');
    const [contact, setContact] = useState<string>('');
    const [employeeState, setEmployeeState] = useState<'Save' | 'Update'>( "Save");


    useImperativeHandle(ref, () => {
        return {
            setEmployee: (employee: Data) => {
                setEmployeeState("Update");
                setId(employee._id);
                setName(employee.name);
                setMail(employee.email);
                setAddress(employee.address);
                setAge(employee.age);
                setContact(employee.contact);
                setOldImage(`http://localhost:8080/images/${employee.image}`);
                setImage('')
            },
        };
    });

    // Function to trigger click on file input
    const handleClick = (): void => {
        // @ts-ignore
        fileInputRef?.current?.click();
    };

    // Function to handle file selection
    const handleFileChange = (event: any) => {
        setOldImage('')
        setImage(event.target.files[0]);
    };

    const handleInput = (e: any, type: string): void => {

        switch (type) {
            case "Name":
                setName(e.target.value);
                break;
            case "Email":
                setMail(e.target.value);
                break;
            case "Address":
                setAddress(e.target.value);
                break;
            case "Age":
                setAge(e.target.value);
                break;
            case "Contact":
                setContact(e.target.value);
                break;
        }
    }

    const clearAll = () => {

        setName('');
        setMail('');
        setAddress('');
        setAge('');
        setContact('');
        setOldImage('')
        setImage('')
        setId(null);
        setEmployeeState('Save')
    }

    const handleEmployee = () => {

        if (employeeState === "Update") {
            if (handleValidation()) {
                handleUpdateEmployee();
            }
        } else {
            if (handleValidation()) {
                handleAddEmployee();
            }
        }
    }

    const showError = (index: number) => {

        setErrorSate(prevState => {
            const newArray = [...prevState];
            newArray[index] = true;
            return newArray;
        });
    }

    const handleValidation = (): boolean => {

        setErrorSate([false, false, false, false, false]);

        if (!validator.validateName(name)) {
            showError(0);
            return false;
        }

        if (!validator.validateEmail(mail)) {
            showError(1);
            return false;
        }

        if (!validator.validateAddress(address)) {
            showError(2);
            return false;
        }

        if (!validator.validateAge(+age)) {
            showError(3);
            return false;
        }

        if (!validator.validateContact(contact)) {
            showError(4);
            return false;
        }
        return true;
    }

    const handleUpdateEmployee = () => {

        if (image) {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            let data = JSON.stringify({
                _id:id,
                name: name,
                email: mail,
                address: address,
                age: age,
                contact: contact
            });

            const formData = new FormData();

            // @ts-ignore
            formData.append('file', image);
            formData.append('employee', data);

            axios.put('http://localhost:8080/employee', formData, config)
                .then(res => {
                    clearAll();
                    props.onLoadAction();
                    Swal.fire({
                        title: "Success !",
                        text: res.data.message,
                        icon: "success"
                    });
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.status,
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                });
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            let data = JSON.stringify({
                _id: id,
                name: name,
                email: mail,
                address: address,
                age: age,
                contact: contact
            });
            axios.put('http://localhost:8080/employee/withoutImage', data, config)
                .then(res => {
                    clearAll();
                    props.onLoadAction();
                    Swal.fire({
                        title: "Success !",
                        text: res.data.message,
                        icon: "success"
                    });
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        title: err.response.data.status,
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                });
        }
    }

    const handleAddEmployee = () => {

        //  'Authorization': Cookies.get('token')
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        let empData = JSON.stringify({
            name: name,
            email: mail,
            address: address,
            age: age,
            contact: contact
        });

        const formData = new FormData();

        console.log(image)
        // @ts-ignore
        formData.append('file', image);
        formData.append('employee', empData);

        console.log(formData.get('file'))

        axios.post('http://localhost:8080/employee', formData, config)
            .then(res => {
                clearAll();
                props.onLoadAction();
                Swal.fire({
                    title: "Success !",
                    text: res.data.message,
                    icon: "success"
                });

            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: err.response.data.status,
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            });
    }

    return (
        <section>
            <div className={'w-full h-[20vh] bg-[#ffcaa9] py-4 px-14'}>
                {
                    image || oldImage ? <img src={oldImage ? oldImage : URL.createObjectURL(image)} alt="profile"
                                             onClick={handleClick}
                                             className={'cursor-pointer w-full h-full rounded-xl object-cover'}/>

                        : <div className={'cursor-pointer w-full h-full rounded-xl border-dashed border-2 ' +
                            'border-white flex justify-center items-center flex-col text-white'}
                               onClick={handleClick}>
                            <h1 className={'font-round text-sm my-2'}>Upload profile</h1>
                            <GrUpload className={'text-2xl'}/></div>
                }

                <input type={"file"} className={'hidden'} ref ={fileInputRef} onChange={handleFileChange}/>
            </div>
            <div className={'px-8 pt-[10px]'}>
                <Input id={0} value={name} type={'text'} name={'Name'} placeholder={'Insert your name'}
                       errorMsg={"Name must be 3-16 characters and shouldn' t include special characters."}
                       option={errorSate[0]}
                       callBack={handleInput}/>
                <Input id={1} value={mail} type={'email'} name={'Email'} placeholder={'Insert your mail'}
                       errorMsg={"It should be valid email address."}
                       option={errorSate[1]}
                       callBack={handleInput}/>
                <Input id={2} value={address} type={'text'} name={'Address'} placeholder={'Address'}
                       errorMsg={"Address must be 3-25 characters."}
                       option={errorSate[2]}
                       callBack={handleInput}/>
                <Input id={3} value={age} type={'number'} name={'Age'} placeholder={'your age'}
                       errorMsg={"Age must greater than 17 and 50 less than."}
                       option={errorSate[3]}
                       callBack={handleInput}/>
                <Input id={4} value={contact} type={'tel'} name={'Contact'} placeholder={'phone number'}
                       errorMsg={"Phone number must be 10 characters and shouldn' t include special characters."}
                       option={errorSate[4]}
                       callBack={handleInput}/>
                <div className={'w-full flex items-center justify-content-evenly py-4 font-cde text-[13px]'}>
                    <button
                        onClick={() => clearAll()}
                        className={`py-2 w-28 transition-all duration-200 hover: active:text-white active:bg-gray-700 hover:bg-gray-300 bg-gray-200 text-gray-500 rounded`}>Dismiss All
                    </button>
                    <button
                        onClick={handleEmployee}
                        className={`py-2 w-28 transition-all duration-200 bg-[#454545] rounded hover:bg-[#2c2c2c] hover:text-white text-white active:bg-[#fc4f13]`}>{employeeState}
                    </button>
                </div>
            </div>
        </section>
    );
});

export default AddEmployee;
