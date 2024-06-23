import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id:uniqueId(),
    title:'Resources',
    icon: IconLayoutDashboard,
    href: '/sample-page',
  },
  // {navlabel: true,
  //   subheader: 'New',
  // },
  {
    id: uniqueId(),
    title: 'Beats',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'KPIs',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    id: uniqueId(),
    title: 'Demographics',
    icon: IconCopy,
    href: 'icons',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
];

export default Menuitems;
