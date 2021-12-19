import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';


import BannerImage from "../../../Assets/Images/GetStarted/mail-box.png";
import "../../../Assets/Styling/Pages/User/Onboarding/VerificationCode.css";

import Services from "../../../Utils/Services";
import UrlConstants from '../../../Utils/UrlConstants';
import Spinner from '../../../Components/Loaders/Spinner';

var positionArray = [];

export default class VerificationCode extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            email: "",
            otpOne: "",
            otpTwo: "",
            otpThree: "",
            otpFour: "",
            otpFive: "",
            otpSix: "",
            formError: "",

            loader: false,
        };

        this.otpOneRef = React.createRef();
        this.otpTwoRef = React.createRef();
        this.otpThreeRef = React.createRef();
        this.otpFourRef = React.createRef();
        this.otpFiveRef = React.createRef();
        this.otpSixRef = React.createRef();

    }


    // ? NON-RENDERING METHODS

    // ? Method to handle the Form Submit
    handleSubmit = () => {

        var { otpOne, otpTwo, otpThree, otpFour, otpFive, otpSix } = this.state;

        this.setState({
            loader: true,
        });

        if(
            otpOne === "" ||
            otpTwo === "" ||
            otpThree === "" ||
            otpFour === "" ||
            otpFive === "" ||
            otpSix === ""
        ) {

            this.setState({
                formError: "*Please enter the full Verification code.",
                loader: false,
            });

        } else {

            let reqBody = {
                verificationCode: otpOne + otpTwo + otpThree + otpFour + otpFive + otpSix,
                email: Services.getSavedUser().email,
            };

            axios
                .post(
                    UrlConstants.verifyVerificationCode,
                    reqBody
                )
                .then((response) => {

                    if(response?.data?.status) {

                        toast.success("Email verification successful!");

                        window.location = "./personal-detail";

                    }
                    
                    if(!response?.data?.status) {

                        
                        if(response?.data?.code === -1) {
                            
                            toast.error("Invalid verification code");
                            
                        } else if(response?.data?.code === 0) {
                            
                            toast.error("Error Verifying Email!");
                            
                        }
                        
                        this.setState({
                            loader: false,
                        });

                    }

                })
                .catch((error) => {

                    this.setState({
                        loader: false,
                    });

                    toast.error("Error resending Verification Code!");

                });


        }

    };
    // * End of handleSubmit();

    // ? Method to handle the input change and autofocus to next/prev input
    handleInputChange = (event, operator) => {

        console.log("EVENT: ", event.target.name);

        this.setState({
        
            [event.target.name]: event.target.value,
        
        }, () => {

            if(event.target.value === "") {


                if(operator.pos !== 1) {
    
                    eval(operator.prev + ".current.focus()");
    
                }
    
            } else {
    
                if(operator.pos !== 6) {
    
                    eval(operator.next + ".current.focus()");
    
                }
    
            }
    
            if(event.target.name === "otpSix") {
    
                this.handleSubmit();
    
            }

        });       

    };
    // * End of handleInputChange();

    // ? Trigger API to resend Verification code
    resendCodeAPI = () => {

        var savedUserData = Services.getSavedUser();

        let reqBody = {
            email: savedUserData?.email,
        };

        axios
            .post(
                UrlConstants.resendVerifcationCode,
                reqBody,
            )
            .then((response) => {

                if(response?.data?.status) {

                    toast.success("New Verifcation code has been sent to your email");

                } else if(!response?.data?.status) {

                    if(response?.data?.code === -1) {

                        toast.error("Email address does not exist!");
                        
                    } else {
                        
                        toast.error("Error resending Verification Code!");

                    }

                }

            })
            .catch((error) => {

                toast.error("Error resending Verification Code!");

            })

    };
    // * End of resendCodeAPI();

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
                    We’ve sent you a mail!
                </span>

                <span className="sub-text">
                    To make a workspace from scratch, please confirm your email address.
                </span>

                <form 
                    className="form"
                    onSubmit={ (event) => this.handleSubmit(event) }    
                >

                    <label className="label-text">
                        Enter your verification code
                    </label>
                    <br />

                    <div className="otp-input-section">

                        <input 
                            className="form-input"
                            value={ this.state.otpOne }
                            name="otpOne"
                            // onChange={ (event) => this.handleInputChange({ otpOne: event.target.value }) }
                            onChange={ (event) => {
                                this.handleInputChange(
                                    event,
                                    { 
                                        pos: 1,
                                        next: "this.otpTwoRef",
                                        stateVar: "otpOne",
                                    }
                                ) 
                            }}
                            ref={ this.otpOneRef }
                            maxLength={ 1 }
                            style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                            // onFocus={ (event) => event.target.select() }

                        />
                        <input 
                            className="form-input"
                            value={ this.state.otpTwo }
                            name="otpTwo"
                            onChange={ (event) => 
                                this.handleInputChange(
                                    event,
                                    { 
                                        pos: 2,
                                        next: "this.otpThreeRef",
                                        prev: "this.otpOneRef",
                                    }
                                ) 
                            }
                            maxLength={ 1 }
                            ref={ this.otpTwoRef }
                            style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                            // onFocus={ (event) => event.target.select() }
                            
                        />
                        <input 
                            className="form-input"
                            value={ this.state.otpThree }
                            name="otpThree"
                            onChange={ (event) => 
                                this.handleInputChange(
                                    event,
                                    { 
                                        pos: 3,
                                        next: "this.otpFourRef",
                                        prev: "this.otpTwoRef",
                                    }
                                ) 
                            }
                            maxLength={ 1 }
                            ref={ this.otpThreeRef }
                            style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                            // onFocus={ (event) => event.target.select() }
                        />
                        <input 
                            className="form-input"
                            value={ this.state.otpFour }
                            name="otpFour"
                            onChange={ (event) => 
                                this.handleInputChange(
                                    event,
                                    { 
                                        pos: 4,
                                        next: "this.otpFiveRef",
                                        prev: "this.otpThreeRef",
                                    }
                                ) 
                            }
                            maxLength={ 1 }
                            ref={ this.otpFourRef }
                            style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                            // onFocus={ (event) => event.target.select() }
                        />
                        <input 
                            className="form-input"
                            value={ this.state.otpFive }
                            name="otpFive"
                            onChange={ (event) => 
                                this.handleInputChange(
                                    event,
                                    { 
                                        pos: 5,
                                        next: "this.otpSixRef",
                                        prev: "this.otpFourRef",
                                    }
                                ) 
                            }
                            maxLength={ 1 }
                            ref={ this.otpFiveRef }
                            style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                            // onFocus={ (event) => event.target.select() }
                            
                        />
                        <input 
                            className="form-input"
                            value={ this.state.otpSix }
                            name="otpSix"
                            onChange={ (event) => 
                                this.handleInputChange(
                                    event,
                                    { 
                                        pos: 6,
                                        prev: "this.otpFiveRef",
                                    }
                                ) 
                            }
                            maxLength={ 1 }
                            ref={ this.otpSixRef }
                            style={{ borderColor: (this.state.formError !== "") ? "#C4250C" : "#A1A6A9" }}
                            // onFocus={ (event) => event.target.select() }
                        />

                    </div>

                    <br />
                    
                    <span className="form-error-text">
                        { this.state.formError }
                    </span>

                    <br />

                    { this.resendCode() }

                    <br />
                    <br />

                    { (this.state.loader) ? <Spinner /> : "" }

                </form>

            </div>

        );
        
    };
    // ? End of formSection();

    // ? Resend Verification code button
    resendCode = () => {

        return(
            
            <span 
                className="resend-code-btn"
                onClick={ () => this.resendCodeAPI() }    
            >
                Resend Code
            </span>

        )

    };
    // * End of resendCode();

    // * END OF RENDERING METHODS

    // ? COMPONENT LIFCYCLE METHODS
    
    componentDidMount = () => {

        this.otpOneRef.current.focus();

    };

    // * END OF COMPONENT LIFECYCLE METHODS

    render() {
        return (
            <div className="verification-code row m-0 p-0">
                
                { this.imageSection() }

                { this.formSection() }

            </div>
        );
    }
}
