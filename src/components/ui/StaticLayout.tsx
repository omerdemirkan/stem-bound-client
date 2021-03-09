import Navbar from './Navbar'
import Footer from "./Footer";

const StaticLayout: React.FC = ({ children }) => {

    

    return (
        <>
            <div className="main">

            <Navbar />
                {children}

                <Footer />
     
            </div>


            <style jsx>{`
                
                .main {
                    min-height: 100vh;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    flex-wrap: wrap;

                    text-align: center;
                    align-items: center;
                    border-style: dashed;
                    border-width: 2px;
                    border-color: red;
                }

            `}</style>
        </>
    );
};

export default StaticLayout;
