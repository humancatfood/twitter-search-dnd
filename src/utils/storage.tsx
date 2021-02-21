import {useEffect, useState} from 'react'


export type options<T> = {
  storageKey: string
  compareFn: (a: T, b: T) => boolean
}

export type result<T> = [
  Array<T>,
  (item: T) => void,
  (item: T) => void,
  (item: T, to: number) => void,
]


function useStoredItems<T>({storageKey, compareFn}: options<T>): result<T> {

  const [items, setItems] = useState<Array<T>>([])

  useEffect(() => {
    let storageEntry
    try {
      storageEntry = localStorage.getItem(storageKey)
      if (storageEntry) {
        setItems(JSON.parse(storageEntry || ''))
      }
    } catch (err) {
      console.error('error retrieving storage entry:', storageEntry)
      setItems([])
    }
  }, [storageKey])


  const addItem = (item: T) => setItems((prev: Array<T>) => {
    const exists = prev.find((entry: T)=> compareFn(entry, item))

    if (exists) {
      return prev
    } else {
      const result = [
        ...prev,
        item,
      ]
      localStorage.setItem(storageKey, JSON.stringify(result))
      return result
    }
  })


  const removeItem = (item: T) => setItems((prev: Array<T>) => {
    const result = prev.filter((entry: T) => !compareFn(entry, item))
    localStorage.setItem(storageKey, JSON.stringify(result))
    return result
  })

  const moveItem = (item: T, to: number) => setItems((prev: Array<T>) => {
    const result = prev.filter((entry: T) => !compareFn(entry, item))
    result.splice(to, 0, item)
    return result
  })

  return [
    items,
    addItem,
    removeItem,
    moveItem,
  ]

}

export default useStoredItems