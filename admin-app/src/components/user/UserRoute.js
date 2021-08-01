import User from './User';
import AddUser from './AddUser';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

export default  [
    {path: '/admin/user/all', component: User, name: 'User'},
    {path: '/admin/user/create', component: AddUser, name: 'AddUser'},
    {path: '/admin/user/update-profile/:id', component: UpdateProfile, name: 'UpdateProfile'},
    {path: '/admin/user/update-password/:id', component: UpdatePassword, name: 'UpdatePassword'},
];