import React, { useState, useEffect } from 'react';
import { readDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService.js';

export const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [departmentId, setDepartmentId] = useState(0);

    const refreshList = () => {
        readDepartments()
            .then(data => {
                setDepartments(data);
            });
    };

    useEffect(() => {
        refreshList();
    }, []);

    const addClick = () => {
        setModalTitle("Add Department");
        setDepartmentId(0);
        setDepartmentName("");
    };

    const editClick = (dep) => {
        setModalTitle("Edit Department");
        setDepartmentId(dep.DepartmentId);
        setDepartmentName(dep.DepartmentName);
    };

    const createClick = () => {
        createDepartment({
            DepartmentName: departmentName
        })
            .then((result) => {
                alert(result);
                refreshList();
            }, (error) => {
                alert('Failed');
            });
    };

    const updateClick = () => {
        updateDepartment({
            DepartmentId: departmentId,
            DepartmentName: departmentName
        })
            .then((result) => {
                alert(result);
                refreshList();
            }, (error) => {
                alert('Failed');
            });
    };

    const deleteClick = (id) => {
        if (window.confirm('Are you sure?')) {
            deleteDepartment(id)
                .then((result) => {
                    alert(result);
                    refreshList();
                }, (error) => {
                    console.log(error);
                    alert('Failed');
                })
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#departmentModal"
                onClick={() => addClick()}>
                Add Department
            </button>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(dep =>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                                <button type="button" className='btn btn-light mr-1'
                                    data-bs-toggle="modal"
                                    data-bs-target="#departmentModal"
                                    onClick={() => editClick(dep)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button type="button" className='btn btn-light mr-1'
                                    onClick={() => deleteClick(dep.DepartmentId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
            
            <div className="modal fade" id="departmentModal" tableindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>

                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Department Name</span>
                                <input type="text" className="form-control"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)} />
                            </div>

                            {departmentId === 0 &&
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => createClick()}
                                >
                                    Create
                                </button>}

                            {departmentId !== 0 &&
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => updateClick()}
                                >
                                    Update
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
