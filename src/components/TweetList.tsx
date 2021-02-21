import styled from 'styled-components'

import {ITweet} from '../types'
import Tweet from './Tweet'


type TweetListProps = {
  tweets: Array<ITweet>,
  onSaveTweet?: (tweet: ITweet) => void
  onDeleteTweet?: (tweet: ITweet) => void
}

const List = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

const ListItem = styled.li({
  padding: '0.5rem',
  marginBottom: '0.5rem',
  borderBottom: '1px solid lightgrey',
})

function TweetList({tweets, onSaveTweet, onDeleteTweet}: TweetListProps) {

  return (
    <List>
      {
        tweets.map(tweet => (
          <ListItem key={tweet.id}>
            <Tweet
              name={tweet.user.name}
              handle={tweet.user.screen_name}
              avatar={tweet.user.profile_image_url_https}
              date={tweet.created_at}
              body={tweet.text}
              onSave={onSaveTweet && (() => onSaveTweet(tweet))}
              onDelete={onDeleteTweet && (() => onDeleteTweet(tweet))}
            />
          </ListItem>
        ))
      }
    </List>
  );
}

export default TweetList;
