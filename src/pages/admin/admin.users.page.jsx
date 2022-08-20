import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './pagination';
import './admin.page.css'
import UserService from '../../services/user.service';
import User from '../../models/user';
import { UserEdit } from '../../components/user-edit';
import { UserDelete } from '../../components/user-delete';
import { Role } from './../../models/role';

// TABLE SEARCH

const AdminUsersPage = () => {

    const [currentUsersPage, setCurrentUsersPage] = useState(1);
    const [usersPerPage] = useState(5)
    const [userList, setUserList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(1);

    const indexOfLastUser = currentUsersPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userList?.slice(indexOfFirstUser, indexOfLastUser);
    const totalPagesNumUsers = Math.ceil(userList?.length / usersPerPage);

    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setUserList(response.data)
        })


    }, []);

    const saveUserWatcher = (user) => {
        let itemIndex = userList.findIndex(item => item.id === user.id);

        if (itemIndex !== -1) {
            const newList = userList.map((item) => {
                if (item.id === user.id) {
                    return user;
                }
                return item;
            });
            setUserList(newList);
        } else {
            const newList = userList.concat(user);
            setUserList(newList);
        }
    };

    // SEARCH BAR

    const [query, setQuery] = useState("")
    const keys = ["firstName", "lastName", "username"]

    // MIJENJANJE USER ROLE
    const changeUserRole = (userId) => {
        var tempUser;
        UserService.getUserById(userId).then((res) => {
            tempUser = res.data;
            if (tempUser.role === Role.ADMIN) tempUser.role = Role.USER;
            else tempUser.role = Role.ADMIN;
            UserService.updateUser(tempUser).then((res) => {
                UserService.getAllUsers().then((res) => {
                    setUserList(res.data);
                })
            })

        })

    }





    // EDITIRANJE USERA

    const [selectedUser, setSelectedUser] = useState(new User('', '', '', '', '', '', '', ''));
    const saveComponent = useRef();


    const editUserRequest = (item) => {
        setSelectedUser(Object.assign({}, item));
        saveComponent.current?.showUserModal();
    };




    // BRISANJE USERA

    const deleteComponent = useRef();

    const deleteUser = () => {
        console.log(selectedUser)
        UserService.deleteUser(selectedUser).then(_ => {
            setUserList(userList.filter(x => x.id !== selectedUser.id));
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };

    const deleteUserRequest = (user) => {
        setSelectedUser(user);
        deleteComponent.current?.showDeleteModal();
    };

    return (

        <div>
            <div className="container">
                <div className="card mt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h3>All users</h3>
                            </div>
                            <div className="col-6 text-end">
                                <input type="text" placeholder='Search...'
                                    onChange={e => setQuery(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">

                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Full name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone number </th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!query ? (currentUsers.filter(user => user.firstName.toLowerCase().includes(query)).map((user, ind) =>
                                    <tr key={user.id}>
                                        <th scope="row">{ind + 1}</th>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button disabled={(currentUser.id === user.id)} className="btn btn-success me-1" type='button' onClick={() => changeUserRole(user.id)}   >
                                                Change role
                                            </button>
                                            <button className="btn btn-light me-1" type='button' onClick={() => editUserRequest(user)} >
                                                Edit
                                            </button>
                                            <button disabled={(currentUser.id === user.id)} className="btn btn-danger me-1" type='button' onClick={() => deleteUserRequest(user)}  >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) :

                                    (userList.filter(user => user.firstName.toLowerCase().includes(query)).map((user, ind) =>
                                        <tr key={user.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button disabled={(currentUser.id === user.id)} className="btn btn-success me-1" type='button' onClick={() => changeUserRole(user.id)}   >
                                                    Change role
                                                </button>
                                                <button className="btn btn-light me-1" type='button' onClick={() => editUserRequest(user)} >
                                                    Edit
                                                </button>
                                                <button disabled={(currentUser.id === user.id)} className="btn btn-danger me-1" type='button' onClick={() => deleteUserRequest(user)}  >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))



                                }


                            </tbody>
                        </table>

                        <Pagination pages={totalPagesNumUsers}
                            setCurrentPage={setCurrentUsersPage}
                            currentObjects={currentUsers}
                            sortedObjects={userList} />

                    </div>
                </div>

            </div>
            <UserEdit ref={saveComponent} user={selectedUser} onSaved={(p) => saveUserWatcher(p)} />
            <UserDelete ref={deleteComponent} onConfirmed={() => deleteUser()} />
        </div>


    )
}

export { AdminUsersPage };