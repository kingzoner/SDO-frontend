import { appApiIns } from "./app-api";

export function getGroups() {
    return appApiIns.get('/api/groups');
}