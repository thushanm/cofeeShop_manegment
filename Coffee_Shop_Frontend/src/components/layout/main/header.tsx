const Header = (): JSX.Element => {
    return (
        <header
            className={'w-auto h-[90px] absolute right-24 top-[-10px] flex items-center'}>
            <div className={'relative'}>
                <img src="src/assets/NicePng_cammy-png_1829287.png" alt="prfile" title={'profile'}
                     className={'w-10 rounded-full object-cover mx-4 cursor-pointer'}/>
                <span className={'absolute w-3 rounded-full aspect-square bg-green-500 bottom-0 right-3'}></span>
            </div>
            <div>
                <h3 className={'font-round text-[14px] text-gray-700'}>Kasun Perera</h3>
                <h3 className={'font-round text-[12px] text-gray-400'}>kasunpere@info.gmail.com</h3>
            </div>
        </header>
    );
}

export default Header;
