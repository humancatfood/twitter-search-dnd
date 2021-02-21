const Twit = require('twit')

const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  app_only_auth: true,
  timeout_ms: 60*1000,
})

exports.handler = async function(event) {

  const {q='', count=25} = event.queryStringParameters

  const {data} = await twitterClient.get('search/tweets', {
    q,
    count: Math.max(1, Math.min(50, count)),
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }

}