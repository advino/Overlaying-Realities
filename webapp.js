function hasGetUserMedia() {
return !!(navigator.mediaDevices &&
navigator.mediaDevices.getUserMedia);
}

if(hasGetUserMedia()) {
console.log('good to go!');

} else {

  alert('getUserMedia aint available');
}
