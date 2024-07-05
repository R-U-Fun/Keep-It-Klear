import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from './14_Table.js';
import Shared from './15_Shared.js';
import UserProfile from './13_1_UserProfile.js';
import Icon from './Images/Home.png';


export default function DataInfo() {
    let Data = {
        "Header": {
            "Icon": "bi bi-piggy-bank",
            "Ico": Icon,
            "Title": "Keep It Klear",
            "NavLinks": [
                {
                    "NavID": 0,
                    "Icon": "bi bi-table",
                    "Name": "Personal",
                    "Render": Table
                },
                {
                    "NavID": 1,
                    "Icon": "bi bi-people-fill",
                    "Name": "Shared",
                    "Render": Shared
                },
                {
                    "NavID": 2,
                    "Icon": "bi bi-person-square",
                    "Name": "Profile",
                    "Render": UserProfile
                }
            ]
        },
        "Contact": {
            "Title": "Get in Touch with Waterlily cakes!",
            "Description": [
                "We’re here to help you with any questions or feedback you may have. Whether you’re interested in learning more about our bikes, need assistance with building your custom ride, or just want to share your cycling stories, our team is ready to listen."
            ],
            "Details": [
                {
                    "Icon": "bi bi-telephone-fill",
                    "Name": "+94 76 850 5131"
                },
                {
                    "Icon": "bi bi-envelope-at-fill",
                    "Name": "info@bluelilycakes.com"
                },
                {
                    "Icon": "bi bi-geo-alt-fill",
                    "Name": "24, Vijitha Road, Colombo 06, Sri Lanka"
                }
            ],
            "Button": {
                "Icon": "bi bi-envelope"
            }
        },
        "Footer": {
            "Title": "Keep It Klear",
            "Icon": "bi bi-piggy-bank",
            "Description": [
                "Providing awesome cakes",
                "- Blue Lily cakes Pvt Ltd."
            ],
            "Links": {
                "Title": "Links"
            },
            "Contact": {
                "Title": "Contact"
            },
            "FootNotes": {
                "Year": "2024",
                "Company": "Keep It Klear"
            },
            "Socials": [
                {
                    "Icon": "bi bi-instagram",
                    "Name": "Instagram",
                    "Link": "https://www.instagram.com/aaroophan/?theme=dark"
                },
                {
                    "Icon": "bi bi-linkedin",
                    "Name": "LinkedIn",
                    "Link": "https://www.linkedin.com/in/aaroophan"
                },
                {
                    "Icon": "bi bi-github",
                    "Name": "GitHub",
                    "Link": "https://github.com/R-U-Fun"
                }
            ],
        }
    }
    return (Data);
}
