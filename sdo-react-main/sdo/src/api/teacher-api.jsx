import { appApiIns } from "./app-api";

export function getLabs() {
  return appApiIns.get("teacher/labs");
}

export function getGroups() {
  return appApiIns.get("teacher/groups");
}