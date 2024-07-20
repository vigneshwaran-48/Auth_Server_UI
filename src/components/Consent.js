import React from "react";
import { json, useLoaderData } from "react-router-dom";
import { OAuthAPI } from "../api/OAuthAPI";

export const consentLoaderData = async ({ request }) => {
  const client_id = new URL(request.url).searchParams.get("client_id");
  const scope = new URL(request.url).searchParams.get("scope");
  const state = new URL(request.url).searchParams.get("state");

  const consentDataResponse = await OAuthAPI.getConsentData(client_id, scope);
  const consentData = consentDataResponse.consentData;
  consentData.state = state;
  return json(consentData);
};

const Consent = () => {
  const loaderData = useLoaderData();

  console.log(loaderData);

  const clientScopes = loaderData.clientScopes;

  const clientScopesElems = clientScopes
    ? clientScopes.map((clientScope, key) => {
        return (
          <div
            className="client-with-scope"
            key={`client-scope-${clientScope.clientId}`}
          >
            <p className="client-name">{clientScope.clientName}</p>

            <div className="client-scopes-list y-axis-flex">
              {clientScope.scopeDetails.map((scope, scopeKey) => (
                <label
                  key={`client-${clientScope.clientId}-scope-${scopeKey}`}
                  htmlFor={`client-${clientScope.clientId}-scope-${scopeKey}`}
                  className="consent-scope-label x-axis-flex"
                >
                  <input
                    id={`client-${clientScope.clientId}-scope-${scopeKey}`}
                    type="checkbox"
                    name="scope"
                    value={scope.name}
                    defaultChecked={scope.alreadyAllowed}
                  />
                  <p>{scope.description}</p>
                </label>
              ))}
            </div>
          </div>
        );
      })
    : "";

  return (
    <form
      className="consent-form y-axis-flex"
      action="/oauth2/authorize"
      method="post"
    >
      <input type="hidden" name="client_id" value={loaderData.clientId} />
      <input type="hidden" name="state" value={loaderData.state} />
      <div className="vapps-client-header x-axis-flex">
        <img
          src="/app-icon.png"
          width="100px"
          alt="Vapps Authorization Server Logo"
        />
        <span className="plus">+</span>
        <img
          src="/client-app.png"
          width="100px"
          alt="Client application's Logo"
        />
      </div>
      <p className="consent-form-message">
        <b>Hi {loaderData.userName},</b> {loaderData.clientName} wants to access
        your account <b>{loaderData.userEmail}</b>
      </p>
      <div className="client-container y-axis-flex">
        <p>Below are the permissions it needs</p>
        {clientScopesElems}
    </div>
      <div className="consent-form-warn-message-container">
        <p className="consent-form-warn-message">
          Make sure you trust {loaderData.clientName}
        </p>
        <p>You may be sharing sensitive data with the site or app</p>
      </div>
      <div className="consent-form-button-container x-axis-flex">
        <button className="approve-button">Approve</button>
        <button className="deny-button">Deny</button>
      </div>
    </form>
  );
};

export default Consent;
