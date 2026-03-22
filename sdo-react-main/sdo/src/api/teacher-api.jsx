import { appApiIns } from "./app-api";

export function getLabs() {
	return appApiIns.get("api/teachers/subjects");
}

export function getGroups() {
	return appApiIns.get('api/teachers/groups');
}

export function getStudentsByGroup(groupId) {
	return appApiIns.get(`api/teachers/groups/${groupId}/students`);
}

export function getSubjects() {
	return appApiIns.get(`api/teachers/subjects`);
}

export function createLab(data) {
	return appApiIns.post(`api/teachers/lab`, data);
}

export function getStudentsLabs() {
	return appApiIns.get(`api/teachers/labs`);
}

export function deleteLab(labId) {
	return appApiIns.delete(`api/teachers/labs/${labId}`);
}

export function toggleStatusLab(labId) {
	return appApiIns.put(`api/teachers/labs/${labId}/toggle`);
}

export function getAllStudentsLab(studentId) {
	return appApiIns.get(`api/teachers/students/${studentId}/labs`);
}

export function editLab(labId, data) {
	return appApiIns.put(`api/teachers/labs/${labId}`, data);
}

export function labData(labId) {
	return appApiIns.get(`api/teachers/labs/${labId}`);
}