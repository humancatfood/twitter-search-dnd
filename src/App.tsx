import React, {useMemo, useState, ReactElement} from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import {ITweet} from './types'
import * as Layout from './App.layout'
import Title from './components/Title'
import TweetList from './components/TweetList'
import SearchForm from './components/SearchForm'

import useStoredItems from './utils/storage'
import {useTweetSearch} from './data'




const useSavedTweets = () => useStoredItems<ITweet>({
  storageKey: 'saved-tweets',
  compareFn: (a: ITweet, b: ITweet) => String(a.id) === String(b.id),
})

const filterTweets = (tweets: Array<ITweet>, exclude: Array<ITweet>) => {
  const excludeIds = new Set(exclude.map(tweet => String(tweet.id)))
  return tweets.filter(tweet => !excludeIds.has(String(tweet.id)))
}


function App(): ReactElement {

  const [searchTerm, setSearchTerm] = useState('')

  const [fetchedTweets, isLoading, moveFetchedTweet] = useTweetSearch(searchTerm)

  const [savedTweets, saveTweet, deleteTweet, moveSavedTweets] = useSavedTweets()


  const onDragEnd = ({source, destination, draggableId}: DropResult) => {

    if (source.droppableId === destination?.droppableId) {
      if (source.droppableId === 'fetched-tweets') {
        const tweet = fetchedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
        if (tweet) {
          moveFetchedTweet(tweet, destination.index)
        }
      }
      if (source.droppableId === 'saved-tweets') {
        const tweet = savedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
        if (tweet) {
          moveSavedTweets(tweet, destination.index)
        }
      }
    }

    if (source.droppableId === 'fetched-tweets' && destination?.droppableId === 'saved-tweets') {
      const tweet = fetchedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
      if (tweet) {
        saveTweet(tweet)
      }
    }
    if (source.droppableId === 'saved-tweets' && destination?.droppableId !== 'saved-tweets') {
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
                droppableId="fetched-tweets"
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
                droppableId="saved-tweets"
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
