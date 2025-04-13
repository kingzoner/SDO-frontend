import { appApiIns } from "./app-api";

export function getLabs() {
  return appApiIns.get("teacher/labs");
}

export function getGroups() {
  return appApiIns.get('api/teachers/groups');
}

export function getStudentsByGroup(groupId) {
  return appApiIns.get(`api/teachers/groups/${groupId}/students`);
}