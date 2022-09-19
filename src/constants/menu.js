import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'simple-icon-home',
    label: 'menu.dashboard',
    to: `${adminRoot}/realfi`,
  },
  {
    id: 'account',
    icon: 'simple-icon-user',
    label: 'menu.army',
    to: '#',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.army.profile',
        to: `${adminRoot}/account`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.army.matrix',
        to: `${adminRoot}/account/matrix`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.army.referrals',
        to: `${adminRoot}/account/referrals`,
      },
      {
        icon: 'simple-icon-notebook',
        label: 'menu.army.how-it-works',
        to: `${adminRoot}/account/how-it-works`,
      },
    ],
  },
  {
    id: 'staking',
    icon: 'simple-icon-briefcase',
    label: 'menu.staking',
    to: `${adminRoot}/staking`,
  },
];
export default data;
