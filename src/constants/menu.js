import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.dashboard',
    to: `${adminRoot}/realfi`,
  },
  {
    id: 'account',
    icon: 'simple-icon-user',
    label: 'menu.account',
    to: '#',
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-notebook',
        label: 'menu.account.how-it-works',
        to: `${adminRoot}/account/how-it-works`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.account.matrix',
        to: `${adminRoot}/account/matrix`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.account.referrals',
        to: `${adminRoot}/account/referrals`,
      },
    ],
  },
  {
    id: 'wallet',
    icon: 'simple-icon-wallet',
    label: 'menu.wallet',
    to: '#',
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.wallet',
        to: `${adminRoot}/wallet`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.wallet.withdrawals',
        to: `${adminRoot}/wallet/withdrawals`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.wallet.changewallet',
        to: `${adminRoot}/wallet/changewallet`,
      },
    ],
  },
];
export default data;
