import React, { Component } from 'react'
import { FaPlus, FaSearch, FaTimes, FaMapMarkerAlt, FaRegCalendarAlt, FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';


import Sidebar from '../../../Components/Sidebar/Sidebar';
import "../../../Assets/Styling/Pages/User/Dashboard/Announcements.css";
import Services from "../../../Utils/Services";
import moment from 'moment';
import axios from 'axios';
import UrlConstants from '../../../Utils/UrlConstants';
import { toast } from 'react-toastify';
import ReactTagInput from '@pathofdev/react-tag-input';

export default class Announcements extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            searchBar: "",
            addAnnouncementsSection: false,
            addAnnouncementError: "",


            // ? add-announcement-form
            subject: "",
            category: "",   // * ANNOUNCEMENT || EVENT || REMINDER 
            description: "",
            notifyTo: "",   // * ALL_MEMBERS || CHOOSE_MEMBERS

            notifyingMembers: [],

            // ? event options
            date: "",
            time: "",
            location: "",

            // ? reminder options
            reminderDate: "",

            // ? ANNOUNCEMENTS
            announcements: [],

            // ? COMMENTS
            commentsSection: false,
            selectedAnnouncement: "",
            commentReply: "",

        };

    }

    // ? NON-RENDERING METHOD
    
    // ? Method to toggle the add announcements section
    toggleAddAnnouncements = () => {

        this.setState({
            addAnnouncementsSection: !this.state.addAnnouncementsSection,
        });

    };
    // * End of toggleAddAnnouncements();

    // ? Handle input change
    handleInputChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        });

    };
    // * End of handleInputChange()

    // ? Handle Category select change
    handleCategorySelect = (value) => {

        this.setState({
            category: value,
        });

    };
    // * End of handleCategorySelect();


    // ? Add Announcements API Call
    addAnnouncementAPI = (event) => {

        event.preventDefault();

        var { subject, category, description, notifyTo } = this.state;

        if(subject === "") {

            this.setState({
                addAnnouncementError: "* Please enter Subject",
            });

        } else if(category === "") {

            this.setState({
                addAnnouncementError: "* Please select Category",
            });

        } else if(description === "") {

            this.setState({
                addAnnouncementError: "* Please enter Description",
            });

        } else if (notifyTo === "") {

            this.setState({
                addAnnouncementError: "* Please select whom to Notify to",
            });

        } else {

            var user = Services.getSavedUser();

            if(!user) {

                window.location = "/login"

            }

            var reqBody = {
                subject,
                category,
                description,
                notifyTo,
                email: user.user,
            };


            if(category === "EVENT") {

                reqBody["date"] = moment(this.state.date, "yyyy-mm-dd").format("DO MMM, YYYY");
                reqBody["time"] = this.state.time;
                reqBody["location"] = this.state.location;

            }

            if(category === "REMINDER") {

                reqBody["date"] = moment(this.state.reminderDate, "yyyy-mm-dd").format("DO MMM, YYYY");

            }

			if(notifyTo === "CHOOSE_MEMBERS") {

				reqBody["notifiedPeople"] = this.state.notifyingMembers;
					
			}

            console.log({
                reqBody,
            });
        

            axios
                .post(
                    UrlConstants.createAnnouncement,
                    reqBody
                )
                .then((response) => {

                    if(response?.data?.status) {

                        this.toggleAddAnnouncements();

						this.setState({
							addAnnouncementError: "",
							subject: "",
							category: "",   // * ANNOUNCEMENT || EVENT || REMINDER 
							description: "",
							notifyTo: "",   // * ALL_MEMBERS || CHOOSE_MEMBERS
							notifyingMembers: [],
							date: "",
							time: "",
							location: "",
							reminderDate: "",
						})
                        this.componentDidMount();

                        toast.success("Announcement created Successfully");

                    } else {

                        toast.error("Error creating announcement. Please try again later!");

                    }


                })
                .catch((error) => {

                    console.log("ERROR CREATING ANNOUNCEMENTS: ", error);

                    toast.error("Error creating announcement. Please try again later!");

                })

        }

    };
    // * End of addAnnouncementAPI

    // ? Add Comment API
    addCommentAPI = (event) => {

        event.preventDefault();

        if(this.state.commentReply === "") {

            toast.error("Reply cannot be empty");

        } else {

            var user = Services.getSavedUser();

            var reqBody = {
                email: user.user,
                description: this.state.commentReply,
                announcement: this.state.selectedAnnouncement.id,
            };

            axios
                .post(
                    UrlConstants.createComment,
                    reqBody
                )
                .then((response) => {

                    if(response?.data?.status) {

                        this.componentDidMount();

                        this.setState({
                            selectedAnnouncement: this.state.selectedAnnouncement,
                            commentReply: "",
                        })

                    } else {

                        toast.error("Error Commenting to the Announcement!");
                        
                    }
                    
                })
                .catch((error) => {
                    
                    toast.error("Error Commenting to the Announcement!");

                })

        }


    }
    // * End of addCommentAPI

    // * END OF NON-RENDERING METHOD


    // ? RENDRING METHODS 


    // ? Comments Section
    renderCommentsSection = () => {

        var announcement = this.state.selectedAnnouncement;

        var renderComments = () => {

            return announcement.comments.map((comment) => {

                return(

                    <div className="single-comment">
    
                        <div className="heading-section">
                                    
                            <div className="name-section">
                                <div className="announcement-letter-section">
                    
                                    <span className="announcement-letter">
                    
                                        { String(comment?.name)[0] }
                    
                    
                                    </span>
                    
                                 </div>
                    
                                &nbsp;
                    
                                <b>{ comment?.name }</b>
                            </div>  

                            <div className="date-section">

                                <span>{ moment.unix(announcement.publishedDate).format("D MMM, yyyy  hh:mm A") }</span>

                            </div>

                        </div>

                        <div className="comment-content-section">
                            
                            <span>
                                { comment.description }
                            </span>
                                
                        </div>
    
                    </div>
    
                );

            })


        }


        if(this.state.commentsSection) {

            return(
            
                <div className="comments-section col-4 m-0 p-0">
                    
                    <div className="comments-header"/>

                    <div className="comments-inner">
                        
                        <div>
                        <div className="comments-list-section">

                            <div className="subject-section">

                                    <div className="text-section">

                                        <div className="announcement-letter-section">

                                            <span className="announcement-letter">

                                                { String(announcement?.publishedBy?.firstName)[0] }


                                            </span>

                                         </div>
                                            
                                        &nbsp;

                                        <b>{ announcement?.publishedBy?.firstName }</b>

                                    </div>

                                    <div className="date-section">

                                        <span>{ moment.unix(announcement.publishedDate).format("D MMM, yyyy  hh:mm A") }</span>
                                        
                                        &nbsp;&nbsp;

                                        <FaTimes 
                                            className="comments-close-btn"
                                            onClick={() => {
                                                this.setState({
                                                    commentsSection: false,
                                                    selectedAnnouncement: "",
                                                })
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="comments-inner-list">

                                <div className="heading-section">

                                    <span className="heading-text">
                                        Comments
                                    </span>

                                    <span>
                                        { announcement.comments.length } replies
                                    </span>

                                </div>

                                { renderComments() }

                            </div>


                        </div> 

                        <form 
                            className="comment-input-section"
                            onSubmit={ (event) => this.addCommentAPI(event) }
                        >
                            <textarea 
                                value={ this.state.commentReply }
                                onChange={ (event) => this.setState({ commentReply: event.target.value }) }
                                placeholder={
                                    (announcement.comments.length === 0)
                                    ? "Be the first to comment"
                                    : "Type a Comment"
                                }
                            />
                            
                            <button 
                                className="send-btn-section"
                                type="submit"
                            >

                                <FaPaperPlane 
                                    size={ 20 }
                                />

                            </button>
                        </form>

                    </div>

                    </div>

            )

        }

    }
    // * End of renderCommentsSection

    // ? Announcements Section
    announcementsSection = () => {

        var renderAnnouncementFooter = (announcement) => {

            if(announcement.category !== "ANNOUNCEMENT") {

                return (
                    
                    <>
                        
                        <hr />

                        <div className="announcement-footer">
                            <span><FaRegCalendarAlt />&nbsp;{ announcement?.date }</span>
                            {

                                announcement.category === "EVENT"
                                ? <span><FaMapMarkerAlt />&nbsp;{ announcement?.location }</span>
                                : ""
                            
                            }
                        </div>

                    </>
                );

            }

        }

        var renderAnnouncementPosts = () => {

            var { announcements } = this.state;

            return announcements.map((announcement) => {

                return(
                    
                    <div 
                        className="announcement-post row"
                        onClick={ () => this.setState({
                            selectedAnnouncement: announcement,
                            commentsSection: true,
                        }) }    
                    >

                        <div className="col-1 m-0 p-0 announcement-letter-section">
 
                            <span className="announcement-letter">
 
                                { String(announcement?.publishedBy?.firstName)[0] }
 
                            </span>

                        </div>

                        <div className="col m-0 p-0">

                            <div className="announcement-post-header">

                                <div>
                                    <span className="subject-text">

                                        { announcement.subject }
                                    
                                    </span>
                                </div>

                                <div className="date-section">

                                    <span className="comments-count-span">
										<FaRegCommentDots />&nbsp;{ announcement.comments.length }
									</span>
                                    <span>{ moment.unix(announcement.publishedDate).format("D MMM, yyyy") }</span>

                                </div>

                            </div>

                            <div className="announcement-desc-section">
                                
                                <span>

                                    { announcement.description }
                                
                                </span>

                            </div>

                            { renderAnnouncementFooter(announcement) }
                            

                        </div>

                    </div>


                )

            });

        }

        return(

            <div className="announcements-section col m-0 p-0">
                
                <div className="announcements-header">

                    <span className="announcements-header-text">

                        Announcement
                    
                    </span>

                </div>

                <div className="announcements-sub-header">

                    <div className="search-bar-section">

                        <div className="search-bar">
                            
                            <FaSearch />

                            &nbsp;

                            <input
                                onChange={ (event) => this.handleInputChange(event) }
                                value={ this.state.searchBar }
                                name="searchBar"
                                placeholder="Search"
                                className="search-input"
                            />

                        </div>

                    </div>
                    
                    <div className="add-btn-section">

                        <button 
                            className="add-announcements-btn"
                            onClick={ () => this.toggleAddAnnouncements() }    
                        >
                            
                            <FaPlus />
                            
                            &nbsp;
                            
                            Add Announcement

                        </button>

                    </div>

                </div>

                <div className="announcement-posts-section">

                    { renderAnnouncementPosts() }

                </div>

            </div>

        );

    };
    // * End of announcementsSection();

    // ? Add announcements sliding bar
    backdrop = () => {

        if(this.state.addAnnouncementsSection) {

            return(
                
                <>
                    <div 
                        className="add-announcement-backdrop" 
                        onClick={ () => this.toggleAddAnnouncements() }    
                    />
                </>    

            );

        }

    };
    // * End of addAnnouncementsSection();

    // ? Add announcements sliding bar
    addAnnouncementsSection = () => {

        if(this.state.addAnnouncementsSection) {

            return(
                
                <>
                    <div className={ `add-announcement-slider ${ (this.state.addAnnouncementsSection) ? "open" : "" }` }>
                        
                        <div className="add-announcement-slider-inner">
                        
                            <div className="slider-header">

                                <span className="slider-header-text">
                                    Add New Announcement
                                </span>
                                
                                <div 
                                    className="slider-close-section"
                                    onClick={ () => this.toggleAddAnnouncements() }    
                                >
                                    <FaTimes />
                                </div>
                            </div>

                            <br />
                            <br />


                            <form
                                className="add-announcement-form"
                                onSubmit={ (event) => this.addAnnouncementAPI(event) }
                            >

                                <label className="label-text">
                                    Subject
                                </label>
                                <br />
                                <input 
                                    onChange={ (event) => this.handleInputChange(event) }
                                    value={ this.state.subject }
                                    name="subject"
                                    placeholder="Subject"
                                    className="add-announcement-input"
                                />

                                <br />
                                <br />

                                <label className="label-text">
                                    Select Category
                                </label>
                                <div className="category-select-section">

                                    <div 
                                        className="category-selector" 
                                        onClick={ () => this.handleCategorySelect("ANNOUNCEMENT") }
                                        style={{
                                            borderColor: (this.state.category === "ANNOUNCEMENT") ? "var(--primary-green)" : "",
                                            color: (this.state.category === "ANNOUNCEMENT") ? "var(--primary-green)" : "",
                                            backgroundColor: (this.state.category === "ANNOUNCEMENT") ? "#eefaf2" : "",
                                        }}
                                    >
                                            <span>Announcement</span>
                                    </div>

                                    <div 
                                        className="category-selector" 
                                        onClick={ () => this.handleCategorySelect("EVENT") }
                                        style={{
                                            borderColor: (this.state.category === "EVENT") ? "var(--primary-green)" : "",
                                            color: (this.state.category === "EVENT") ? "var(--primary-green)" : "",
                                            backgroundColor: (this.state.category === "EVENT") ? "#eefaf2" : "",
                                        }} 
                                    >
                                            <span>Event</span>
                                    </div>

                                    <div 
                                        className="category-selector" 
                                        onClick={ () => this.handleCategorySelect("REMINDER") }
                                        style={{
                                            borderColor: (this.state.category === "REMINDER") ? "var(--primary-green)" : "",
                                            color: (this.state.category === "REMINDER") ? "var(--primary-green)" : "",
                                            backgroundColor: (this.state.category === "REMINDER") ? "#eefaf2" : "",
                                        }}     
                                    >
                                            <span>Reminder</span>
                                    </div>
                                </div>

                                <br />

                                { this.eventOptions() }

                                { this.reminderOptions() }

                                <br />

                                <label className="label-text">
                                    Description
                                </label>
                                <br />
                                <textarea 
                                    onChange={ (event) => this.handleInputChange(event) }
                                    value={ this.state.description }
                                    name="description"
                                    className="add-announcement-input"
                                />

                                <br />
                                <br />

                                <label className="label-text">
                                    Notify To
                                </label>

                                <div>

                                    <div
                                        className="notify-to-checkbox-section"
                                        onClick={ () => this.setState({ notifyTo: "ALL_MEMBERS" }) }
                                    >
                                        <input 
                                            type="checkbox"
                                            checked={ (this.state.notifyTo === "ALL_MEMBERS") ? true : false }
                                            onClick={ () => this.setState({ notifyTo: "ALL_MEMBERS" }) }
                                        />
                                        &nbsp;
                                        <span>
                                            To All Members
                                        </span>
                                    </div>

                                    <div
                                        className="notify-to-checkbox-section"
                                        onClick={ () => this.setState({ notifyTo: "CHOOSE_MEMBERS" }) }
                                    >
                                        <input 
                                            type="checkbox"
                                            checked={ (this.state.notifyTo === "CHOOSE_MEMBERS") ? true : false }
                                            onClick={ () => this.setState({ notifyTo: "CHOOSE_MEMBERS" }) }
                                        />
                                        &nbsp;
                                        <span>
                                            Choose Members
                                        </span>
                                    </div>

                                    <div
                                        // onClick={ () => this.setState({ notifyTo: "CHOOSE_DEPT" }) }
                                    >
                                        <input 
                                            type="checkbox"
                                            disabled
                                        />
                                        &nbsp;
                                        <span>
                                            Choose Department/Role
                                        </span>
                                    </div>

                                </div>

                                <br />

                                { this.notifyToOptions() }


                                <span className="add-announcement-error-text">
                                    { this.state.addAnnouncementError }
                                </span>

                                <br/>
                                <br/>

                                <div className="add-announcement-btn-section">

                                    <button 
                                        className="discard-btn"
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        className="send-btn"
                                        type="submit"
                                    >
                                        Send
                                    </button>
                                </div>
                                        
                            </form>
                        </div>

                    </div>
                </>    

            );

        }

    };
    // * End of addAnnouncementsSection();


    // ? Method to render the Event options
    eventOptions = () => {

        if(this.state.category === "EVENT") {

            return(

                <div className="event-options-section">
                    
                    <div className="w-50 event-options-input-section">

                        <label className="label-text">Date</label>

                        <br />

                        <input 
                            type="date"
                            className="add-announcement-input"
                            name="date"
                            value={ this.state.date }
                            onChange={ (event) => this.handleInputChange(event) }
                        />

                    </div>
                    <div className="w-50">
                        
                        <label className="label-text">Time</label>
                        
                        <br />
                        
                        <input
                            type="time"
                            className="add-announcement-input"
                            name="time"
                            value={ this.state.time }
                            onChange={ (event) => this.handleInputChange(event) }
                        />

                    </div>


                    <div className="w-100 mt-3">

                        <label className="label-text">Location</label>

                        <br />

                        <input
                            type="text"
                            className="add-announcement-input"
                            name="location"
                            value={ this.state.location }
                            onChange={ (event) => this.handleInputChange(event) }
                        />

                    </div>

                </div>

            );

        }

    };
    // * End of eventOptions();

    // ? Method to render the Reminder options
    reminderOptions = () => {

        if(this.state.category === "REMINDER") {

            return(

                <div className="reminder-options-section">
                    
                    <div className="w-50 reminder-options-input-section">

                        <label className="label-text">Date</label>

                        <br />

                        <input 
                            type="date"
                            className="add-announcement-input"
                            name="reminderDate"
                            value={ this.state.reminderDate }
                            onChange={ (event) => this.handleInputChange(event) }
                        />

                    </div>

                </div>

            );

        }

    };
    // * End of reminderOptions();

    // ? Method to render the Notify to options
    notifyToOptions = () => {

        if(this.state.notifyTo === "CHOOSE_MEMBERS") {

            return(

                <div className="reminder-options-section">
                    
                    <div className="w-100 reminder-options-input-section">

                        <label className="label-text">Enter Email addresses</label>

                        <br />

                        <ReactTagInput
                          	tags={ this.state.notifyingMembers } 
                          	placeholder="Type and press enter"
                          	editable={true}
                          	readOnly={false}
                          	removeOnBackspace={true}
                          	onChange={(newTags) => this.setState({ notifyingMembers: newTags })}
                          	validator={(value) => {
								var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        
								if (!emailRegex.test(value)) {

									alert("Please enter a valid e-mail address");

									return false;
								}
                          	  // Retxurn boolean to indicate validity
                          	  return true;
                          	}}
                        />

                    </div>

                </div>

            );

        }

    };
    // * End of notifyToOptions();

    
    // ? Get Announcements
    getAnnouncements = () => {

        var user = Services.getSavedUser();

        if(!user) {

            window.location = "/login"

        }

        var reqBody = {
            email: user.user,
        };

        console.log(" REQ BODY:: ", reqBody);

        axios
            .post(
                UrlConstants.getAnnouncements,
                reqBody
            )
            .then((response) => {

                if(response?.data?.status) {

                    this.setState({
                        announcements: response?.data?.data,
                    });

                } else {

                    console.log("ERROR RESPONSE:: ", response);

                    toast.error("Error getting Announcements! Please try again later");

                }


            })
            .catch((error) => {

                console.log("ERROR ERROR:: ", error);


                toast.error("Error getting Announcements! Please try again later    ");

            })  


    };
    // * End of getAnnouncements()


    
    // * NON-RENDRING METHODS



    // ? COMPONENT LIFECYCLE METHODS

    componentDidMount = () => {

        this.getAnnouncements();

    };

    // * END OF COMPONENT LIFECYCLE METHODS

    render() {
    
        return (
    
            <>
                <div className="announcements row w-100 m-0 p-0">

                    <Sidebar />

                    { this.announcementsSection() }

                    { this.renderCommentsSection() }

                    { this.backdrop() }
                </div>
                    { this.addAnnouncementsSection() }

            </>
        );
    
    }
}
