let animation = false;
/***************************************************/
/************** Show / Hide Overlay ****************/
/***************************************************/
const hideOverlay = () => {
    $(".overlay").animate({
        top: "-70px",
        height: "0"
    }, 1000, () => {
        //If full image is not open, show the arrow
        if (!$(".full-image").attr("style")){
            $(".search-arrow").removeClass("hidden");
            $(".grid-container div").each((i, e) => {
                $(e).addClass("hover");
            });
        }
    });
}
$(".overlay").click((e) => {
    if (animation) return;
    animation = true;
    if ($(e.target).hasClass("overlay")){
        //If the arrow isn't displayed, it means the overlay is active
        if ($(".search-arrow").hasClass("hidden")){
            //Slide up the overlay
            hideOverlay();
            // if on full image and overlay (search arrow hidden), must be on new search, so slide up the footer
            if ($(".full-image").attr("style")){
                $(".footer").animate({
                    bottom: "10px"
                }, 1000)
            }
        }
    }
    animation = false;
})

$(".search-arrow").click((e) => {
    if (animation) return;
    animation = true;
    
    setTimeout($(".search-arrow").addClass("hidden"), 200);
    
    $(".grid-container div").each((i, e) => {
        $(e).removeClass("hover");
    })
    
    $(".overlay").animate({
        top: "0px",
        height: "100vh"
    }, 1000, () => {     
        animation = false;
    })
});

/***************************************************/
/************* Show Full Grid Image ****************/
/***************************************************/
let item;
$(".grid-container div").click((e) => {
    if (animation) return;
    animation = true;
    // Hide the arrow
    $(".search-arrow").addClass("hidden");

    // Store the positional information of the targeted image.
    item = {
        "top": e.currentTarget.offsetTop - 1,
        "left": e.currentTarget.offsetLeft - 1,
        "width": e.currentTarget.offsetWidth + 2,
        "height": e.currentTarget.offsetHeight + 2,
        "id": $(e.target).attr("data-num")
    }
    console.log(gridImages.results[item.id]);

    // Overlay an absolutely positioned replica.
    $(".full-image").css({
        "position": "absolute",
        "top": e.currentTarget.offsetTop - 1,
        "left": e.currentTarget.offsetLeft - 1,
        "width": e.currentTarget.offsetWidth + 2,
        "height": e.currentTarget.offsetHeight + 2,
        "background": `url(${gridImages.results[item.id].urls.regular}) center center / cover no-repeat`,
        "z-index": "10"
    });

    // Expand it to full screen
    $(".full-image").delay(200).animate({
        width: "100vw",
        height: "100vh",
        left: "0",
        top: "0",
        opacity: "1"
    }, 1000, () => {
        let description = gridImages.results[item.id].description || "Image";
        let name = `by ${gridImages.results[item.id].user.name}` || "";
        $(".title").html(`<h2>${description}</h2><h3>${name}</h3>`);
        $(".title").fadeIn("slow");
        $(".footer").fadeIn("slow");
        animation = false;
    });
});

/***************************************************/
/*************** Hide Full Image *******************/
/***************************************************/

$(".full-image").click(async (e) => {
    if (animation) return;
    if (!$(e.target).hasClass("full-image")) return;
    animation = true;
    $(".title").fadeOut("slow");
    await $(".footer").fadeOut("slow");
    $(".full-image").animate({
        top: item.top,
        left: item.left,
        width: item.width,
        height: item.height,
        opacity: 0
    }, 1000, () => {
        $(".full-image").removeAttr("style");
        $(".search-arrow").removeClass("hidden");
        animation = false;
    });
})

/***************************************************/
/********** Full Image Button Handlers *************/
/***************************************************/
$(".new").click(() => {
    if (animation) return;
    animation = true;
    
    $(".footer").animate({
        bottom: "-52px"
    }, 1000)

    $(".overlay").animate({
        top: "0",
        height: "100vh"
    }, 1000, () => {     
        animation = false;
    })
});

$(".prev").click(() => {
    if (item.search) {
        updateItem(item.id-1, true);
    } else {
        updateItem(item.id-1);
    }
    $(".full-image").animate({
        opacity: "0"
    }, 1000, () => {
        $(".full-image").css("background", `url(${item.background}) center center / cover no-repeat`);
        $(".title").html(`<h2>${item.description.substring(0, 40)}</h2><h3>${item.name}</h3>`);
        $(".full-image").animate({
            opacity: "1"
        }, 1000)
    })
})

$(".next").click(() => {
    if (item.search) {
        updateItem(item.id+1, true);
    } else {
        updateItem(item.id+1);
    }
    $(".full-image").animate({
        opacity: "0"
    }, 1000, () => {
        $(".full-image").css("background", `url(${item.background}) center center / cover no-repeat`);
        $(".title").html(`<h2>${item.description.substring(0, 40)}</h2><h3>${item.name}</h3>`);
        $(".full-image").animate({
            opacity: "1"
        }, 1000)
    })
})

/***************************************************/
/********** Update Current Item Object *************/
/***************************************************/

const updateItem = (id, search) => {
    if (!search) {
        if (id > gridImages.results.length-1) {
            id = 0;
        } 
        if (id < 0){
            id = gridImages.results.length-1;
        }
        item = {
            "top": $(".grid-container div")[id].offsetTop - 1,
            "left": $(".grid-container div")[id].offsetLeft - 1,
            "width": $(".grid-container div")[id].offsetWidth + 2,
            "height": $(".grid-container div")[id].offsetHeight + 2,
            "id": id,
            "background": gridImages.results[id].urls.regular,
            "description": gridImages.results[id].description || "Image",
            "name": `by ${gridImages.results[id].user.name}` || "",
            "search": false
        }
    } else {
        if (id > searchImages.results.length-1) {
            id = 0;
        } 
        if (id < 0){
            id = searchImages.results.length-1;
        }
        item = {
            "id": id,
            "background": searchImages.results[id].urls.regular,
            "description": searchImages.results[id].description || "Image",
            "name": `by ${searchImages.results[id].user.name}` || "",
            "search": true
        }
    }
    
    if (item.height === 2 || search){
        item.top = window.innerHeight / 2;
        item.left = window.innerWidth / 2;
        item.width = 0;
        item.height = 0;
    }
}

/***************************************************/
/********** Search Results Animations **************/
/***************************************************/

const processSearchResults = () => {
    if (animation) return; 
    animation = true;
    // Hide the overlay
    hideOverlay();

    // if full image is open, 
    if ($(".full-image").attr("style")){
        // fade and shrink full image back to grid position 
        $(".title").fadeOut("slow");
        $(".footer").fadeOut("slow");
        $(".full-image").animate({
            top: item.top - 1,
            left: item.left - 1,
            width: item.width + 2,
            height: item.height + 2,
            opacity: 0
        }, 1000, () => {
            //update full image
            updateItem(0, true);
            // Overlay an absolutely positioned replica.
            $(".full-image").css({
                "position": "absolute",
                "top": item.top,
                "left": item.left,
                "width": item.width,
                "height": item.height,
                "background": `url(${item.background}) center center / cover no-repeat`,
                "z-index": "10",
                "opacity": "0"
            });
            // Expand it to full screen
            $(".full-image").delay(200).animate({
                width: "100vw",
                height: "100vh",
                left: "0",
                top: "0",
                opacity: "1"
            }, 1000, () => {
                $(".title").html(`<h2>${item.description.substring(0, 40)}</h2><h3>${item.name}</h3>`);
                $(".title").fadeIn("slow");
                $(".footer").fadeIn("slow");
                $(".footer").animate({
                    bottom: "10px"
                }, 1000)
            });
        });
    } else {
        //open full image
        updateItem(0, true);
        // Overlay an absolutely positioned replica.
        $(".full-image").css({
            "position": "absolute",
            "top": item.top,
            "left": item.left,
            "width": item.width,
            "height": item.height,
            "background": `url(${item.background}) center center / cover no-repeat`,
            "z-index": "10",
            "opacity": "0"
        });
        // Expand it to full screen
        $(".full-image").delay(200).animate({
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            opacity: "1"
        }, 1000, () => {
            $(".title").html(`<h2>${item.description.substring(0, 40)}</h2><h3>${item.name}</h3>`);
            $(".title").fadeIn("slow");
            $(".footer").fadeIn("slow");
        });
    }
    animation = false;
}
