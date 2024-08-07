import { easeInOut } from "framer-motion";

let closeOnFocusOutElems = [{
    id: "dummy",
    closeElem: () => {}
}]; 

const emailRegex = /^[\w\d]{5,15}@vapps\.com$/;
const mobileRegex = /^[\d]{8,15}$/;
let errorPopupTimeoutId = -1;
let successPopupTimeoutId = -1;

export const Common = {

    appName: "Vapps",
    appDomain: "",
    appIcon: "/app-icon.png",

    accountsSideNav: [
        {
            id: "accounts-side-nav-1",
            name: "Home",
            iconTag: <i className="bi bi-person-circle"></i>,
            link: ""
        },
        {  
            id: "accounts-side-nav-2",
            name: "Personal Info",
            iconTag: <i className="fa fa-regular fa-address-card"></i>,
            link: "personal-info"
        },
        {
            id: "accounts-side-nav-3",
            name: "Developer Console",
            iconTag: <i className="fa fa-solid fa-code"></i>,
            link: "developer-console"
        }
    ],

    loadingGif: "/gifs/loading.gif",
    maxNavOpenScreenSize: 1020,

    getCloseOnFocusOutElems: () => {
        return closeOnFocusOutElems;
    },
    
    //First param => For the main element that want to be closed.
    //Second param => callback for closing the element
    //Third param => Additional elements for checking, like in a hamburger menu
    //      case: checking that the nav element should not close when the hamburger
    //      is clicked.
    addCloseOnFocusOutElems: (id, callback, additionalCheckElems) => {
        closeOnFocusOutElems.push({id, closeElem: callback, additionalCheckElems});
    },

    checkLength: (str, min, max) => {
        return str.length >= min && str.length <= max;
    },
    minNameLength: 3,
    isValidMail: email => {
        return email.match(emailRegex);
    },
    isValidMobileNum: mobileNum => {
        return mobileNum.match(mobileRegex);
    },

    developerConsoleTopNav: [
        {
            id: "developer-console-nav-elem-1",
            name: "All Apps",
            link: "list"
        },
        {
            id: "developer-console-nav-elem-2",
            name: "Create",
            link: "create"
        }
    ],

    mainElementsFramerVariants: {
        slideFromRight: { x: "120%" },
        stay: { x: "0" },
        exit: { x: "120%" },
        elemTransition: { duration: 0.3, ease: easeInOut }
    },
    showErrorPopup: ( errorMessage, aliveDuration ) => {

        let errorPopupElem = document.querySelector(".error-popup");
        document.querySelector(".error-popup-para").innerText = errorMessage;
        errorPopupElem.classList.add("show-popup");

        errorPopupTimeoutId = setTimeout(
        () => {
            document.querySelector(".error-popup").classList.remove("show-popup");
        }, 
        aliveDuration * 1000 );
    },
    showSuccessPopup: ( errorMessage, aliveDuration ) => {

        let successPopupElem = document.querySelector(".success-popup");
        document.querySelector(".success-popup-para").innerText = errorMessage;
        successPopupElem.classList.add("show-popup");

        successPopupTimeoutId = setTimeout(
        () => {
            document.querySelector(".success-popup").classList.remove("show-popup");
        }, 
        aliveDuration * 1000 );
    },
    closeErrorPopupForce: () => {
        document.querySelector(".error-popup").classList.remove("show-popup");
        clearTimeout(errorPopupTimeoutId);
    },
    closeSuccessPopupForce: () => {
        document.querySelector(".success-popup").classList.remove("show-popup");
        clearTimeout(successPopupTimeoutId);
    },
    loginPopup: show => {
        if(show) {
            document.querySelector(".login-popup").classList.add("show-popup");
        }
        else {
            document.querySelector(".login-popup").classList.remove("show-popup");
        }
    },
    checkAndGiveDoubleDigit: value => {
        return value.length <= 1 ? "0" + value : value
    },
    POST_ERROR: 500,
    POST_SUCCESS: 200,
    IGNORE_ACTION: 1,
    defaultNothingImage: "/nothing-here.png"
}