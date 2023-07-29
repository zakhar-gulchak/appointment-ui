import Typography from '@suid/material/Typography'
import { JSXElement } from 'solid-js'

interface TitleProps {
  children?: JSXElement
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}
