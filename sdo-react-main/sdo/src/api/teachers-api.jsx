import { appApiIns } from "./app-api";

export function getStudents(){
    return appApiIns.get('students');
}

export function getStudentLabs(student_id){
    return appApiIns.get(`students/${student_id}/labs`);
}

export function getStudentLabDetail(student_id, lab_id){
    return appApiIns.get(`students/${student_id}/labs/${lab_id}`);
}

export function getFacultyGroups(){
    return appApiIns.get('groups');
}