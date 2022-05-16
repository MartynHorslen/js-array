/***************************************************/
/****************** Functions **********************/
/***************************************************/
const getImage = async (search, page, num) => {
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&per_page=${num}`
    let res = await fetch(url, {
        headers: {
            "Accept-Version": "v1",
            'Content-Type': 'application/json',
            'Authorization': 'Client-ID 6cjuAXDwiYa2McEaTE62x47Yn5MBrHypebN3CF1eG2k'
        }
    });
    if (res.status === 403){
        $(".overlay").html('<div class="header"><h2 class="error">There has been too many requests made to the server this hour. Please try again later.</h2></div>');
        //Placeholder images?
        //let json = {};
        return;
    } else {
        let json = await res.json();
        return json;
    }
};

const getSearchInput = () => {
    if ($('#search').val() === ""){
        return "office";
    } else {
        let query = $('#search').val();
        $('#search').val("");
        return query;
    }
};

const updateGridImages = (images) => {
    $(".grid-container div").each((i, e) => {
        $( e ).css("background", 'url("' + images.results[i].urls.small + '") center center / cover no-repeat').attr("data-num", i);
    });
}

/***************************************************/
/******************* Events ************************/
/***************************************************/

let gridImages;
$(document).ready(async ()=>{
    const randNum = Math.random() * 100; 
    gridImages = await getImage(getSearchInput(), randNum, 14);
    updateGridImages(gridImages);
});

let searchImages;
$("#searchBtn").click(async (e) => {
    e.preventDefault();
    searchImages = await getImage(getSearchInput(), 1, 30);
    console.log(searchImages);
    processSearchResults();
})