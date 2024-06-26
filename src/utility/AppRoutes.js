export const RoutesManager = {

    loginPage: "/oauth",
    signUpPage: "/oauth/sign-up",
    home: "/"
}

let appRoutes = {};

export const ServerAPIManager = {
    
    resourceServerBase: ``,
    userCreateAPI: "/api/user",
    userInfoAPI: "/api/user/me",
    userLoginAPI: "/authenticate",
    userAPI: "/api/user",
    clientAPI: userId => {
        return `/api/user/${userId}/client`
    },
    populateRoutes: routes => {
        appRoutes = routes;
    },
    getAppRoutes: async () => {
        if(!appRoutes || !Object.keys(appRoutes).length) {

            const response = await fetch("/api/utility/get-routes");
            const data = await response.json();
            appRoutes = data;
        }
        return appRoutes;
    }
}