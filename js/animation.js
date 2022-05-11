const getImage = async (search) => {
    let url = "https://loremflickr.com/json/1920/1080/" + search + "/all";
    // const res = await fetch(url, {
    //     headers: {
    //       "Access-Control-Allow-Origin": '*'
    //     }
    //    });
    // const json = await res.json();
    // return json;
    return $.get("https://loremflickr.com/json/1920/1080/", () => {
        alert("success");
      })
      .done(function() {
        alert( "second success" );
      })
      .fail(function() {
        alert( "error" );
      })
      .always(function() {
        alert( "finished" );
      });
}

const getSearchInput = () => {
    return $('#search').val();
}

$('#searchBtn').click((e)=>{
    e.preventDefault();
    const image = getImage(getSearchInput());
    console.log(image);
})


    
    