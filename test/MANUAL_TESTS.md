
# Manual Tests

Some manual tests that we have run.

## branch: feat-add-request-route-state

* Logout
* Navigate manually to a private page e.g. localhost:5000/private
* Assert: the browser will redirect to the configured unauthorized redirect route (e.g. index)
* Click the Login button
* Assert: the browser will redirect to the authorization server.
* Login at the authorization server.
* Assert: the browser will redirect to the original private page.

We tested this on the git@github.com:aurelia-contrib/aurelia-open-id-connect-demos.git repository apps.
