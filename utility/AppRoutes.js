export const RoutesManager = {

    loginPage: "/oauth",
    signUpPage: "/oauth/sign-up",
    home: "/"
}

export const ServerAPIManager = {
    
    resourceServerBase: `http://${window.location.hostname}:9393`,
    userCreateAPI: "/api/user",
    userInfoAPI: "/api/user/me",
    userLoginAPI: "/authenticate"
}