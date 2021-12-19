import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "../Navbar/Navbar";

import GetStarted from '../../Pages/User/Onboarding/GetStarted';
import VerificationCode from '../../Pages/User/Onboarding/VerificationCode';
import CompanyDetail from '../../Pages/User/Onboarding/CompanyDetail';
import PersonalDetail from '../../Pages/User/Onboarding/PersonalDetail';
import Login from '../../Pages/User/Onboarding/Login';

import DashboardRouter from './DashboardRouter';
import Announcements from '../../Pages/User/Dashboard/Announcements';


export default class RouterComponent extends Component {

    onboardingNavBar = () => {

        var onBoardingScreens = ["/get-started", "/verfication", "company-detail", "personal-detail", "/login"];


        if(onBoardingScreens.includes(window.location.pathname)) {

            return <Navbar />;

        }

    }

    DashboardRouterInner = () => {

        return (

            <Route
                path="dashboard" 
                // element={ <DashboardRouter /> } 
                exact    
            >

                <Route 
                    path="announcements" 
                    element={ <Announcements /> } 
                    exact    
                />

            </Route>
                    
        );

    }

    render() {
        return (
            <>
                { this.onboardingNavBar() }
                
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <Routes>
                    
                    <Route 
                        path="/get-started" 
                        element={ <GetStarted /> } 
                        exact    
                    />
                    
                    <Route 
                        path="/verification" 
                        element={ <VerificationCode /> } 
                        exact    
                    />
                    
                    <Route 
                        path="/company-detail" 
                        element={ <CompanyDetail /> } 
                        exact    
                    />
                    
                    <Route 
                        path="/personal-detail" 
                        element={ <PersonalDetail /> } 
                        exact    
                    />
                    
                    <Route 
                        path="/login" 
                        element={ <Login /> } 
                        exact    
                    />
                    
                    {
                        this.DashboardRouterInner()
                    }

                </Routes>
            </>
        )
    }
};
