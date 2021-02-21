import {ITweet} from './types'



export async function fetchTweets(searchTerm: string): Promise<Array<ITweet>> {
  try {

    const url = new URL('/.netlify/functions/search', location.href)
    url.searchParams.set('q', searchTerm)
    url.searchParams.set('count', '20')

    const response = await fetch(url.toString())
    const {statuses} = await response.json()
    return statuses
  } catch (err) {
    console.error('error fetching tweets:', err)
    return []
  }
}
