import React, { Component } from 'react';
import { MdMail } from "react-icons/md";
import { Button } from 'reactstrap';

import "../../Assets/Styling/Components/Navbar/Navbar.css";


export default class Navbar extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            page: "OTHER",      // * OTHER || LOGIN_PAGE || GET_STARTED 
        };

    };


    // ? NON-RENDERING METHODS

    // ? Method to set the page so the options components can be rendered
    setPage = () => {

        if(window.location.pathname === "/get-started") {

            this.setState({
                page: "GET_STARTED",
            });

        } else if(window.location.pathname === "/login") {

            this.setState({
                page: "LOGIN_PAGE",
            });

        } 

    };
    // * End of setPage

    // * NON-RENDERING METHODS

    // ? RENDERING METHODS

    // ? Logo Section
    logoSection = () => {

        return(

            <span className="navbar-logo-text">
                SA-INTRANET
            </span>

        );

    };
    // * End of logoSection(); 


    // ? login
    login = () => {

        return (

            <span
                className="login-text"    
            >

                Login
                
            </span>

        )

    };
    //  * End of login();


    // ? Email Address
    emailAddress = () => {

        return (

            <a 
                href="mailto:support@squashapps.com"
                className="navbar-email"    
            >

                <MdMail 
                    size={ 18 }
                    className="mx-2"
                />

                support@squashapps.com
                
            </a>

        )

    };
    //  * End of emailAddress();


    // ? Get Started 
    getStarted = () => {

        return(

            <button
                color="success"
                className="get-started-btn"
            >
                Get Started
            </button>

        );

    };
    // * End of getStarted();


    // ? Options Section
    optionsSection = () => {

        var renderOptions = () => {

            if(this.state.page === "GET_STARTED") {

                return(
                    
                    <>

                        { this.login() }

                        { this.emailAddress() }

                    </>

                );

            } else if(this.state.page === "LOGIN_PAGE") {

                return(
                    
                    <>

                        { this.getStarted() }

                    </>

                );

            } else {

                return(
                    
                    <>

                        { this.emailAddress() }

                    </>

                );

            }

        }

        return(
            <div className="options-section">
                



                { renderOptions() }



            </div>
        );

    };
    // * End of optionsSection(); 

    // ? Method to render the Navbar
    navBar = () => {

        return(
            
            <div className="navbar-inner">

                { this.logoSection() }

                { this.optionsSection() }

            </div>
        )

    };
    // * End of navBar();

    // * END OF RENDERING METHODS
    
    // ? COMPONENT LIFECYCLE METHODS

    componentDidMount = () => {

        this.setPage();

    };
    // * END OF COMPONENT LIFECYCLE METHODS


    render() {
        
        return (
            
            <div className="navbar-container">
                
                { this.navBar() }
            
            </div>
        
        );
    
    }

}
