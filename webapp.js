function getLocation() {
  if(navigator.location) {
    console.log(navigator.location.getCurrentPosition());
  }


}

window.addEventListener('load', getLocation());
