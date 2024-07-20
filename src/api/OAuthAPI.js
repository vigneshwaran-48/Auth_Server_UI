import { ServerAPIManager } from "../utility/AppRoutes";

export const OAuthAPI = {
 
    getConsentData: async (clientId, scopes) => {
        const routes = await ServerAPIManager.getAppRoutes();
        const url = routes.oauth.consent;
        
        const response = await fetch(`${url}?clientId=${clientId}&scopes=${scopes}`, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });
        return await response.json();
    }
}