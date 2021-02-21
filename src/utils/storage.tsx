import {useEffect, useState} from 'react';


export type options<T> = {
  storageKey: string
  compareFn: (a: T, b: T) => Boolean
}

export type result<T> = [
  Array<T>,
  (item: T) => void,
  (item: T) => void,
]


function useStoredItems<T>({storageKey, compareFn}: options<T>): result<T> {

  const [items, setItems] = useState<Array<T>>([])

  useEffect(() => {
    let storageEntry
    try {
      storageEntry = localStorage.getItem(storageKey)
      setItems(JSON.parse(storageEntry || ''))
    } catch (err) {
      console.error('malformed storage entry:', storageEntry)
      setItems([])
    }
  }, [storageKey])


  const addItem = (item: T) => setItems((prev: Array<T>) => {
    const exists = prev.find((entry: T)=> compareFn(entry, item))

    if (exists) {
      return prev;
    } else {
      const result = [
        ...prev,
        item,
      ]
      localStorage.setItem(storageKey, JSON.stringify(result))
      return result;
    }
  })


  const removeItem = (item: T) => setItems((prev: Array<T>) => {
    const result = prev.filter((entry: T) => !compareFn(entry, item))
    localStorage.setItem(storageKey, JSON.stringify(result))
    return result;
  })

  return [
    items,
    addItem,
    removeItem,
  ]

}

export default useStoredItems