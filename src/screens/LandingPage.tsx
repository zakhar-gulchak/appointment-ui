import { For } from 'solid-js'
import AppBar from '@suid/material/AppBar'
import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import Card from '@suid/material/Card'
import CardActions from '@suid/material/CardActions'
import CardContent from '@suid/material/CardContent'
import CardHeader from '@suid/material/CardHeader'
import CssBaseline from '@suid/material/CssBaseline'
import Grid from '@suid/material/Grid'
import StarIcon from '@suid/icons-material/StarBorder'
import Toolbar from '@suid/material/Toolbar'
import Typography from '@suid/material/Typography'
import Link from '@suid/material/Link'
import GlobalStyles from '@suid/material/GlobalStyles'
import Container from '@suid/material/Container'

import Copyright from '../common/Copyright'

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonHref: '/signup/free',
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonHref: '/signup/pro',
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonHref: '/signup/enterprise',
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
]
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
]

export default function LandingPage () {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>
          <nav>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Features
            </Link>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Enterprise
            </Link>
            <Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
              Support
            </Link>
          </nav>
          <Button href='/signin' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth='sm' component='main' sx={{ pt: 8, pb: 6 }}>
        <Typography component='h1' variant='h2' align='center' color='text.primary' gutterBottom>
          Pricing
        </Typography>
        <Typography variant='h5' align='center' color='text.secondary' component='p'>
          Quickly build an effective pricing table for your potential customers with this layout.
          It&aposs built with default MUI components with little customization.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-end'>
          <For each={tiers}>
            {(tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component='h2' variant='h3' color='text.primary'>
                        ${tier.price}
                      </Typography>
                      <Typography variant='h6' color='text.secondary'>
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      <For each={tier.description}>
                        {(line: string) => (
                          <Typography component='li' variant='subtitle1' align='center'>
                            {line}
                          </Typography>
                        )}
                      </For>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={tier.buttonHref}
                      fullWidth
                      variant={tier.buttonVariant as 'outlined' | 'contained'}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </For>
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth='md'
        component='footer'
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent='space-evenly'>
          <For each={footers}>
            {(footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant='h6' color='text.primary' gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  <For each={footer.description}>
                    {(item) => (
                      <li>
                        <Link href='#' variant='subtitle1' color='text.secondary'>
                          {item}
                        </Link>
                      </li>
                    )}
                  </For>
                </ul>
              </Grid>
            )}
          </For>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </>
  )
}
