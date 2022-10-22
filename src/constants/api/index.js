const LOCAL_HOST = "http://localhost:5000";
const LOCAL_HOST_SUPABASE = "https://localhost:7030";
const PROD_URL = "https://jira-ms-vercel.vercel.app";
const MS_PROD_URL = "https://jira-aspnet.onrender.com";
export const BASE_URL = process.env.BASE_URL || PROD_URL;

const API_VERSION = 1;
const API = "api";

/// controler
const TASK_MANAGEMENT_CONTROLLER = `${BASE_URL}/${API}/${API_VERSION}/tasks-management`;
export const TASK_MANAGEMENT = {
  TASKS: `${TASK_MANAGEMENT_CONTROLLER}/tasks`,
  TASKS_GET_TASK: (id) => `${TASK_MANAGEMENT_CONTROLLER}/tasks/${id}`,
  TASKS_UPDATE_STATUS: (id) =>
    `${TASK_MANAGEMENT_CONTROLLER}/tasks/${id}/status`,
};

const TEAMS_MANAGEMENT_CONTROLLER = `${BASE_URL}/${API}/${API_VERSION}/teams-management`;
export const TEAMS_MANAGEMENT = {
  TEAMS: `${TEAMS_MANAGEMENT_CONTROLLER}/teams`,
};

const TEAMS_MANAGEMENT_CONTROLLER_V2 = `${MS_PROD_URL}/${API}/${API_VERSION}/TeamsManagement`;
export const TEAMS_MANAGEMENT_ACTIONS = {
  TEAMS: `${TEAMS_MANAGEMENT_CONTROLLER_V2}/teams`,
};

const CHATS_MANAGEMENT_CONTROLLER = `${MS_PROD_URL}/ChatSocket`;
export const CHATS_MANAGEMENT_ACTIONS = {
  GET_CHATS: (roomId) => `${CHATS_MANAGEMENT_CONTROLLER}/chats/${roomId}`,
  SEND_CHAT: `${CHATS_MANAGEMENT_CONTROLLER}/send-message`,
};

const USERS_MANAGMENT_CONTORLLER = `${MS_PROD_URL}/${API}/${API_VERSION}/UsersManagement`;
export const USERS_MANAGEMENT_ACTIONS = {
  USERS: `${USERS_MANAGMENT_CONTORLLER}/users`
}