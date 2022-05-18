/***************************************************/
/************* Save Image To Email *****************/
/***************************************************/
const storedImages = [];

$(".save").click(() => {
    if (animation) return;
    animation = true;
    // Hide header
    $(".header").fadeOut("slow");
    $(".footer").animate({
        bottom: "-71px"
    }, 1000, () => {
        let index = storedImages.findIndex(x => x.unique === item.unique);
        if (index === -1) {
            $('.save-image').fadeIn("slow");
        } 
            // Load thumbnail, title, name and email form for current image to save.
            $('.save-image .info').html(`${item.description.substring(0, 50)} - ${item.name}`);
            $(".save-image .img").css("background", `url(${item.thumb}) center center / cover no-repeat`);
            // Open up save overlay
            $(".save-overlay").fadeIn("slow");    

        // Load previous saves
        $(".stored-images").html("");
        $(storedImages).each((index, element) => {
            $(".stored-images").append(`<div class="flex"data-val="${element.unique}"><div class="img img-${index}"></div><div class="info">${element.description.substring(0, 50)} - ${element.name}</div><div class="email">${element.email}</div><div class="delete">X</div></div>`);
            $(`.stored-images .img-${index}`).css("background", `url(${element.thumb}) center center / cover no-repeat`);
        });
        
        animation = false;
    })
})

$('.email button').click((e)=>{
    e.preventDefault();
    if (animation) return;
    animation = true;
    let email = $("#save-email").val();
    let regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (regex.test(email)){
        item.email = email;
    } else {
        animation = false;
        return alert("Email not valid. Please try again.");
    }
    $("#save-email").val("");
    storedImages.push(item);
    $('.save-image').fadeOut("slow");
    let storeId = storedImages.length - 1;
    $(".stored-images").append(`<div class="flex" data-val="${item.unique}"><div class="img img-${storeId}"></div><div class="info">${item.description.substring(0, 50)} - ${item.name}</div><div class="email">${item.email}</div><div class="delete">X</div></div>`);
    
    $(`.stored-images .img-${storeId}`).css("background", `url(${item.thumb}) center center / cover no-repeat`); 
    animation = false;
})

$(".save-close").click(() => {
    if (animation) return;
    animation = true;
    $(".save-overlay").fadeOut("slow", () => {
        if ($(".full-image").attr("style")){
            $(".header").fadeIn("slow");
            $(".footer").animate({
                bottom: "10px"
            }, 1000, () => {
                animation = false;
            })
        } else {
            $(".search-arrow").addClass("hidden");
            $(".overlay").animate({
                top: "0px",
                height: "100vh"
            }, 1000, () => {    
                animation = false;
            })
        }
        $(".save-overlay").removeAttr("style");
    })
})

$("#savedBtn").click(async e => {
    e.preventDefault();

    $(".overlay").animate({
        top: "-90px",
        height: "0"
    }, 1000, () => {
        // Open up save overlay
        $('.save-image').hide();
        $(".save-overlay").fadeIn("slow");    

        // Load previous saves
        $(".stored-images").html("");
        $(storedImages).each((index, element) => {
            $(".stored-images").append(`<div class="flex" data-val="${element.unique}"><div class="img img-${index}"></div><div class="info">${element.description.substring(0, 50)} - ${element.name}</div><div class="email">${element.email}</div><div class="delete">X</div></div>`);
            $(`.stored-images .img-${index}`).css("background", `url(${element.thumb}) center center / cover no-repeat`);
        });
    });
})

$(".stored-images").click((e) => {
    if ($(e.target).hasClass("delete")){
        $(e.target).parent().remove();
        let index = storedImages.findIndex(x => x.unique === $(e.target).parent().attr("data-val"));
        if (index !== -1){
            storedImages.splice(index, 1);
        }
    }
})