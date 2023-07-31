import {get, post, put, del} from '../utils/api';

export function readDepartments() {
    return get('department');
}

export function createDepartment(department) {
    return post('department', department);
}

export function updateDepartment(department) {
    return put('department', department);
}

export function deleteDepartment(id) {
    return del(`department/${id}`);
}