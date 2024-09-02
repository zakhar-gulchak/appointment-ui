import Link from '@suid/material/Link'
import Typography from '@suid/material/Typography'

import Title from './Title'

export default function Deposits () {
  return (
    <>
      <Title>Recent Deposits</Title>
      <Typography component='p' variant='h4'>
        $3,024.00
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={(e) => e.preventDefault()}>
          View balance
        </Link>
      </div>
    </>
  )
}
