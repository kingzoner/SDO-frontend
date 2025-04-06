import { appApiIns } from "./app-api";

export function getUserStatus(){
    console.log(appApiIns.headers)
    return appApiIns.get('user_status');
}

export function getUserData(){
    return appApiIns.get('user_data');
}
