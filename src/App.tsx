import React, {useMemo, useState, ReactElement} from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import {ITweet} from './types'
import * as Layout from './App.layout'
import Title from './components/Title'
import TweetList from './components/TweetList'
import SearchForm from './components/SearchForm'

import useStore from './utils/storage'
import useSearch from './utils/search'
import {fetchTweets} from './data'


const FETCHED_TWEETS = 'FETCHED_TWEETS'
const SAVED_TWEETS = 'SAVED_TWEETS'


const compareFn = (a: ITweet, b: ITweet) => String(a.id) === String(b.id)


const useSavedTweets = () => useStore<ITweet>({
  storageKey: 'saved-tweets',
  compareFn,
})

const useTweetSearch = (searchTerm: string) => useSearch<ITweet>({
  searchTerm,
  compareFn,
  fetchFn: fetchTweets,
})

const filterTweets = (tweets: Array<ITweet>, exclude: Array<ITweet>) => {
  const excludeIds = new Set(exclude.map(tweet => String(tweet.id)))
  return tweets.filter(tweet => !excludeIds.has(String(tweet.id)))
}


function App(): ReactElement {

  const [searchTerm, setSearchTerm] = useState('')

  const {items: fetchedTweets, isLoading, moveItem: moveFetchedTweet} = useTweetSearch(searchTerm)

  const {items: savedTweets, addItem: saveTweet, removeItem: deleteTweet, moveItem: moveSavedTweets} = useSavedTweets()


  const onDragEnd = ({source, destination, draggableId}: DropResult) => {

    if (source.droppableId === destination?.droppableId) {
      if (source.droppableId === FETCHED_TWEETS) {
        const tweet = fetchedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
        if (tweet) {
          moveFetchedTweet(tweet, destination.index)
        }
      }
      if (source.droppableId === SAVED_TWEETS) {
        const tweet = savedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
        if (tweet) {
          moveSavedTweets(tweet, destination.index)
        }
      }
    }

    if (source.droppableId === FETCHED_TWEETS && destination?.droppableId === SAVED_TWEETS) {
      const tweet = fetchedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
      if (tweet) {
        saveTweet(tweet)
      }
    }
    if (source.droppableId === SAVED_TWEETS && destination?.droppableId !== SAVED_TWEETS) {
      const tweet = savedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
      if (tweet) {
        deleteTweet(tweet)
      }
    }
  }

  const tweetsToDisplay = useMemo(() => filterTweets(fetchedTweets, savedTweets), [fetchedTweets, savedTweets])


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout.Layout>
        <Layout.Header>
          <Title>Tweet Saver</Title>
        </Layout.Header>

        <Layout.Columns>
          <Layout.Column>
            <Layout.ColumnHeader>
              <SearchForm
                onSubmit={setSearchTerm}
                isLoading={isLoading}
                placeholder="Search"
              />
            </Layout.ColumnHeader>
            <Layout.ColumnBody>
              <TweetList
                placeholder="Nothing to display. Use the Search Box to find tweets to save"
                tweets={tweetsToDisplay}
                droppableId={FETCHED_TWEETS}
                onSaveTweet={saveTweet}
              />
            </Layout.ColumnBody>
          </Layout.Column>

          <Layout.Column>
            <Layout.ColumnHeader>
              <Layout.ColumnTitle>Saved Tweets</Layout.ColumnTitle>
            </Layout.ColumnHeader>
            <Layout.ColumnBody>
              <TweetList
                placeholder="Drag discovered tweets here to save them"
                tweets={savedTweets}
                droppableId={SAVED_TWEETS}
                onDeleteTweet={deleteTweet}
              />
            </Layout.ColumnBody>
          </Layout.Column>
        </Layout.Columns>

      </Layout.Layout>
    </DragDropContext>
  )
}

export default App
