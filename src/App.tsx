import {useMemo, useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

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


function App() {

  const [searchTerm, setSearchTerm] = useState('')

  const fetchedTweets = useTweetSearch(searchTerm)

  const [savedTweets, saveTweet, deleteTweet] = useSavedTweets()


  const onDragEnd = ({source, destination, draggableId}: DropResult) => {
    if (source.droppableId === 'fetched-tweets' && destination?.droppableId === 'saved-tweets') {
      const tweet = fetchedTweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
      if (tweet) {
        saveTweet(tweet)
      }
    }
  };

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
              <SearchForm onSubmit={setSearchTerm} />
            </Layout.ColumnHeader>
            <Layout.ColumnBody>
              <TweetList
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
                tweets={savedTweets}
                droppableId="saved-tweets"
                onDeleteTweet={deleteTweet}
              />
            </Layout.ColumnBody>
          </Layout.Column>
        </Layout.Columns>

      </Layout.Layout>
    </DragDropContext>
  );
}

export default App;
