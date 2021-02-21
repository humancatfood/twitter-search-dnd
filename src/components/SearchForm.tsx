import styled from 'styled-components'


export type SearchFormProps = {
  onSubmit: (searchTerm: string) => void
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


function SearchForm({onSubmit: onSubmitProp}: SearchFormProps) {

  function onSubmit (e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault()
    const form = e.currentTarget as HTMLElement
    const input = form.querySelector('[name="searchterm"]') as HTMLInputElement
    onSubmitProp(input.value)
  }

  return (
    <Form action="#" onSubmit={onSubmit}>
      <Input type="text" name="searchterm" />
      <Button type="submit">🔎</Button>
    </Form>
  );
}

export default SearchForm;
