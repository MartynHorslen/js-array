const getImage = async (search = "random") => {
    let url = "https://api.unsplash.com/photos/random?page=1&query=" + search + "w=1920&h=1080";
    const res = await fetch(url, {
        headers: {
            "Accept-Version": "v1",
            'Content-Type': 'application/json',
            'Authorization': 'Client-ID 6cjuAXDwiYa2McEaTE62x47Yn5MBrHypebN3CF1eG2k'
        }
    });
    const json = await res.json();
    return json;
}

const getSearchInput = () => {
    return $('#search').val();
}

$('#searchBtn').click((e)=>{
    e.preventDefault();
    const image = getImage(getSearchInput());
    image.then(val => {
        console.log(val.urls.full);
        $('body').html('<img class="hidden" src="' + val.urls.full +'" /><div class="loader"></div>');
        setTimeout(() => {
            $(".loader").hide();
            $("img").show();
        }, 3000)

    })
})


    
    