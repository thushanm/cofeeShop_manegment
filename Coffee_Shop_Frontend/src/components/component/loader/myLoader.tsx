import ContentLoader from "react-content-loader";

const MyLoader = ():JSX.Element => {
    return (
        <ContentLoader className={'mx-6 my-3'}
            height={180}
            width={330}
            speed={1}
            backgroundColor={'#e7e7e7'}
            foregroundColor={'#999'}
            viewBox="0 0 330 170">
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="15" ry="15" width="100" height="150" />
            <rect x="110" y="10" rx="4" ry="4" width="90" height="13" />
            <rect x="110" y="50" rx="3" ry="3" width="250" height="10" />
            <rect x="110" y="65" rx="3" ry="3" width="250" height="10" />
            <rect x="110" y="80" rx="3" ry="3" width="150" height="10" />
            <rect x="110" y="105" rx="3" ry="3" width="70" height="10" />
            <rect x="110" y="120" rx="3" ry="3" width="70" height="10" />
        </ContentLoader>
    );
}

export default MyLoader;
