import styled from 'styled-components'


export const Layout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  boxSizing: 'border-box',
})


export const Header = styled.header({
  padding: '1rem',
})

export const Columns = styled.div({
  display: 'flex',
  flex: '1 0',
  overflow: 'hidden',
})

export const Column = styled.div({
  flex: '1 1',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
})

export const ColumnHeader = styled.div({
  height: '3rem',
})

export const ColumnBody = styled.div({
  flex: '1 0',
  border: '2px solid darkgrey',
  overflow: 'auto',
})

export const ColumnTitle = styled.h2({
  margin: 0,
})
