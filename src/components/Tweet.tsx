interface TweetProps {
  name: string
  handle: string
  avatar: string
  date: string
  body: string
  onSave?: () => void
  onDelete?: () => void
}

function Tweet(props: TweetProps) {
  const {avatar, name, handle, date, body, onSave, onDelete} = props
  return (
    <div>
      <img src={avatar} alt={name} />
      <div>{name} / {handle}</div>
      <small>{date}</small>
      <div>{body}</div>
      {onSave && (
        <button onClick={onSave}>Save Tweet</button>
      )}
      {onDelete && (
        <button onClick={onDelete}>Delete Tweet</button>
      )}
    </div>
  )
}

export default Tweet