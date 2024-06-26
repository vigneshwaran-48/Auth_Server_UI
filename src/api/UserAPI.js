import { ServerAPIManager } from "../utility/AppRoutes";
import { Common } from "../utility/Common";
import Cookies from "js-cookie";

let isUserLoggedIn = true;

export const UserAPI = {

    createUser : async userData => {

        const response = await fetch(ServerAPIManager.resourceServerBase +
                                     ServerAPIManager.userCreateAPI, {
                                    method: "POST",
                                    mode: 'cors',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Access-Control-Allow-Origin": "*"
                                    },
                                    body: JSON.stringify(userData)
                                });
        return response;
    },
    isUserLoggedIn : () => {
        return isUserLoggedIn;
    },
    getCurrentUserDetails: async () => {
        const response = await fetch(ServerAPIManager.userInfoAPI);

        return response;
    },
    login: async userData => {

        const response = await fetch(ServerAPIManager.userLoginAPI, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(userData)
                                });
        
        return response;

    },
    csrf: async () => {
        const response = await fetch(Common.appDomain + ServerAPIManager.csrf);
        return response;
    },
    createUser : async userData => {

        const response = await fetch(Common.appDomain + ServerAPIManager.userAPI, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(userData)
                                });
        return response;
    },
    isUserLoggedIn : () => {
        return isUserLoggedIn;
    },
    getCurrentUserDetails: async () => {
        const response = await fetch(Common.appDomain + ServerAPIManager.userInfoAPI);

        return response;
    },
    login: async userData => {

        const response = await fetch(Common.appDomain + ServerAPIManager.userLoginAPI, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(userData)
                                });
        
        return response;

    },
    updateUser: async userData => {

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch(Common.appDomain + ServerAPIManager.userAPI, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-XSRF-TOKEN": csrfToken
                                    },
                                    body: JSON.stringify(userData)
                                });
        return response;                           
    },
    uploadImage: async (formData, userId) => {
        
        const url = ServerAPIManager.userAPI + "/" + userId + "/profile-image";

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch(Common.appDomain + url, {
                                    method: "PUT",
                                    headers: {
                                        "X-XSRF-TOKEN": csrfToken
                                    },
                                    body: formData
                                });
        return response;                        
    },
    logout: async () => {
        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch("/logout", {
                                    method: "POST",
                                    headers: {
                                        "X-XSRF-TOKEN": csrfToken
                                    } 
                                });
        return response;
    }
}