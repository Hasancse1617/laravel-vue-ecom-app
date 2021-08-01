<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- {/* Brand Logo */} -->
        <router-link :to="{ name: 'AdminDashboard' }" class="brand-link">
        <img src="/assets/images/admin_images/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: .8 " />
        <span class="brand-text font-weight-light">Admin Panel</span>
        </router-link>
        <!-- {/* Sidebar */} -->
        <div class="sidebar">
        <!-- {/* Sidebar user (optional) */} -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
            <img :src="!user.image?`${api_path}/images/admin_images/avatar.png`:`${api_path}/images/admin_images/${user.image}`" class="img-circle elevation-2" alt="User Image"/>
            </div>
            <div class="info">
            <a href="#" class="d-block">{{user.name}}</a>
            </div>
        </div>

        <!-- {/* Sidebar Menu */} -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <!-- {/* Add icons to the links using the .nav-icon class */}
                {/* with font-awesome or any other icon font library --> 
            <li class="nav-item has-treeview">
                <router-link :to="{ name: 'AdminDashboard' }" active-class="active" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                    Dashboard
                </p>
                </router-link>
            </li>
            <li class="nav-item has-treeview menu-open">
                <a href="#" class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                    Users
                    <i class="fas fa-angle-left right"></i>
                </p>
                </a>
                <ul class="nav nav-treeview">
                <li class="nav-item">
                    <router-link to="/admin/user/all?page=1" active-class="active" :class="$route.name==='AddUser'?'nav-link active':'nav-link'">
                    <i class="far fa-circle nav-icon"></i>
                    <p>All User</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'UpdateProfile', params: {id:user.id }}" active-class="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Update Profile</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'UpdatePassword', params: {id: user.id}}"  active-class="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Update Password</p>
                    </router-link>
                </li>                          
                </ul>
            </li>
            <li class="nav-item has-treeview menu-open">
                <a href="#" class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                    Catelogues
                    <i class="fas fa-angle-left right"></i>
                </p>
                </a>
                <ul class="nav nav-treeview">
                <li class="nav-item">
                    <router-link to="/admin/banner/all?page=1" active-class="active" :class="$route.name==='AddBanner' || $route.name==='EditBanner'?'nav-link active':'nav-link'">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Banner</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link exact to="/admin/brand/all?page=1" active-class="active" :class="$route.name==='AddBrand' || $route.name==='EditBrand'?'nav-link active':'nav-link'">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Brand</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/category/all?page=1" active-class="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Category</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <NavLink exact to="/admin/product/all?page=1" activeclass="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Products</p>
                    </NavLink>
                </li>                          
                </ul>
            </li>
            <li class="nav-item has-treeview menu-open">
                <a href="#" class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                    Interviews
                    <i class="fas fa-angle-left right"></i>
                </p>
                </a>
                <ul class="nav nav-treeview">
                <li class="nav-item">
                    <NavLink exact to="/admin/interview/all?page=1" activeclass="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Interview</p>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink exact to="/admin/genre/all?page=1" activeclass="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Genres</p>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink exact to="/admin/video/all?page=1" activeclass="active" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Videos</p>
                    </NavLink>
                </li>                          
                </ul>
            </li>
            </ul>
        </nav>
        <!-- {/* /.sidebar-menu */} -->
        </div>
        <!-- {/* /.sidebar */} -->
    </aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
   name: 'Sidebar',
   data(){
       return{
           api_path: process.env.VUE_APP_API_PATH,
       }
   },
   computed: {
       ...mapGetters({user:'auth/user'})
   }
}
</script>

<style>

</style>