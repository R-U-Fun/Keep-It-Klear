import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './2_0_Home.js';
import Header from './1_Header.js';
import Footer from './8_Footer.js';
import ThemeSingleton from './ThemeSingleton';
import DataSingleton from './DataSingleton.js';
import DataInfo from './Data.js';

export default function App() {

    if(!DataSingleton.getData()){
        DataSingleton.setData(DataInfo());

        // fetch(`./Data.json`)
        // .then(response => response.json())
        // .then(Data => {
        //     DataSingleton.setData(Data);
        // })
        // .catch(error => console.error('Error:', error));
    }

    if(!ThemeSingleton.getTheme()){
        ThemeSingleton.setTheme('dark');
    }

    return (
        <div style={{backgroundColor:"#0f0f0f"}}>
            <Header/>
            <br/><br/><br/><br/>
            <div id="HomeHere">
                <Home/>
            </div>
            <Footer/>
        </div>
    );
}
