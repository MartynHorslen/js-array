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
        for (let i = 0; i < Object.keys(storedEmail).length; i++){
            let key = Object.keys(storedEmail)[i];
            let index = 0;
            
            if (storedEmail[key].length === 0){
                continue;
            }
            $(".stored-images").append(`<div class="group group-${i}"><h3>${Object.keys(storedEmail)[i]}</h3>`);

            for (let j = 0; j < storedEmail[key].length; j++){
                let element = storedEmail[key][j];
                $(`.group-${i}`).append(`<div class="flex" data-val="${element.unique}"><div class="img img-${index}"></div><div class="info">${element.description.substring(0, 50)} - ${element.name}</div><div class="delete">X</div></div>`);
                $(`.group-${i} .img-${index}`).css("background", `url(${element.thumb}) center center / cover no-repeat`);
                index++;
            }
            $(".stored-images").append("</div>");
        }
        
        animation = false;
    })
})
const storedEmail = [];
$('.email button').click((e)=>{
    e.preventDefault();
    if (animation) return;
    animation = true;
    let email = $("#save-email").val();
    let regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (regex.test(email)){
        item.email = email;
        if (storedEmail[email]){
            storedEmail[email].push(item);
        } else {
            storedEmail[email] = [item];
        }
    } else {
        animation = false;
        return alert("Email not valid. Please try again.");
    }
    $("#save-email").val("");
    storedImages.push(item);
    $('.save-overlay').fadeOut("slow", () => {
        if (item.search) {
            updateItem(+item.id + 1, true);
        } else {
            updateItem((+item.id + 1));
        }
        $(".full-image").animate({
            opacity: "0"
        }, 1000, () => {
            $(".full-image").css("background", `url(${item.background}) center center / cover no-repeat`);
            $(".title").html(`<h2>${item.description.substring(0, 100)}</h2><h3>${item.name}</h3>`);
            $(".full-image").animate({
                opacity: "1"
            }, 1000, () => {
                $(".header").fadeIn("slow");
                $(".footer").animate({
                    bottom: "60px"
                }, 1000, () => {
                    animation = false;
                })
            })
        })
    });    
    animation = false;
})

$(".save-close").click(() => {
    if (animation) return;
    animation = true;
    $(".save-overlay").fadeOut("slow", () => {
        if ($(".full-image").attr("style")){
            $(".header").fadeIn("slow");
            $(".footer").animate({
                bottom: "60px"
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
        
        for (let i = 0; i < Object.keys(storedEmail).length; i++){
            let key = Object.keys(storedEmail)[i];
            let index = 0;
            if (storedEmail[key].length === 0){
                continue;
            }
            $(".stored-images").append(`<div class="group group-${i}"><h3>${Object.keys(storedEmail)[i]}</h3>`);

            for (let j = 0; j < storedEmail[key].length; j++){
                let element = storedEmail[key][j];
                $(`.group-${i}`).append(`<div class="flex" data-val="${element.unique}"><div class="img img-${index}"></div><div class="info">${element.description.substring(0, 50)} - ${element.name}</div><div class="delete">X</div></div>`);
                $(`.group-${i} .img-${index}`).css("background", `url(${element.thumb}) center center / cover no-repeat`);
                index++;
            }
            $(".stored-images").append("</div>");
        }
    });
})

$(".stored-images").click((e) => {
    if ($(e.target).hasClass("delete")){
        let uni = $(e.target).parent().attr("data-val");
        let email = $(e.target).parent().prevAll("h3").text();
        const index = storedEmail[email].findIndex(x => x.unique === uni);
        if (index !== -1){
            storedEmail[email].splice(index, 1);
        }
        if (storedEmail[email].length === 0){
            $(e.target).parent().prevAll("h3").remove();
        }
        $(e.target).parent().remove();
    }
})