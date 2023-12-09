import ListItemButton from '@suid/material/ListItemButton'
import ListItemIcon from '@suid/material/ListItemIcon'
import PersonIcon from '@suid/icons-material/Person'
import ListItemText from '@suid/material/ListItemText'
import ListSubheader from '@suid/material/ListSubheader'
import DashboardIcon from '@suid/icons-material/Dashboard'
import ShoppingCartIcon from '@suid/icons-material/ShoppingCart'
import PeopleIcon from '@suid/icons-material/People'
import BarChartIcon from '@suid/icons-material/BarChart'
import LayersIcon from '@suid/icons-material/Layers'
import AssignmentIcon from '@suid/icons-material/Assignment'
import CalendarIcon from '@suid/icons-material/CalendarMonth'

export const mainListItems = () => (
  <>
    <ListItemButton component='a' href='/dashboard/calendar'>
      <ListItemIcon>
        <CalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItemButton>
    <ListItemButton component='a' href='/dashboard/profile'>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="DashboardPage" />
    </ListItemButton>
    <ListItemButton component='a' href='/dashboard/orders'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </>
)

export const secondaryListItems = () => (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
)
