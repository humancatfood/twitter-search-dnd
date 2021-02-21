import {PropsWithChildren} from 'react';
import styled from 'styled-components'


const H1 = styled.h1({
  margin: 0,
  padding: 0.5,
  fontSize: '2rem',
  fontWeight: 'lighter',
})


function Title({children}: PropsWithChildren<any>) {
  return (
    <>
      <H1>{children}</H1>
      <hr />
    </>
  );
}

export default Title;
