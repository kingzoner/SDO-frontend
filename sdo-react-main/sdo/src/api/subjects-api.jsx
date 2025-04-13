import { appApiIns } from "./app-api";

export function getSubjects() {
    return appApiIns.get('subjects');
}

export function getTasks(subject_identifier) {
    return appApiIns.get(`tasks/${subject_identifier}`);
}