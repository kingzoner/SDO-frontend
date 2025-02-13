import { appApiIns } from "./app-api";

export function loginUser(username, password){
    return appApiIns.post('login',{
        username: username,
        password: password
    });
}

export function registerUser(request){
    return appApiIns.post('register',{
        username: request.username,
        password: request.password,
        group_name: request.group_name
    });
}