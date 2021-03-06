# Twitter Search Drag'n'Drop

## How to see it in action

Either go [here](https://tweet-saver.netlify.app/), or follow the steps below to run locally.

- *Search tweets:*

  Type into the search-box & press enter to search tweets.

- *Save tweets:*

  Drag a search result into the "Saved Tweets" panel or click its little check-mark icon

  To remove a saved tweet, drag it out of the "Saved Tweets" panel or click its little cross icon


## How to run locally:

1. Sign up for a twitter developer account
2. Create a new app and generate an API key and secret (app-only permissions is fine)
3. clone this repository
4. in the repo, make a copy of `.env.example`, save it as `.env`
5. replace the example env vars with your twitter API key and secret
5. run `npm install` or `yarn install`
6. run `npm run dev` or `yarn dev`
7. in the Browser, navigate to `localhost:8080`
