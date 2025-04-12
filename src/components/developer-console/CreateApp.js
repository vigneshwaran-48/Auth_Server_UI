import React, { useState } from "react";
import { Common } from "../../utility/Common";
import { Form, redirect, useNavigation } from "react-router-dom";
import RequireAuth from "../../utility/RequireAuth";
import { ClienAPI } from "../../api/ClientAPI";

const maxLengthObj = {
  name: 10,
}
const validFieldBorderColor = "rgba(0, 0, 0, 0.2)";

export const createAppLoader = async ({ params }) => {
  await RequireAuth();
}

export const createAppAction = async ({ params, request }) => {

  await RequireAuth();
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data) {
    data.enablePKCE = data.enablePKCE === "on";
    data.showConsentScreen = data.showConsentScreen === "on";
    const response = await ClienAPI.createClientApp(data);
    if (response.ok) {
      const data = await response.json();
      Common.showSuccessPopup("Client created successfully", 3);
      return redirect("../list/" + data.clientId);
    }
    else if (response.status === 400) {
      const data = await response.json();
      Common.showErrorPopup(data.error, 3);
    }
    else {
      Common.showErrorPopup("Error while creating client", 3);
    }
  }
  return null;
}
const CreateApp = () => {

  const [fieldState, setFieldState] = useState({
    clientName: true,
    clientSecret: true,
    scopes: true,
    redirectUris: true,
    enablePKCE: true,
    showConsentScreen: true,
  });

  const navigation = useNavigation();

  const handleChange = async event => {
    const { name, value } = event.target;
    let fieldStateValue = true;

    if (maxLengthObj[name] &&
      !Common.checkLength(value, Common.minNameLength, maxLengthObj.name)) {
      fieldStateValue = false;
    }

    const clientNameRegex = /^[a-zA-Z0-9.]+$/;
    if (name === "clientName" && (!clientNameRegex.test(value) || await ClienAPI.isClientNameExists(value))) {
      fieldStateValue = false;
    }

    setFieldState(prevState => {
      return {
        ...prevState,
        [name]: fieldStateValue
      }
    });
  }

  return (
    <div
      className="developer-console-child developer-console-create-app y-axis-flex">
      <h3>Create your App</h3>

      <Form
        className="client-app-create-form y-axis-flex"
        method="post"
        replace
      >
        <div className="client-app-input-wrapper">
          <label>App Name</label>
          <input
            name="clientName"
            placeholder="App name"
            onChange={handleChange}
            style={{
              borderColor: fieldState.clientName ? validFieldBorderColor : "red"
            }}
          />
        </div>
        <div className="client-app-input-wrapper">
          <label>Secret</label>
          <input
            name="clientSecret"
            type="password"
            placeholder="Secret"
            onChange={handleChange}
            style={{
              borderColor: fieldState.clientSecret ? validFieldBorderColor : "red"
            }}
          />
        </div>
        <div className="client-app-input-wrapper">
          <label>Scopes</label>
          <input
            name="scopes"
            placeholder="openid,Todo.read,..."
            onChange={handleChange}
            style={{
              borderColor: fieldState.scopes ? validFieldBorderColor : "red"
            }}
          />
        </div>
        <div className="client-app-input-wrapper">
          <label>Redirect URIs</label>
          <input
            name="redirectUris"
            placeholder="https://vapps-client.com/home"
            onChange={handleChange}
            style={{
              borderColor: fieldState.redirectUris ?
                validFieldBorderColor : "red"
            }}
          />
        </div>
        <div className="client-app-checkbox-wrapper">
          <label htmlFor="client-app-enable-pkce-id">Enable PKCE</label>
          <input
            id="client-app-enable-pkce-id"
            type="checkbox"
            name="enablePKCE"
            onChange={handleChange}
            style={{
              borderColor: fieldState.enablePKCE ?
                validFieldBorderColor : "red"
            }}
          />
        </div>
        <div className="client-app-checkbox-wrapper">
          <label htmlFor="client-app-enable-consent-id">Show Consent Page</label>
          <input
            id="client-app-enable-consent-id"
            type="checkbox"
            name="showConsentScreen"
            onChange={handleChange}
            defaultChecked
            style={{
              borderColor: fieldState.showConsentScreen ?
                validFieldBorderColor : "red"
            }}
          />
        </div>
        <button
          className="common-button client-app-create-button"
          disabled={navigation.state === "submitting"}
        >{navigation.state === "submitting" ? "Submitting" : "Create"}</button>
      </Form>
    </div>
  )
}

export default CreateApp;
