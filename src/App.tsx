import React from 'react';
import './App.css';

import tweets from './tweets.json'

const savedTweets = tweets.slice(2,4)

interface ITweet {
  id: number
}

interface TweetProps {
  name: string
  handle: string
  avatar: string
  date: string
  body: string
  onSave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Tweet(props: TweetProps) {
  const {avatar, name, handle, date, body, onSave, onDelete} = props
  console.log(onSave, onDelete)
  return (
    <div>
      <img src={avatar} alt={name} />
      <div>{name} / {handle}</div>
      <small>{date}</small>
      <div>{body}</div>
      {onSave && (
        <button onClick={onSave}>Save Tweet</button>
      )}
      {onDelete && (
        <button onClick={onDelete}>Delete Tweet</button>
      )}
    </div>
  )
}


function App() {

  function onSubmit (e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault()
    const form = e.currentTarget as HTMLElement
    const input = form.querySelector('[name="searchterm"]') as HTMLInputElement
    console.log('onSubmit:', input.value)
  }

  function onSaveTweet (tweet: ITweet) {
    console.log(`saving tweet ${tweet.id}`)
  }

  function onDeleteTweet (tweet: ITweet) {
    console.log(`deleting tweet ${tweet.id}`)
  }

  return (
    <div className="App">
      <header>
        <h1>Tweet Saver</h1>
      </header>

      <div>
        <form action="#" onSubmit={onSubmit}>
          <input type="text" name="searchterm" />
          <button type="submit">🔍</button>
        </form>
        <ul>
          {
            tweets.map(tweet => (
              <li key={tweet.id}>
                <Tweet
                  name={tweet.user.name}
                  handle={tweet.user.screen_name}
                  avatar={tweet.user.profile_image_url_https}
                  date={tweet.created_at}
                  body={tweet.text}
                  onSave={() => onSaveTweet(tweet)}
                />
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <h2>Saved Tweets</h2>
        <ul>
          {
            savedTweets.map(tweet => (
              <li key={tweet.id}>
                <Tweet
                  name={tweet.user.name}
                  handle={tweet.user.screen_name}
                  avatar={tweet.user.profile_image_url_https}
                  date={tweet.created_at}
                  body={tweet.text}
                  onDelete={() => onDeleteTweet(tweet)}
                />
              </li>
            ))
          }
        </ul>
      </div>

    </div>
  );
}

export default App;
