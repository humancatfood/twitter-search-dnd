import React, {ReactElement, CSSProperties} from 'react'
import styled from 'styled-components'
import {Droppable, Draggable, DroppableProvided, DraggableProvided, DraggableStateSnapshot} from 'react-beautiful-dnd'

import {ITweet} from '../types'
import Tweet from './Tweet'


type TweetListProps = {
  tweets: Array<ITweet>,
  droppableId: string,
  placeholder?: string,
  onSaveTweet?: (tweet: ITweet) => void,
  onDeleteTweet?: (tweet: ITweet) => void,
}

const List = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  height: '100%',
  position: 'relative',
})

const ListItem = styled.li({
  padding: '0.5rem',
  marginBottom: '0.5rem',
  borderBottom: '1px solid lightgrey',
})

const Placeholder = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0.3,
  textAlign: 'center',
  fontWeight: 'bolder',
  lineHeight: 1.4,
  maxWidth: '60%',
})

const getItemStyle = (isDragging: boolean, draggableStyle: CSSProperties): CSSProperties => ({
  userSelect: 'none',
  transition: 'all 200ms ease-in-out',
  ...(isDragging && {
    borderRadius: '4px',
    background: 'rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(6px)',
    boxShadow: '6px 6px 8px 2px rgba(0, 0, 0, 0.4)',
  }),
  ...draggableStyle,
})


function TweetList({tweets, droppableId, onSaveTweet, onDeleteTweet, placeholder}: TweetListProps): ReactElement {

  const showPlaceholder = !tweets.length

  return (
    <Droppable droppableId={droppableId}>
      {(provided: DroppableProvided) => (
        <List ref={provided.innerRef}>
          {showPlaceholder && (
            <Placeholder>{placeholder}</Placeholder>
          )}
          {tweets.map((tweet, index) => (
            <Draggable
              key={tweet.id}
              draggableId={String(tweet.id)}
              index={index}
            >
              {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps?.style || {},
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
  )
}

export default TweetList
