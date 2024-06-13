
const EmptyCart = ():JSX.Element => {
    return (
        <div className={'w-full h-full rounded-2xl flex justify-center items-center flex-col'}>
            <img src="src/assets/EmptyOrder-removebg-preview.png" alt="empty-cart"/>
            <h1 className={'font-pop text-[13px] tracking-wide font-bold text-gray-500'}>No item's for cart
                yet .</h1>
        </div>
    );
}

export default EmptyCart;
