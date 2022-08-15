export const BASE_URL = process.env.BASE_URL || "https://jira-ms-vercel.vercel.app";

const API_VERSION = 1;
const API = "api";

/// controler
const TASK_MANAGEMENT_CONTROLLER = `${BASE_URL}/${API}/${API_VERSION}/tasks-management`;
export const TASK_MANAGEMENT = {
    TASKS: `${TASK_MANAGEMENT_CONTROLLER}/tasks`
}
