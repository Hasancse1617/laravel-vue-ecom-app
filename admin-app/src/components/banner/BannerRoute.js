import Banner from './Banner';
import AddBanner from './AddBanner';
import EditBanner from './EditBanner';

export default  [
    {path: '/admin/banner/all', component: Banner, name: 'Banner'},
    {path: '/admin/banner/create', component: AddBanner, name: 'AddBanner'},
    {path: '/admin/banner/edit/:id', component: EditBanner, name: 'EditBanner'},
];