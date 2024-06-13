import Input from "../components/input/input.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Props{
    setIsLogged: (log:boolean) => void;
}

const Login = (props:Props): JSX.Element => {

    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        props.setIsLogged(true);
        navigate('/');
    }

    return (
        <section
            className={'w-full h-[100vh] flex justify-center items-center bg-[url(src/assets/pexels-ian-frallon-pictures-3289960.jpg)]'}>
            <div
                className={`w-[60vw] h-[85vh] border-[1px] border-gray-400 p-3 flex bg-white  ${isLogin && 'flex-row-reverse'} `}>
                <div
                    className={`w-[40%] h-full bg-[url(src/assets/pexels-ian-frallon-pictures-3289960.jpg)] bg-cover overflow-hidden`}>
                    <div className={'font-round mt-10 mx-5 text-3xl text-gray-400 '}>
                        <h1 className={'text-lg'}>King's Row coffee</h1>
                        <h1 className={'font-bold'}>Your instant choice </h1>
                        <div className={'font-bold text-[10rem] leading-[150px] opacity-[0.2]'}>
                            <h1>R</h1>
                            <h1>O</h1>
                            <h1>W</h1>
                        </div>
                    </div>
                </div>
                <div className={'w-[60%] h-full px-20 pt-20 '}>
                    <h1 className={'font-round text-[1.6rem] font-[600] text-gray-600 my-1'}>Welcome to King's Row
                        System</h1>
                    <h1 className={'font-round text-[14px] text-gray-500'}>Please log in to your account</h1>
                    <div className={'mt-16 '}>
                        <Input
                            id={1} option={false}
                            type={'text'}
                            name={'Email'}
                            placeholder={"Please enter your email"}
                            errorMsg={""}
                        />
                    </div>
                    <div className={'mt-1.5'}>
                        <Input
                            id={2} option={false}
                            type={'password'}
                            name={'Password'}
                            placeholder={"Please enter your password"}
                            errorMsg={""}
                        />
                    </div>

                    <div className={'w-[10vw] mt-2'}>
                        <button
                            className={'w-full h-[45px] font-round text-sm bg-[#ffa16c] text-white rounded-3xl my-1 active:bg-[#fe7439] '}
                            onClick={() => handleLogin()}>
                            Log in
                        </button>
                    </div>
                    <h1 className={'mt-14 font-round text-sm text-gray-400 cursor-default '}>Don't have a Row account ?
                        <span className={'underline ml-1 cursor-pointer text-blue-500 active:text-red-500'}> Register now </span>
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default Login;
