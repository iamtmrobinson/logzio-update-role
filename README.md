# Programmatically upgrade Logz.io user permissions to Admin

Logz.io do not offer a service to batch update users to admin status, this script does that for all users in an org.

## Installation and running the script

- Clone the repo and `npm install`
- Goto [the API tokens page in logz.io](https://app.logz.io/#/dashboard/settings/api-tokens) and create or copy an existing token
- Create a `.env` file and set a variable called `LOGZ_API_TOKEN` to the API token
- Run `npm start`
