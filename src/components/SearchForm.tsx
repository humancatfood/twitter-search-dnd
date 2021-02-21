import React, {ReactElement} from 'react'
import styled, {keyframes} from 'styled-components'


export type SearchFormProps = {
  onSubmit: (searchTerm: string) => void,
  isLoading: boolean,
}

const shared = {
  border: '1px solid lightgray',
  background: 'transparent',
}

const Form = styled.form({
  display: 'flex',
  height: '2rem',
})

const Input = styled.input({
  ...shared,
  borderRight: 'none',
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
})

const Button = styled.button({
  ...shared,
  width: '2rem',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
})


const pulse = keyframes`
	0%, 100% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
`

const LoadingIndicator = styled.span`
  &:after {
    content: '⏳';
  }
  display: inline-block;
  animation: ${pulse} 800ms infinite;
`


function SearchForm({onSubmit: onSubmitProp, isLoading}: SearchFormProps): ReactElement {

  function onSubmit (e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault()
    const form = e.currentTarget as HTMLElement
    const input = form.querySelector('[name="searchterm"]') as HTMLInputElement
    const value = input.value.trim()
    if (value) {
      onSubmitProp(value)
    }
  }

  return (
    <Form action="#" onSubmit={onSubmit}>
      <Input type="text" name="searchterm" />
      <Button type="submit">🔎</Button>
      {isLoading && (
        <>
          &nbsp;
          <LoadingIndicator />
        </>
      )}
    </Form>
  )
}

export default SearchForm
