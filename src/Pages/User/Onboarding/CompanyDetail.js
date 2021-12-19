import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';


import BannerImage from "../../../Assets/Images/GetStarted/mail-box.png";
import "../../../Assets/Styling/Pages/User/Onboarding/CompanyDetail.css";
import Spinner from '../../../Components/Loaders/Spinner';
import UrlConstants from '../../../Utils/UrlConstants';


var positionArray = [];

export default class CompanyDetail extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            companyName: "",
            location: "",
            noOfEmployees: 0,
            domainName: "",
            formError: "",
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
            domainError: false,
        });

        var { companyName, location, noOfEmployees, domainName } = this.state,
            domainNameRegex = /^[a-zA-Z0-9-]*$/;


        if(
            companyName === "" ||
            location === "" ||
            noOfEmployees === "" ||
            domainName === ""
        ) {

            this.setState({
                formError: "*Please enter all the details."
            });

        } else if(!domainNameRegex.test(domainName)) {

            this.setState({
                formError: "*Please enter valid Domain Name.",
                domainError: true,
            });

        } else {

            this.setState({
                loader: true,
            });

            var reqBody = {
                companyName: companyName,
                location: location,
                noOfEmployees: parseInt(noOfEmployees),
                domainName: domainName,
            };

            axios
                .post(
                    UrlConstants.createCompany,
                    reqBody,
                )
                .then((response) => {

                    if(response?.data?.status) {

                        toast.success("Company Created");

                        this.setState({
                            loader: false,
                        });

                    } 
                    
                    if(!response?.data?.status) {

                        if(response?.data?.code === -1) {

                            this.setState({
                                loader: false,
                                formError: "*Domain name already exists!",
                            });

                        } else {

                            toast.error("Error creating company");

                            this.setState({
                                loader: false,
                            });


                        }

                    }
 
                })
                .catch((error) => {

                    toast.error("Error creating company");

                    this.setState({
                        loader: false,
                    });

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
                Setup Your Application
                </span>

                <span className="sub-text">
                    To make a workspace from scratch, please confirm your email address.
                </span>

                <form 
                    className="form"
                    onSubmit={ (event) => this.handleSubmit(event) }    
                >

                    <label className="label-text">
                        Company Name
                    </label>
                    <br />

                    <input 
                        className="form-input"
                        value={ this.state.companyName }
                        name="companyName"
                        placeholder="ABC Pvt. Ltd."
                        type="text"
                        onChange={ (event) => this.handleInputChange(event) }                            
                        autoFocus
                    />

                    <br />
                    <br />
                        
                    <div className="row m-0 p-0 ">

                        <div className="col-6 p-0">
                            <label className="label-text">
                                Location
                            </label>
                            <br />
                
                            <input 
                                className="form-input"
                                value={ this.state.location }
                                name="location"
                                placeholder="Tamil Nadu"
                                type="text"
                                onChange={ (event) => this.handleInputChange(event) }                            
                                autoFocus
                            />        
                        </div>

                        <div className="col-1" />

                        <div className="col-5 p-0">
                            <label className="label-text">
                                No. of Employees
                            </label>
                            <br />

                            <input 
                                className="form-input"
                                value={ this.state.noOfEmployees }
                                name="noOfEmployees"
                                type="number"
                                placeholder="Eg: 100"
                                onChange={ (event) => this.handleInputChange(event) }                            
                                autoFocus
                            />        
                        </div>

                    </div>

                    <br />

                    <label className="label-text">
                        Domain Name
                    </label>
                    <br />

                    <div 
                        className="domain-name-input-section"
                        style={{ borderColor: (this.state.domainError) ? "#C4250C" : "#A1A6A9" }}
                    >

                        <input 
                            className="domain-name-input"
                            value={ this.state.domainName }
                            name="domainName"
                            placeholder="Customize your domain name"
                            type="text"
                            onChange={ (event) => this.handleInputChange(event) }                            
                            autoFocus
                        />

                        <div className="domain-text-section">
                            <span>
                                .intranet.com
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
                        Next
                    </button>

                    <br />
                    <br />

                    {

                        (this.state.loader) ?
                        
                            <Spinner /> :
                        
                            ""
                            
                    }

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
            <div className="company-detail row m-0 p-0">
                
                { this.imageSection() }

                { this.formSection() }

            </div>
        );
    }
}
