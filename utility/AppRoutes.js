export const RoutesManager = {

    loginPage: "/oauth",
    signUpPage: "/oauth/sign-up",
    home: "/"
}

let appRoutes = {};

export const ServerAPIManager = {
    
    resourceServerBase: `http://${window.location.hostname}:9393`,
    userCreateAPI: "/api/user",
    userInfoAPI: "/api/user/me",
    userLoginAPI: "/authenticate",

    getAppRoutes: async () => {
        if(!appRoutes || !Object.keys(appRoutes).length) {

            const response = await fetch("/api/utility/get-routes");
            const data = await response.json();
            appRoutes = data;
        }
        return appRoutes;
    }
}