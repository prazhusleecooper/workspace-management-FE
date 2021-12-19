import React, { Component } from 'react';
import axios from "axios";

import BannerImage from "../../../Assets/Images/GetStarted/mail-box.png";
import "../../../Assets/Styling/Pages/User/Onboarding/PersonalDetail.css";

import UrlConstants from "../../../Utils/UrlConstants";
import Spinner from "../../../Components/Loaders/Spinner";
import Services from '../../../Utils/Services';
import { toast } from 'react-toastify';


var positionArray = [];

export default class PersonalDetail extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            domainError: false,

            loader: false,
        };


    }


    // ? NON-RENDERING METHODS

    // ? Method to handle the input change and autofocus to next/prev input
    handleInputChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        });


    };
    // * End of handleInputChange();

    // ? Method to handle the Form Submit
    handleSubmit = (event) => {

        event.preventDefault();

        this.setState({
            formError: "",
        });

        var { firstName, lastName, password } = this.state;

        if(
            firstName === "" ||
            lastName === "" ||
            password === ""
        ) {

            this.setState({
                formError: "*Please enter all the details."
            });

        } else if(password.length < 8) {

            this.setState({
                formError: "*Password cannot be less than 8 characters long.",
                domainError: true,
            });

        } else {

            this.setState({
                loader: true,
            });

            let savedUser = Services.getSavedUser();

            let reqBody = {
                email: savedUser?.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
            };

            axios
                .post(
                    UrlConstants.updateNameAndPassword,
                    reqBody,
                )
                .then((response) => {

                    if(response?.data?.status) {

                        toast.success("Details updated successfully");

                        window.location = "/dashboard/announcements";

                    } else {

                        toast.error("Error updating details. Please try again later");

                    }

                    this.setState({
                        loader: false,
                    });

                })
                .catch((error) => {

                    this.setState({
                        loader: false,
                    });
                    
                    toast.error("Error updating details. Please try again later");

                })

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
                    Create Personal Password
                </span>

                <span className="sub-text">
                    To make a workspace from scratch, please confirm your email address.
                </span>

                <form 
                    className="form"
                    onSubmit={ (event) => this.handleSubmit(event) }    
                >

                    <div className="row m-0 p-0 ">

                        <div className="col-6 p-0">
                            <label className="label-text">
                                First Name
                            </label>
                            <br />
                
                            <input 
                                className="form-input"
                                value={ this.state.firstName }
                                name="firstName"
                                type="text"
                                placeholder="John"
                                onChange={ (event) => this.handleInputChange(event) }                            
                                autoFocus
                            />        
                        </div>

                        <div className="col-1" />

                        <div className="col-5 p-0">
                            <label className="label-text">
                                Last Name
                            </label>
                            <br />

                            <input 
                                className="form-input"
                                value={ this.state.lastName }
                                name="lastName"
                                type="text"
                                placeholder="Smith"
                                onChange={ (event) => this.handleInputChange(event) }                            
                                autoFocus
                            />        
                        </div>

                    </div>

                    <br />

                    <label className="label-text">
                        Password
                    </label>
                    <br />

                    <input 
                        className="form-input"
                        value={ this.state.password }
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        onChange={ (event) => this.handleInputChange(event) }                            
                        autoFocus
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
                        Complete
                    </button>

                    <br />
                    <br />

                    { this.state.loader ? <Spinner /> : "" }

                </form>

            </div>

        );
        
    };
    // ? End of formSection();

    // * END OF RENDERING METHODS


    // ? COMPONENT LIFCYCLE METHODS
    
    componentDidMount = () => {

    };

    // * END OF COMPONENT LIFECYCLE METHODS


    render() {
        return (
            <div className="personal-detail row m-0 p-0">
                
                { this.imageSection() }

                { this.formSection() }

            </div>
        );
    }
}
