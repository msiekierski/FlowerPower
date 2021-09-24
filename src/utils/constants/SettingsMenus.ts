export type SettingsMenu = {
  name: string;
  subcategories?: Array<SettingsMenu>;
};

export const settingsMenu: Array<SettingsMenu> = [
  { name: 'Personal Data' },
  { name: 'Order History' },
  { name: 'E-Wallet' },
  { name: 'Change Password' },
];

export const PERSONAL_DATA = 'Personal Data';
export const ORDER_HISTORY = 'Order History';
export const E_WALLET = 'E-Wallet';
export const CHANGE_PASSWORD = 'Change Password';
