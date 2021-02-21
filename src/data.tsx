import {useEffect, useState} from 'react';

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


export function useTweetSearch(searchTerm: string): [Array<ITweet>, Boolean] {
  const [tweets, setTweets] = useState<Array<ITweet>>([])
  const [isLoading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      fetchTweets(searchTerm)
        .then(setTweets)
        .finally(() => setLoading(false))
    }
  }, [searchTerm])

  return [tweets, isLoading]

}