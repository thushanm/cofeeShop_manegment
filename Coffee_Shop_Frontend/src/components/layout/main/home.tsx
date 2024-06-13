import {/*BrowserRouter, Navigate,*/ Route, Routes} from "react-router-dom";
import NavBar from "./navBar.tsx";
import Header from "./header.tsx";
import Menu from "../../../view/menu.tsx";
import Item from "../../../view/item.tsx";
import Dashboard from "../../../view/dashboard.tsx";
import Employee from "../../../view/employee.tsx";
import History from "../../../view/history.tsx";

const Home = (): JSX.Element => {

    return (
        <section className={'w-full h-[100vh] flex bg-[#202225]'}>
            {/*nav*/}
            <div className={'h-full w-20'}>
                <NavBar/>
            </div>
            <div className={'h-full w-full relative flex flex-col overflow-hidden'}>
                <Header/>
                <div className={'w-full h-full rounded-2xl'}>
                    <Routes>
                        <Route path={'/'} element={<Dashboard/>}/>
                        <Route path={'/menu'} element={<Menu/>}/>
                        <Route path={'/item'} element={<Item/>}/>
                        <Route path={'/profile'} element={<Dashboard/>}/>
                        <Route path={'/employee'} element={<Employee/>}/>
                        <Route path={'/history'} element={<History/>}/>
                        {/*<Route path={'/'} element={< Login/>}/>*/}
                    </Routes>
                </div>
            </div>
        </section>
    );
}
export default Home;
