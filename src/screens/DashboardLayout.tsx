import { createSignal, For } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { styled } from '@suid/material/styles'
import Alert from '@suid/material/Alert'
import CssBaseline from '@suid/material/CssBaseline'
import ErrorIcon from '@suid/icons-material/Error'
import Button from '@suid/material/Button'
import MuiDrawer from '@suid/material/Drawer'
import Box from '@suid/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@suid/material/AppBar'
import Toolbar from '@suid/material/Toolbar'
import List from '@suid/material/List'
import Typography from '@suid/material/Typography'
import Divider from '@suid/material/Divider'
import IconButton from '@suid/material/IconButton'
import Badge from '@suid/material/Badge'
import Container from '@suid/material/Container'
import Avatar from '@suid/material/Avatar'
import Menu from '@suid/material/Menu'
import MenuItem from '@suid/material/MenuItem'
import MenuIcon from '@suid/icons-material/Menu'
import ChevronLeftIcon from '@suid/icons-material/ChevronLeft'
import NotificationsIcon from '@suid/icons-material/Notifications'
import AdbIcon from '@suid/icons-material/Adb'

import Copyright from '../common/Copyright'
import { mainListItems, secondaryListItems } from '../common/dashboard/listItems'
import { userData } from '../store/user'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open: boolean
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, props }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(props.open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer)(({ theme, props }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!props.open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

export default function DashboardLayout() {
  const [open, setOpen] = createSignal(false)
  const [anchorElUser, setAnchorElUser] = createSignal(null)
  const [alertOpen] = createSignal(true) // todo - connect store
  const settings: string[] = ['Profile', 'Dashboard']
  const navigate = useNavigate()
  const toggleDrawer = () => {
    setOpen(!open())
  }

  const handleOpenUserMenu = (event: Event) => {
    console.log(event.currentTarget)
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {alertOpen() && <Alert
        action={
          <Button color="inherit" size="small" onClick={() => navigate('/dashboard/subscription', { replace: true })}>
            Renew subscription
          </Button>
        }
        icon={<ErrorIcon fontSize="inherit" />}
        severity="warning">
        Your subscription has expired. To continue using the service, please buy a new subscription.
      </Alert>
      }
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open()}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open() && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userData.user.photoUrl} />
              </IconButton>
              <Menu
                sx={{ mt: 6 }}
                id="menu-appbar"
                anchorEl={anchorElUser()}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser())}
                onClose={handleCloseUserMenu}
              >
                <For each={settings}>{setting => (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )}</For>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open()}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            get backgroundColor() {
              return (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]
            },
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
