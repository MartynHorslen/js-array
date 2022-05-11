const getImage = async (search) => {
    let url = "https://loremflickr.com/json/1920/1080/" + search + "/all";
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

const getSearchInput = () => {
    return $('#search').val();
}

$('#searchBtn').click((e)=>{
    e.preventDefault();
    const image = getImage(getSearchInput());
    console.log(image);
})


    
    