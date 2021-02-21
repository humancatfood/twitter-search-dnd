import {useEffect, useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import {ITweet} from './types'
import * as Layout from './App.layout'
import Title from './components/Title'
import TweetList from './components/TweetList'
import SearchForm from './components/SearchForm'

import useStoredItems from './utils/storage'
import {fetchTweets} from './data'




const useSavedTweets = () => useStoredItems<ITweet>({
  storageKey: 'saved-tweets',
  compareFn: (a: ITweet, b: ITweet) => String(a.id) === String(b.id),
})


function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [tweets, setTweets] = useState<Array<ITweet>>([])

  const [savedTweets, saveTweet, deleteTweet] = useSavedTweets()

  useEffect(() => {
    if (searchTerm) {
      fetchTweets(searchTerm)
        .then(setTweets)
    }
  }, [searchTerm])

  const onDragEnd = ({source, destination, draggableId}: DropResult) => {
    if (source.droppableId === 'fetched-tweets' && destination?.droppableId === 'saved-tweets') {
      const tweet = tweets.find((tweet: ITweet) => String(tweet.id) === String(draggableId))
      if (tweet) {
        saveTweet(tweet)
      }
    }
  };


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
                tweets={tweets}
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
