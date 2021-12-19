var Services = {

    getSavedUser: () => {

        let savedUser = JSON.parse(localStorage.getItem("user"));

        if(savedUser === null) {

            window.location = "/login";

            return false;


        } else {

            return savedUser;

        }

    },

};

module.exports = Services