import {createStore} from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import banner from './modules/banner';
import brand from './modules/brand';
import category from './modules/category';

const store = createStore({
    modules:{
        auth,
        user,
        banner,
        brand,
        category,
    }
})

export default store;