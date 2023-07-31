import {get, post, postImage, put, del} from '../utils/api';

export function readEmployees() {
    return get('employee');
}

export function createEmployee(employee) {
    return post('employee', employee);
}

export function updateEmployee(employee) {
    return put('employee', employee);
}

export function deleteEmployee(id) {
    return del(`employee/${id}`);
}

export function uploadEmployeeImage(formData) {
    return postImage('employee/SaveFile', formData)
}