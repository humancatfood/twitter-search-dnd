import styled from 'styled-components'
import moment from 'moment'


interface TweetProps {
  name: string
  handle: string
  avatar: string
  date: string
  body: string
  onSave?: () => void
  onDelete?: () => void
}

const Wrapper = styled.article({
  display: 'grid',
  gridTemplateAreas: `
    "avatar head"
    "avatar body"
  `,
  gridTemplateColumns: 'auto 1fr',
  gridGap: '0.5rem 1rem',
})

const Avatar = styled.div({
  gridArea: 'avatar',
})

const Head = styled.div({
  gridArea: 'head',
  display: 'flex',
})

const Name = styled.b({
  marginRight: '0.4rem',
})

const Handle = styled.b({
  opacity: 0.5,
  marginRight: '0.4rem',
})

const Date = styled.span({
  flex: 1,
  textAlign: 'end',
})

const Body = styled.div({
  gridArea: 'body',
})

const Img = styled.img({
  borderRadius: 4
})

const Button = styled.button({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
})


function Tweet(props: TweetProps) {
  const {avatar, name, handle, date, body, onSave, onDelete} = props

  return (
    <Wrapper>
      <Avatar>
        <Img src={avatar} alt={name} />
      </Avatar>
      <Head>
        <Name>{name}</Name>
        <Handle>@{handle}</Handle>
        <Date>{moment(date).fromNow()}</Date>
      </Head>
      <Body>
        {body}
        &nbsp;
        {onSave && (
          <Button onClick={onSave} title="Save Tweet">✔︎</Button>
        )}
        {onDelete && (
          <Button onClick={onDelete} title="Delete Tweet">✘</Button>
        )}
      </Body>
    </Wrapper>
  )
}

export default Tweet