<template>
    <div className="pagination ml-2">
        <ul>
           <li v-if="parseInt(page) > 1"><router-link :to="`${pageLink}?page=${parseInt(page) - 1}`"><i class="fas fa-long-arrow-alt-left"></i></router-link></li>
           <li v-for="list in store" :key="list"><router-link :class="`${list==page?'active':''}`" :to="`${pageLink}?page=${list}`">{{list}}</router-link></li>
           <li v-if="parseInt(page) < totalPages"><router-link :to="`${pageLink}?page=${parseInt(page) + 1}`"><i class="fas fa-long-arrow-alt-right"></i></router-link></li>
        </ul>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
    name: 'Pagination',
    props: ['page','totalPages','store','pageLink'],
    // computed:{
    //     ...mapState('user',['page','totalPages','store']),
    // }
}
</script>

<style>
    .pagination.ml-2 {
        margin-top: 25px;
    }
    .pagination li{
        list-style: none;
        display: inline;
    }
    .pagination li a {
        padding: 5px;
        background: #e4d9d9;
        margin-right: 5px;
        border: 2px solid green;
        color: black;
        padding-left: 10px;
        padding-right: 10px;
    }
    .pagination li a.active{
        background: cadetblue;
    }
</style>