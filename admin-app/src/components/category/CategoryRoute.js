import Category from './Category';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

export default  [
    {path: '/admin/category/all', component: Category, name: 'Category'},
    {path: '/admin/category/create', component: AddCategory, name: 'AddCategory'},
    {path: '/admin/category/edit/:id', component: EditCategory, name: 'EditCategory'},
];