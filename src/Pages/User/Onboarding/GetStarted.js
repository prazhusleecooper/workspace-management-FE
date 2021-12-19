import React, { Component } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';


import BannerImage from "../../../Assets/Images/GetStarted/get-started.png";
import "../../../Assets/Styling/Pages/User/Onboarding/GetStarted.css";

import UrlConstants from "../../../Utils/UrlConstants";
import Constants from "../../../Utils/Constants";


export default class GetStarted extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            email: "",
            formError: ""
        };

    }


    // ? NON-RENDERING METHODS

    // ? Method to handle the Form Submit
    handleSubmit = (event) => {

        event.preventDefault();

        this.setState({
            formError: ""
        });

        var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        
        if(!emailRegex.test(this.state.email)) {

            this.setState({
                formError: "*Invaild Email. Please enter valid Email Address to proceed!"
            });

        } else {

            var reqBody = {
                email: this.state.email,
                company: "61b8dc68fce40423d808c9c3",
            };

            axios
                .post(
                    UrlConstants.createUserWithEmail,
                    reqBody,
                )
                .then((response) =>{

                    console.log({
                        response,
                    });

                    if(response?.data?.status) {

                        if(response?.data?.code === Constants.USER_EXISTS) {

                            this.setState({
                                formError: "*EMAIL ALREADY EXISTS!"
                            });

                        } else if(response?.data?.code === Constants.NEW_USER_CREATED) {

                            toast.success("User has been created");

                            let localStorageItem = {
                                email: response?.data?.data?.email,
                                company: "61b8dc68fce40423d808c9c3",
                            };

                            window.localStorage.setItem("user", JSON.stringify(localStorageItem));

                            window.location = "/verification";

                        }

                    }

                })
                .catch((error) => {

                    this.setState({
                        formError: "*Error creating user! Please try again",
                    });

                });

        }

    };
    // * End of handleSubmit();

    // * END OF NON-RENDERING METHODS

    // ? RENDERING METHODS

    // ? Method to render the image section
    imageSection = () => {

        return(

            <div className="col-7 banner-img-section">

                <img 
                    src={ BannerImage }
                    className="banner-img"
                />

            </div>

        );
        
    };
    // ? End of imageSection();

    // ? Method to render the form section
    formSection = () => {

        return(

            <div className="col-5 form-section">

                <span className="title-text">
                    Make Your Life Easy <br />
                    with Intranet!
                </span>

                <span className="sub-text">
                    To make a workspace from scratch, please confirm your email address.
                </span>

                <form 
                    className="form"
                    onSubmit={ (event) => this.handleSubmit(event) }    
                >

                    <label className="label-text">
                        Email Address
                    </label>
                    <br />
                    <input
                        placeholder="name@email.com"
                        className="form-input"
                        type="email"
                        value={ this.state.email }
                        onChange={ (event) => this.setState({ email: event.target.value }) }
                        style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                    />

                    <br />

                    <span className="form-error-text">
                        { this.state.formError }
                    </span>

                    <br />

                    <button
                        className="form-submit-btn"
                        type="submit"
                    >
                        Confirm Email
                    </button>

                </form>

            </div>

        );
        
    };
    // ? End of formSection();

    // * END OF RENDERING METHODS

    render() {
        return (
            <div className="get-started row m-0 p-0">
                
                { this.imageSection() }

                { this.formSection() }

            </div>
        );
    }
}
