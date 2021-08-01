import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../components/auth/AdminLogin';
import Dashboard from '../components/layouts/Dashboard';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import UserRoute from '../components/user/UserRoute';
import BannerRoute from '../components/banner/BannerRoute';
import BrandRoute from '../components/brand/BrandRoute';
import CategoryRoute from '../components/category/CategoryRoute';


const routes = [
    {path: '/admin/login', component: AdminLogin, name: 'AdminLogin'},
    {path: '/admin/dashboard', component: Dashboard, name: 'AdminDashboard'},
    {path: '/admin/forgot-password', component: ForgotPassword, name: 'ForgotPassword'},
    {path: '/admin/reset-password/:token', component: ResetPassword, name: 'ResetPassword'},
    ...UserRoute,
    ...BannerRoute,
    ...BrandRoute,
    ...CategoryRoute,
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('myToken');
    if (to.name !== 'AdminLogin' && to.name !== 'ForgotPassword' && to.name !== 'ResetPassword' && token === null)
       next({ name: 'AdminLogin' })  
    else if(to.name == 'AdminLogin'  && token !==null)
       next({ name: 'AdminDashboard' })
    else 
       next()
})

export default router;