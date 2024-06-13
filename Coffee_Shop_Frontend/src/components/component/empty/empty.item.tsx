
const EmptyItem = ():JSX.Element => {
    return (
        <div className={'w-full h-full flex justify-center items-center flex-col'}>
            <img src="../../../assets/Emptyitem.png" className={'w-[300px] object-cover'} alt="empty-image"/>
            <h1 className={'font-round text-2xl mt-2'}>You don't have item's yet</h1>
            <h3 className={'text-sm font-round text-gray-500'}>Start creating resources by using "Add" button</h3>
        </div>
    );
}

export default EmptyItem;
