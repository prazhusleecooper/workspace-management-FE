import React, { Component } from 'react';
import { FaBullhorn, FaUserMinus } from "react-icons/fa";

import "../../Assets/Styling/Components/Sidebar/Sidebar.css";


export default class Sidebar extends Component {
    

    // ? NON-RENDERING METHODS

    // ? User logout
    userLogout = () => {

        window.localStorage.removeItem("user");
        window.location = "/login"; 

    };
    // * End of userLogout();

    // * END OF NON-RENDERING METHODS

    render() {
        
        return (
            <div className="sidebar col-2 m-0 p-0">
                
                <div className="sidebar-header">
                    
                    <span className="sidebar-logo-text">
                        SA-INTRANET
                    </span>
                
                </div>

                <div className="sidebar-body">
                    
                    <div className={`sidebar-option ${(window.location.pathname === "/dashboard/announcements") ? "sidebar-option-active" : ""}`}>
                        <FaBullhorn /> &nbsp; Announcements
                    </div>

                    <div 
                        className="sidebar-option"
                        onClick={ () => this.userLogout() }
                    >
                        <FaUserMinus /> &nbsp; Logout
                    </div>

                </div>

            </div>
        );

    }

}
