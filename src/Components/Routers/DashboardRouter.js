import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import GetStarted from '../../Pages/User/Onboarding/GetStarted';



export default class DashboardRouter extends Component {


    render() {

        return (

            <Route
                path="dashboard" 
                // element={ <DashboardRouter /> } 
                exact    
            >
                <Route 
                    path="get-started" 
                    element={ <GetStarted /> } 
                    exact    
                />

            </Route>
                    
        );

    }

};
