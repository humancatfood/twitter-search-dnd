import React, {useEffect, useState} from 'react';
import './App.css';


interface IUser {
  name: string
  screen_name: string
  profile_image_url_https: string
}

interface ITweet {
  id: number
  user: IUser
  created_at: string
  text: string
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

async function fetchTweets(searchTerm: string): Promise<Array<ITweet>> {
  try {
    const response = await fetch(`/.netlify/functions/search?q=${searchTerm}`)
    const {statuses} = await response.json()
    return statuses
  } catch (err) {
    console.error('error fetching tweets:', err)
    return []
  }
}


function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [tweets, setTweets] = useState<Array<ITweet>>([])
  const [savedTweets, setSavedTweets] = useState<Array<ITweet>>([])


  useEffect(() => {
    if (searchTerm) {
      fetchTweets(searchTerm)
        .then(setTweets)
    }
  }, [searchTerm])


  function onSubmit (e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault()
    const form = e.currentTarget as HTMLElement
    const input = form.querySelector('[name="searchterm"]') as HTMLInputElement
    setSearchTerm(input.value)
  }

  function onSaveTweet (tweet: ITweet) {
    setSavedTweets(prev => ([
      ...prev.filter(inList => inList.id !== tweet.id),
      tweet,
    ]))
  }

  function onDeleteTweet (tweet: ITweet) {
    setSavedTweets(prev => prev.filter(inList => inList.id !== tweet.id))
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
