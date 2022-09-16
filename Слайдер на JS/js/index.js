let images = [{
    url: "../images/admiral.jpg",
    city: "Rostov-on-Don<br>LCD admiral",
    area: "81 m2",
    repair_time: "3.5 months",
    repair_cost: "Upon request"
  }, {
    url: "../images/thieves.jpg",
    city: `Sochi<br>Thieves`,
    area: "105 m2",
    repair_time: "4 months",
    repair_cost: "Upon request"
  }, {
    url: "../images/patriotic.jpg",
    city: "Rostov-on-Don<br>Patriotic",
    area: "93 m2",
    repair_time: "3 months",
    repair_cost: "Upon request"
}];

function initSlider() {
    if(!images || !images.length) return;

    let sliderImages = document.querySelector(".image-city");
    let sliderArrows = document.querySelector(".button-back-forward");
    let sliderDots = document.querySelector(".slider_dots");
    let sliderLinks = document.querySelector(".menu-projects");
    let descriptionApartment = document.querySelector(".description-apartment");
    
    initImages();
    initArrows();
    initLink();
    initDots();

    function initImages() {
        images.forEach((image, index) => {
            let imgDiv = `<div id="image${index}" class="image n${index} ${index === 0 ? "active" : ""}" 
            style="background-image:url(${images[index].url});" data-index="${index}">
            </div>`;
            
            sliderImages.innerHTML += imgDiv;
        });
    }  

    function initArrows() {
        sliderArrows.querySelectorAll(".button-arrow").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let imageNum = +sliderImages.querySelector(".active").dataset.index;
                let nextImgNum;
                if(arrow.classList.contains("left")) {
                    nextImgNum = imageNum === 0 ? images.length - 1 : imageNum - 1;
                } else {
                    nextImgNum = imageNum === images.length - 1 ? 0 : imageNum + 1;
                }
                moveSlider(nextImgNum);
            });
        });
    }

    function initLink() {
        sliderLinks.querySelectorAll(".projects-item").forEach(arrow => {
            arrow.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
        });
    }

    function initDots() {
        images.forEach((image, index) => {
          let dot = `<div class="slider_dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
          sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider_dots-item").forEach(dot => {
          dot.addEventListener("click", function() {
            moveSlider(this.dataset.index);
          })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");

        descriptionApartment.querySelectorAll(".content-projects").forEach(item => {
            if(item.classList.contains("city")) {
                item.textContent = "";
                item.insertAdjacentHTML("afterbegin",(images[num].city));
            } else if (item.classList.contains("area")) {
                item.textContent = images[num].area;
            } else if (item.classList.contains("repair_time")) {
                item.textContent = images[num].repair_time;
            } else {
                item.textContent = images[num].repair_cost;
            }
        })

        sliderLinks.querySelector(".active").classList.remove("active");
        sliderLinks.querySelector(".n"+ num).classList.add("active");

        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
    }


}

document.addEventListener("DOMContentLoaded", function() {
    initSlider();
  });