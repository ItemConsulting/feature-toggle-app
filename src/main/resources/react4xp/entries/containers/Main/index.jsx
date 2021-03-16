import { Button, Container, Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTest } from './selectors'

export function Main() {
    const test = useSelector(selectTest)

    return (
    <Container maxWidth={'lg'}>
    </Container>
  );
}
