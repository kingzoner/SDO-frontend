import { appApiIns } from "./app-api";

//TODO: update null to file
export function uploadByTaskId(task_id){
    return appApiIns.post('upload', null, {
        params: {
            task_id: task_id
        }
    });
}

export function testingTask(task_id){
    return appApiIns.post('test', null, {
        params: {
            task_id: task_id
        }
    });
}

export function getTask(task_id){
    return appApiIns.get('task', null, {
        params: {
            task_id: task_id
        }
    });
}