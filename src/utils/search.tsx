import {useEffect, useState} from 'react'


type options<T> = {
  searchTerm: string,
  compareFn: (a: T, b: T) => boolean,
  fetchFn: (searchTerm: string) => Promise<Array<T>>
}

type result<T> = {
  items: Array<T>,
  isLoading: boolean,
  moveItem: (item: T, to: number) => void,
}


function useSearch<T>({searchTerm, compareFn, fetchFn}: options<T>): result<T> {
  const [items, setItems] = useState<Array<T>>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      fetchFn(searchTerm)
        .then(setItems)
        .finally(() => setLoading(false))
    } else {
      setItems([])
    }
  }, [searchTerm])

  const moveItem = (item: T, to: number): void => setItems(prev => {
    const result = prev.filter((entry: T) => !compareFn(entry, item))
    result.splice(to, 0, item)
    return result
  })

  return {
    items,
    isLoading,
    moveItem,
  }

}

export default useSearch