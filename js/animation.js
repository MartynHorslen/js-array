let animation = false;
/***************************************************/
/************** Show / Hide Overlay ****************/
/***************************************************/
$(".overlay").click((e) => {
    if (animation) return;
    animation = true;
    if ($(e.target).hasClass("overlay")){
        if ($(".search-arrow").hasClass("hidden")){
            $(".overlay").animate({
                top: "-70px",
                height: "0"
            }, 1000, () => {
                if (!$(".full-image").attr("style")){
                    $(".search-arrow").removeClass("hidden");
                    $(".grid-container div").each((i, e) => {
                        $(e).addClass("hover");
                    });
                }                
                
                animation = false;
            });
        }
    }
})

$(".search-arrow").click((e) => {
    if (animation) return;
    animation = true;
    
    setTimeout($(".search-arrow").addClass("hidden"), 200);
    
    $(".grid-container div").each((i, e) => {
        $(e).removeClass("hover");
    })
    
    $(".overlay").animate({
        top: "0",
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
        top: item.top - 1,
        left: item.left - 1,
        width: item.width + 2,
        height: item.height + 2,
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
    
    $(".overlay").animate({
        top: "0",
        height: "100vh"
    }, 1000, () => {     
        animation = false;
    })
});