const Pagination = (page,count,perPage)=>{
    let startloop;
    let endloop;
    let totalPages = Math.ceil(count / perPage);
    if (totalPages <= 3) {
        startloop = 1;
        endloop = totalPages;
    }
    else if(parseInt(page) === 1){
        startloop = 1;
        endloop = parseInt(page) + 2;
    }
    else if(parseInt(page) === totalPages){
        startloop = parseInt(page) - 2;
        endloop = totalPages;
    }
    else if(totalPages > 3){
        startloop = parseInt(page) - 1;
        endloop = parseInt(page) + 1;
    }
    let store = [];
    for (let i = startloop; i <= endloop; i++) {
        store.push(i); 
    }

    return {store,totalPages};
}
export default Pagination;