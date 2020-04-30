## Twitch Followers

    [Image of Twitch Followers](https://i.imgur.com/Gedd4uj.png)

    Find out who user's follow on Twitch.tv. Includes pagination, recently search
    stored in local storage and a fun navigational ui. Twitch Followers uses deno
    for the backend and ReactJS for the front!

## How to: Use it yourself

    What you'll need installed:
        1. Deno
        2. NodeJS

    How to use:
        Frontend:
            1. npm install
            2. npm start
            3. Open browser @ http://localhost:3000

        Backend:
            1. Create .env file in root directory @ backend folder
            2. Create "CLIENT" variable in enviroment which refers to your Twitch client id
            3. deno --allow-net --allow-read main.ts
