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
