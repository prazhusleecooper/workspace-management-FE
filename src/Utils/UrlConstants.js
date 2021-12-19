var baseURL = "http://localhost:1337/";

var UrlConstants = {

    // ? USERS
    createUserWithEmail: baseURL + "users/createUserWithEmail",
    resendVerifcationCode: baseURL + "users/resendVerifcationCode",
    verifyVerificationCode: baseURL + "users/verifyVerificationCode",
    updateNameAndPassword: baseURL + "users/updateNameAndPassword",
    login: baseURL + "users/login",

    // ? COMPANIES
    createCompany: baseURL + "companies/createCompany",

    // ? ANNOUNCEMENTS
    createAnnouncement: baseURL + "announcements/createAnnouncement",
    getAnnouncements: baseURL + "announcements/getAnnouncements",

    // ? COMMENTS
    createComment: baseURL + "comments/createComment",

};

module.exports = UrlConstants;