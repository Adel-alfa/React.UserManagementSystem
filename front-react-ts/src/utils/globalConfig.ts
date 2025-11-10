import { PATH_DASHBOARD, PATH_PUBLIC } from '../routes/path';


export const HOST_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7142/api';

export const REGISTER_URL = '/Auth/register';
export const LOGIN_URL = '/Auth/login';
export const ME_URL = '/Auth/me';
export const USERS_LIST_URL = '/Auth/users';
export const UPDATE_ROLE_URL = '/Auth/assign-role';
export const USERNAMES_LIST_URL = '/Auth/usersnames';
export const ALL_MESSAGES_URL = '/Messages';
export const CREATE_MESSAGE_URL = '/Messages/create';
export const MY_MESSAGE_URL = '/Messages/mine';
export const LOGS_URL = '/Logs';
export const MY_LOGS_URL = '/Logs/mine';

export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;