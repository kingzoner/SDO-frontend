import { appApiIns } from "./app-api";

export function loginUser(username, password){
    return appApiIns.post('login',{
        username: username,
        password: password
    });
}

export function registerUser(request){
    return appApiIns.post('register',{
        first_name: request.first_name,
        last_name: request.last_name,
        middle_name: request.middle_name,
        username: request.username,
        password: request.password,
        group_name: request.group_name
    });
}