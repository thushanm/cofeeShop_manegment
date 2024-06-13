import {forwardRef, useImperativeHandle, useReducer, useRef, useState} from "react";
import {GrUpload} from "react-icons/gr";
import CustomInput from "../../input/customInput.tsx";
import axios from "axios";
import Swal from "sweetalert2";


interface FormState {

    coffeeId: string;
    coffeeIdError: string | null;

    coffeeName: string;
    coffeeNameError: string | null;

    description: string;
    descriptionError: string | null;

    largeSize: number | string;
    largeSizeError: string | null;

    smallSize: number | string;
    smallSizeError: string | null;

    qty: number | string;
    qtyError: string | null;
}

interface FormFieldSetAction {
    formFieldName: string;
    formFieldValue: string | number;
}

interface Data {
    _id: string;
    name: string;
    desc: string;
    largeSize: number;
    smallSize: number;
    qty: number;
    image: string;
}

const formFieldSetReducer = (state: FormState, action: FormFieldSetAction): FormState => {

    switch (action.formFieldName) {
        case "CoffeeId": {
            return {
                ...state,
                coffeeId: String(action.formFieldValue),
                coffeeIdError: null
            };
        }
        case "Coffee": {
            return {
                ...state,
                coffeeName: String(action.formFieldValue),
                coffeeNameError: null
            };
        }
        case "Desc": {
            return {
                ...state,
                description: String(action.formFieldValue),
                descriptionError: null
            };
        }
        case "Large size": {
            return {
                ...state,
                largeSize: action.formFieldValue,
                largeSizeError: null
            };
        }
        case "Small size": {
            return {
                ...state,
                smallSize: action.formFieldValue,
                smallSizeError: null
            };
        }
        case "Qty": {
            return {
                ...state,
                qty: action.formFieldValue,
                qtyError: null
            };
        }
        default: {
            return state;
        }
    }
};

interface Props {
    onLoadAction: () => void;
    onSetCoffee: (coffee: Data) => void;
}

const AddCoffee = forwardRef((props: Props, ref): JSX.Element => {

    const [coffeeImg, setCoffeeImg] = useState<any>('');
    const [oldCoffeeImg, setOldCoffeeImg] = useState<string>('');
    const fileInputRef = useRef();
    const [coffeeState, setCoffeeState] = useState<'Add' | 'Update'>("Add");

    const handleClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: any) => {
        setCoffeeImg(event.target.files[0]);
    };

    useImperativeHandle(ref, () => {
        return {
            setCoffee: (coffee: Data) => {
                setCoffeeState("Update");
                dispatch({formFieldName: 'CoffeeId', formFieldValue: coffee._id});
                dispatch({formFieldName: 'Coffee', formFieldValue: coffee.name});
                dispatch({formFieldName: 'Desc', formFieldValue: coffee.desc});
                dispatch({formFieldName: 'Large size', formFieldValue: coffee.largeSize});
                dispatch({formFieldName: 'Small size', formFieldValue: coffee.smallSize});
                dispatch({formFieldName: 'Qty', formFieldValue: coffee.qty});
                setOldCoffeeImg(`http://localhost:8080/images/${coffee.image}`);
                setCoffeeImg('')
            },
        };
    });

    const [state, dispatch] = useReducer<(state: FormState, action: FormFieldSetAction) => FormState>(
        formFieldSetReducer,
        {
            coffeeId: '',
            coffeeIdError: "",

            coffeeName: '',
            coffeeNameError: "",

            description: '',
            descriptionError: "",

            largeSize: '',
            largeSizeError: "",

            smallSize: '',
            smallSizeError: "",

            qty: '',
            qtyError: ""
        }
    );

    const handleAddCoffee = () => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        let coffeeData = JSON.stringify({
            name: state.coffeeName,
            desc: state.description,
            largeSize: state.largeSize,
            smallSize: state.smallSize,
            qty: state.qty
        });

        const formData = new FormData();

        // @ts-ignore
        formData.append('file', coffeeImg);
        formData.append('coffee', coffeeData);

        axios.post('http://localhost:8080/coffee', formData, config)
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

    const handleUpdateCoffee = () => {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        let coffeeData = JSON.stringify({
            _id: state.coffeeId,
            name: state.coffeeName,
            desc: state.description,
            largeSize: state.largeSize,
            smallSize: state.smallSize,
            qty: state.qty
        });

        const formData = new FormData();

        formData.append('file', coffeeImg);
        formData.append('coffee', coffeeData);

        axios.put('http://localhost:8080/coffee', formData, config)
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

    const handleUpdateCoffeeWithoutImg = () => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        let coffeeData = JSON.stringify({
            _id: state.coffeeId,
            name: state.coffeeName,
            desc: state.description,
            largeSize: state.largeSize,
            smallSize: state.smallSize,
            qty: state.qty
        });

        axios.put('http://localhost:8080/coffee/withoutImage', coffeeData, config)
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

    const handleValidation = () => {

        if (state.coffeeNameError === null && state.descriptionError === null && state.largeSizeError ===
            null && state.smallSizeError === null && state.qtyError === null) {

            if (coffeeState === "Add") {
                handleAddCoffee();
            } else {
                if (coffeeImg) {
                    handleUpdateCoffee();
                } else {
                    handleUpdateCoffeeWithoutImg();
                }
            }
        }
    }

    const clearAll = () => {

        dispatch({formFieldName: "CoffeeId", formFieldValue: ''});
        dispatch({formFieldName: "Coffee", formFieldValue: ''});
        dispatch({formFieldName: "Desc", formFieldValue: ''});
        dispatch({formFieldName: "Large size", formFieldValue: ''});
        dispatch({formFieldName: "Small size", formFieldValue: ''});
        dispatch({formFieldName: "Qty", formFieldValue: ''});
        setCoffeeImg('')
        setOldCoffeeImg('')
        setCoffeeState("Add")
    }

    return (
        <section className={'w-full px-2 pt-1'}>
            <div className={'w-full h-[20vh] my-3'}>
                <input type={"file"} className={'hidden'} ref={fileInputRef} onChange={handleFileChange}/>
                {
                    coffeeImg || oldCoffeeImg ?
                        <img src={!coffeeImg ? oldCoffeeImg : URL.createObjectURL(coffeeImg)} onClick={handleClick}
                             title={'coffee-img'}
                             alt={'coffee-img'} className={'object-cover w-full h-full rounded-xl'}/> :
                        <div onClick={handleClick}
                             className={'w-full h-full border-dashed border-[2px] border-[#ffcaa9] rounded-xl ' +
                                 'flex justify-center items-center flex-col cursor-pointer'}>
                            <h1 className={'font-round text-gray-400 text-[12px] m-2'}>Click for Upload</h1>
                            <GrUpload className={'text-gray-400 text-xl'}/>
                        </div>
                }

            </div>
            <div className={'w-full'}>

                <CustomInput
                    value={state.coffeeName}
                    type={'text'}
                    name={'Coffee'}
                    placeholder={'Cappucino...'}
                    errorMsg={state.coffeeNameError}
                    callBack={(value, name) => dispatch({formFieldName: name, formFieldValue: value})}/>

                <CustomInput
                    value={state.description}
                    type={'text'}
                    name={'Desc'}
                    placeholder={'Description for flavours.. '}
                    errorMsg={state.descriptionError}
                    callBack={(value, name) => dispatch({formFieldName: name, formFieldValue: value})}/>

                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <CustomInput
                            value={state.largeSize}
                            type={'number'}
                            name={'Large size'}
                            placeholder={'00.00'}
                            errorMsg={state.largeSizeError}
                            callBack={(value, name) => dispatch({formFieldName: name, formFieldValue: value})}/>
                    </div>
                    <div className={'col-md-6'}>
                        <CustomInput
                            value={state.smallSize}
                            type={'number'}
                            name={'Small size'}
                            placeholder={'00.00'}
                            errorMsg={state.smallSizeError}
                            callBack={(value, name) => dispatch({formFieldName: name, formFieldValue: value})}/>
                    </div>
                </div>
                <CustomInput
                    value={state.qty}
                    type={'number'}
                    name={'Qty'}
                    placeholder={'Qty on hand'}
                    errorMsg={state.qtyError}
                    callBack={(value, name) => dispatch({formFieldName: name, formFieldValue: value})}/>
                <div className={'w-full flex items-center justify-content-evenly py-4 font-cde text-[13px]'}>
                    <button
                        onClick={() => clearAll()}
                        className={`py-2 w-28 transition-all duration-200 hover: active:text-white active:bg-gray-700 hover:bg-gray-300 bg-gray-200 text-gray-500 rounded`}>Dismiss All
                    </button>
                    <button
                        onClick={handleValidation}
                        className={`py-2 w-28 transition-all duration-200 bg-[#454545] rounded hover:bg-[#2c2c2c] hover:text-white text-white active:bg-[#fc4f13]`}>{coffeeState}
                    </button>
                </div>
                {/*<button
                    onClick={handleValidation}
                    className={`w-full h-[40px] font-round text-sm bg-[#3C3C3C] ` +
                        `hover:bg-[#5d5d5d] text-white rounded-full my-2 ` +
                        `active:bg-[#262626]`}>{coffeeState}
                </button>
                <button
                    onClick={clearAll}
                    className={`w-full h-[38px] font-round text-sm  ` +
                        ` border-[1px] border-gray-400 rounded-full  ` +
                        `active:bg-[#b0b0b0]`}>Clear All
                </button>*/}
            </div>
        </section>
    );
});

export default AddCoffee;
