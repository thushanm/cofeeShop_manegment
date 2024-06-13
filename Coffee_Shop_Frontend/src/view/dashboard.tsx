import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardRevenue from "../components/card/dashboard.revenue.tsx";
import ApexLineChart from "../components/component/chart/ApexLineChart.tsx";
import Earnings from "../components/card/Earnings.tsx";

const Dashboard = ():JSX.Element => {

    const getHex = (color: string) => window.getComputedStyle(document.body).getPropertyValue(color).trim()

    return (
        <section className={'w-full h-full bg-[#f6f6f6] overflow-y-scroll'}>
            <div className="row px-10 py-2 h-20">
                <div className="col-md-12 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg">
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-6 pl-10 py-2">
                    <Earnings success={'#f6f4f4'}/>
                </div>
                <div className="col-md-8 col-sm-6 pr-10 py-2">
                    <div className={'w-full h-full rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'}>
                        {<DashboardRevenue/>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-sm-6 pl-10 h-auto py-2 ">
                    <ApexLineChart direction={'ltr'} warning={'#FFA16C'} />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
