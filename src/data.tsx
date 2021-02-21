import {useEffect, useState} from 'react';

import useSavedItems from './utils/storage'

import Tweet from './components/Tweet'

import {ITweet} from './types'



export async function fetchTweets(searchTerm: string): Promise<Array<ITweet>> {
  try {
    const response = await fetch(`/.netlify/functions/search?q=${searchTerm}`)
    const {statuses} = await response.json()
    return statuses
  } catch (err) {
    console.error('error fetching tweets:', err)
    return []
  }
}


const useSavedTweets = () => useSavedItems<ITweet>({
  storageKey: 'saved-tweets',
  compareFn: (a, b) => String(a.id) === String(b.id),
})


function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [tweets, setTweets] = useState<Array<ITweet>>([])

  const [savedTweets, saveTweet, deleteTweet] = useSavedTweets()

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
                  onSave={() => saveTweet(tweet)}
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
                  onDelete={() => deleteTweet(tweet)}
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
