# Errors

1. [Refused to display ... in a frame because it set 'X-Frame-Options' to 'DENY'](#Refused-to-display-...-in-a-frame-because-it-set-'X-Frame-Options'-to-'DENY')
1. [Token Renewal Operation Failed due to timeout](#Token-Renewal-Operation-failed-due-to-timeout)
1. [Hash does not Contain State](#Hash-does-not-contain-state)
1. [AADSTS50058: A silent sign-in request was sent but no user is signed in](#AADSTS50058:-A-silent-sign-in-request-was-sent-but-no-user-is-signed-in)

## Refused to display ... in a frame because it set 'X-Frame-Options' to 'DENY'

This error occurs when calling `acquireTokenSilent`, which opens a hidden iframe to execute the token renewal. In order to prevent click-jacking the service blocks auth pages from being displayed in the iframe. If you receive this error it means the service is trying to display something in the iframe such as an error or a page expecting user interaction, such as a form.

Some B2C flows are expected to throw this error due to their need for user interaction. These flows include:

- Password reset
- Profile edit
- Sign up
- Some custom policies depending on how they are configured

### Troubleshooting Steps

- Verify you are not using a flow that requires interaction
- Open the url shown in the error in a new window and observe what the service is trying to display

### Solutions

- When opening the url from the error in a new window, if an error is shown, address the error
- Call an interactive method such as `acquireTokenRedirect` or `acquireTokenPopup`
- Open a ticket with the service

### Known-Issues

A user has multiple accounts signed into their Social Provider (e.g. Google, Facebook, etc.). This happens because the login_hint is not being passed from the B2C service to the Social Provider to tell the Federated IDP which account you are trying to get a token for. If you open the error url in a new tab and see an account selection screen, this is likely what's happening. This is being actively investigated by the B2C Service team.

## Token Renewal Operation Failed due to timeout

This error occurs when calling `acquireTokenSilent`, which opens a hidden iframe to execute the token renewal. This can happen for a number of reasons, such as:

- Third party cookies are disabled (default for Safari and Chrome Incognito browsers)
- Another error occurred, such as X-Frame Options Deny, which prevented the token from being returned
- The page used as the `redirectUri` clears the hash or navigates away before the top frame can parse it

### Solutions

- If using a browser with third party cookies disabled you must call an interactive method such as `acquireTokenRedirect` or `acquireTokenPopup`
- Solve the accompanying error
- Set the `redirectUri` for the `acquireTokenSilent` call to a blank page

## Hash does not contain State

This error occurs when the hash in the url contains properties known to msal, such as `id_token`, but does not contain `state`. The `state` property is appended to token requests by msal and validated when the response is received. The most common cause of this error is that the request originated from an invite link that was not built by msal.

### Troubleshooting Steps

- Check your network trace for the /authorize request
- Verify `state` is included in the request
- Verify `state` is included in the response
- If `state` is not included in the request, verify the request was built by msal
- If `state` is included in the request, open a ticket with the service team to find out why it is not being returned in the response

### Solutions

- If using an invite link, send the user to your app running msal first and let msal build the token request. If additional query parameters are needed to complete the sign-up flow you can include them in `extraQueryParameters` on the request

## AADSTS50058: A silent sign-in request was sent but no user is signed in

This error can occur when MSAL.js sends a silent request (`acquireTokenSilent`) to Azure AD to get a new `access_token` or `id_token` but there is no valid authentication cookie representing a user session sent along with the request. As a result, Azure AD cannot identify the user and returns the above error. One of the following might be the reason for the cookie not being present:

* **Cookie Expired**: If the authentication cookie set by Azure AD in the browser when user logged in is expired or deleted. Usually, the cookie is valid until browsing session is valid which means closing the browser or leaving the browser idle for extended time can delete/expire the cookie.  

**Solution:** User needs to check the "Keep Me Signed In" checkbox on the sign-in screen if the authentication session should be persisted for longer period of time. Otherwise, application needs to log back the user in to create a new session.

* **Using IE/Edge**: The silent token acquisition in MSAL.js happens using hidden iframe. IE/Edge have security zones that prevent sending cookies in an iframe if the iframe's and main app's domains are in different security zones. This means if your app's domain and Azure AD authority url are in different security zones, browser will not send the Azure AD cookie in the iframe request.
  
**Solution:** Both app and Azure AD `authority` url need to be added in the same security zone in the browser settings.

* **3rd Party Cookies Blocked**: If the 3rd party cookies are blocked by the browser, then cookies will not be sent along in the token request. 
 
**Solution:** User (or admin) needs to allow the 3rd party cookies for MSAL.JS silent request to work as expected.

### Known Issues

- When using guest accounts, the e-mail used for sign-in may not match the e-mail used to store the account in AAD, causing the `login_hint` sent by msal as part of the request to not be correct. Configuring the `sid` claim on your `id_tokens` and passing this to your request may mitigate this issue.

### Other Potential Solutions

- Ensure your app calls one of the login methods, `loginRedirect` or `loginPopup`, before attempting to call `acquireTokenSilent`
- Call an interactive method such as `acquireTokenRedirect` or `acquireTokenPopup`
- Configure your `id_tokens` to return the `sid` claim and pass this into your request 

```javascript
// id_token retrieved from previous login or acquireToken call
const request = {
    scopes: ["User.Read"],
    sid: id_token.sid
}
msalObj.acquireTokenSilent(request)
```
