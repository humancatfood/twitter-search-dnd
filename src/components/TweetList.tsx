import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import {ITweet} from '../types'
import Tweet from './Tweet'


type TweetListProps = {
  tweets: Array<ITweet>,
  droppableId: string,
  onSaveTweet?: (tweet: ITweet) => void,
  onDeleteTweet?: (tweet: ITweet) => void,
}

const List = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  height: '100%',
})

const ListItem = styled.li({
  padding: '0.5rem',
  marginBottom: '0.5rem',
  borderBottom: '1px solid lightgrey',
})

const getItemStyle = (isDragging:Boolean, draggableStyle: any) => ({
  userSelect: 'none',
  transition: 'all 200ms ease-in-out',
  ...(isDragging && {
    borderRadius: '4px',
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.4)',
  }),
  ...draggableStyle,
});


function TweetList({tweets, droppableId, onSaveTweet, onDeleteTweet}: TweetListProps) {

  return (
    <Droppable droppableId={droppableId}>
      {(provided: any, snapshot: any) => (
          <List ref={provided.innerRef}>
            {tweets.map((tweet, index) => (
              <Draggable
                key={tweet.id}
                draggableId={String(tweet.id)}
                index={index}
              >
                {(provided: any, snapshot: any) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                  >
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
      )}
    </Droppable>
  );
}

export default TweetList;
