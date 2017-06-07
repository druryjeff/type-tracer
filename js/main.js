/* Variables */

const paths = document.querySelectorAll("path");
const overlay = document.querySelector(".overlay");
const specimen = document.querySelector(".specimen");
const loading = document.querySelector(".loading");
const loadingMessage = document.querySelector(".loading p");
let i = 0;

/* Functions */

// CSS animation delay is initially set to stagger intitial drawing of letters
// This delay amount gets in the way of hover state (waiting to display a style on hover wrecks effect)
// Get rid of the animation delay via inline style
function overrideAnimationDelay(){
  this.style.animationDelay = '0s';
}

function displayDesignDetail(e) {
  // reference currently selected letter
  let current = document.querySelector("#"+e.target.id);
  // update type details display using data values from currently selected letter
  overlay.querySelector(".type-name").innerHTML = current.getAttribute("data-type-name");
  overlay.querySelector(".type-style").innerHTML = current.getAttribute("data-type-style");
  overlay.querySelector(".type-designer").innerHTML = current.getAttribute("data-type-designer");
  overlay.querySelector(".type-year").innerHTML = current.getAttribute("data-type-year");
  overlay.querySelector(".type-foundary").innerHTML = current.getAttribute("data-type-foundary");
  // clone type specimen path
  cloneTypeSpecimen(current,e);
  // show overlay
  overlay.classList.toggle("js-hide");
}

function cloneTypeSpecimen(el,ev){
  // clone path element for type specimen display and remove id
  let clone = el.cloneNode();
  clone.removeAttribute("id");
  // get viewbox details and set attributes needed to properly position cloned svg path
  let bbox = el.getBBox();
  specimen.setAttribute('viewBox', bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height);
  // add a unique id for styling css height of .type-decription element
  specimen.setAttribute("id",'spec-'+ev.target.id);
  // clear out previous svg path content
  specimen.innerHTML = '';
  // append cloned path to type details display
  specimen.appendChild(clone);
}

function closeOverlay(){
  // remove unique id for styling css height of .type-decription element
  specimen.removeAttribute("id");  
	overlay.classList.toggle("js-hide");
}

function hideLoading(){
  loading.classList.add("js-hide");
  clearInterval(swapLoadingMessage);
}

function init(){
  // hide overlay layer until it's needed
  overlay.classList.toggle("js-hide");
}

function doLoadingMessageSwap(){
  if(i==0){
    loadingMessage.innerHTML = 'Tracing Type';
    i = 1;
  } else {
    loadingMessage.innerHTML = 'Touch Text for Details';
    i = 0;
  }
}

init();

/* Events */

paths.forEach(path => path.addEventListener("click", displayDesignDetail));
paths.forEach(path => path.addEventListener("mouseover", overrideAnimationDelay));
overlay.addEventListener("click", closeOverlay);
loading.addEventListener("animationend", hideLoading);
const swapLoadingMessage = setInterval(doLoadingMessageSwap, 2000);
