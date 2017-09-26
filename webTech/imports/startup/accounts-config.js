import { Accounts } from 'meteor/accounts-base';
import { Cards    } from '../api/cards.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
