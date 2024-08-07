import Cookies from "js-cookie";
import { ServerAPIManager } from "../utility/AppRoutes";
import { Common } from "../utility/Common";

export const ClienAPI = {

    createClientApp : async appDetails => {

        const routes = await ServerAPIManager.getAppRoutes();
        const url = Common.appDomain + routes.client.base;
        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(url, {
                                    method: "POST",
                                    headers: {
                                        "X-XSRF-TOKEN": csrfToken,
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(appDetails)
                                });
        return response;
    },
    getClientsOfUser: async () => {

        const routes = await ServerAPIManager.getAppRoutes();
        const url = routes.client.base;
        
        const response = await fetch(url, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });
        return await response.json();
    },
    deleteClientById: async id => {
        const routes = await ServerAPIManager.getAppRoutes();
        const url = routes.client.base + "/" + id;
        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(url, {
                                    method: "DELETE",
                                    headers: {
                                        "X-XSRF-TOKEN": csrfToken
                                    },
                                });
        return response;
    },
    getClient: async id => {
        const routes = await ServerAPIManager.getAppRoutes();
        const url = routes.client.base + "/" + id;

        const response = await fetch(url, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
        return await response.json();
    },
    updateClient: async data => {
        const routes = await ServerAPIManager.getAppRoutes();
        const url = routes.client.base + "/" + data.clientId;
        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(url, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-XSRF-TOKEN": csrfToken
                                    },
                                    body: JSON.stringify(data)
                                });
        return response;
    },
    isClientNameExists: async clientName => {
        const routes = await ServerAPIManager.getAppRoutes();
        const url = routes.client.base + "/" + clientName + "/exists";
        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(url, {
                                    method: "GET",
                                    headers: {
                                        "X-XSRF-TOKEN": csrfToken
                                    }
                                });
        if (response.ok) {
            const data = await response.json();
            return data.clientExists;
        }
        return false;
    }
}