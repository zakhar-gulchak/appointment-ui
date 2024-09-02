import Typography from '@suid/material/Typography'
import Link from '@suid/material/Link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Copyright = (props: any) => (
  <Typography variant='body2' color='text.secondary' align='center' {...props}>
    {'Copyright © '}
    <Link color='inherit' href='https://mui.com/'>
      My Company
    </Link>{' '}
    {new Date().getFullYear()}.
  </Typography>
)

export default Copyright
