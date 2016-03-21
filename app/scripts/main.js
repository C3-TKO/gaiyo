var collection = new Collection([]);
collection.addSlide(new Slide('Familienblog', 'http://www.bmw.de', 5000));
collection.addSlide(new Slide('Badminton App', 'http://smash.cologne', 5000));
collection.addSlide(new Slide('Apple Webseite', 'http://apple.de', 5000));

var slideController = new SlideController(collection, document.getElementById('slide-container'))
slideController.play();

// Binding click events
document.getElementById('play').addEventListener('click', function() {slideController.play()}, false);
document.getElementById('stop').addEventListener('click', function() {slideController.stop()}, false);
document.getElementById('rewind').addEventListener('click', function() {slideController.rewind()}, false);
document.getElementById('forward').addEventListener('click', function() {slideController.forward()}, false);
