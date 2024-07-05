import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Theme from './ThemeSet';
import DataSingleton from './DataSingleton';

export default function Footer(){
    let FooteLinks = [];
    for(let L=0; L<DataSingleton.getData().Header.NavLinks.length; L++){
        FooteLinks.push(
            <li key={L}><a className="btn btn-sm text-white px-3" onClick={() => {
                let Component = DataSingleton.getData().Header.NavLinks[L].Render;
                createRoot(document.getElementById('PageHere')).render(<Component />);
            }}><i className={DataSingleton.getData().Header.NavLinks[L].Icon}></i><i className="me-2"></i>{DataSingleton.getData().Header.NavLinks[L].Name}</a></li>
        );
    }

    let ContactDetails = [];
    for(let L=0; L<DataSingleton.getData().Contact.Details.length; L++){
        ContactDetails.push(
            <tr key={L}>
                <td className="w-25"><i className={DataSingleton.getData().Contact.Details[L].Icon}></i></td>
                <td >{DataSingleton.getData().Contact.Details[L].Name}</td>
            </tr>
        );
    }
    
    let FooterDesc = [];
    for(let L=0; L<DataSingleton.getData().Footer.Description.length; L++){
        FooterDesc.push(
            <a key={L} className="text-decoration-none text-light" >{DataSingleton.getData().Footer.Description[L]}<br/></a>
        );
    }
    
    let SocialDetails = [];
    for(let L=0; L<DataSingleton.getData().Footer.Socials.length; L++){
        SocialDetails.push(
            <li key={L} className="list-inline-item text-decoration-none text-white"><a href={DataSingleton.getData().Footer.Socials[L].Link} className="text-decoration-none text-white"><i className={DataSingleton.getData().Footer.Socials[L].Icon}></i></a></li>
        );
    }
    
    return(
        <div className="Footer text-light py-1" id="Footer">
            <div className="container">
                <br/><br/><br/>
                <hr className="text-white"/>
                <div className="text-center text-decoration-none">
                    <a className="text-decoration-none text-white" href="www.waterlilylabs.com">&copy; {DataSingleton.getData().Footer.FootNotes.Year} | {DataSingleton.getData().Footer.FootNotes.Company} | Aaroophan</a>
                    <ul className="list-inline">
                        {SocialDetails}
                    </ul>
                </div>
            </div>
        </div>
    );
}