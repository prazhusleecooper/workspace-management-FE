import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';


import BannerImage from "../../../Assets/Images/GetStarted/mail-box.png";
import "../../../Assets/Styling/Pages/User/Onboarding/Login.css";
import UrlConstants from '../../../Utils/UrlConstants';


var positionArray = [];

export default class Login extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            email: "",
            password: "",
            domainError: false,
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

    // ? Trigger API to resend Verification code
    resendCodeAPI = () => {

        alert("RESENDING CODE");

    };
    // * End of resendCodeAPI();

    // ? Method to handle the Form Submit
    handleSubmit = (event) => {

        event.preventDefault();

        var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        
        var { email, password } = this.state;

        if(email === "" || password === "") {

            this.setState({
                formError: "*Please enter all the fields."
            });

        } else if(!emailRegex.test(email)) {

            this.setState({
                formError: "*Please enter a valid Email Address."
            });

        } else if(password.length < 8) {

            this.setState({
                formError: "*Password cannot be less than 8 characters long."
            });

        } else {

            this.setState({
                formError: "",
            });

            var reqBody = {
                email,
                password
            };

            axios
                .post(
                    UrlConstants.login,
                    reqBody
                )
                .then((response) => {

                    if(!response?.data?.status) {

                        if(response?.data?.code === 0) {

                            toast.error("Error logging in. Please check credentials");


                        } else if(response?.data?.code === -1) {

                            toast.error("Incorrect Email or Passoword!");

                        }


                    } else {

                        toast.success("Login Successful");

                        let localStorageItem = {
                            user: response?.data?.data?.email,
                        };

                        window.localStorage.setItem("user", JSON.stringify(localStorageItem));

                        window.location = "/dashboard/announcements"

                    }


                })
                .catch((error) => {

                    console.log("ERROR LOGGING IN: ", error);

                    toast.error("Error logging in. Please try again!");
                    
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
                Login to your app
                </span>

                <span className="sub-text">
                    Use your Email and Password to login.
                </span>

                <form 
                    className="form"
                    onSubmit={ (event) => this.handleSubmit(event) }    
                >

                    <label className="label-text">
                        Email
                    </label>
                    <br />

                    <input 
                        className="form-input"
                        value={ this.state.email }
                        name="email"
                        placeholder="Enter your Email Address"
                        type="text"
                        onChange={ (event) => this.handleInputChange(event) }                            
                        autoFocus
                    />

                    <br />
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

                    <div className="login-options-section">

                        <div className="remember-me-section">

                            <input 
                                type="checkbox"
                            />

                            &nbsp;

                            <span>
                                Remember Me
                            </span>

                        </div>

                        <div className="forgot-password-section">

                            <span className="forgot-password-text">
                                Forgot Password
                            </span>

                        </div>

                    </div>

                    <br />
                    
                    <span className="form-error-text">
                        { this.state.formError }
                    </span>

                    <br />

                    <button
                        className="form-submit-btn"
                        type="submit"
                    >
                        Sign in
                    </button>

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
