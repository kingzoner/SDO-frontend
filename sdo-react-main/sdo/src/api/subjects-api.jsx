import { appApiIns } from "./app-api";

export function getSubjects(){
    return appApiIns.get('subjects');
}