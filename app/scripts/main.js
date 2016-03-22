'use strict';

var collection = new Collection([]);
collection.addSlide(new Slide('Familienblog', 'http://www.opel.de', 5000));
collection.addSlide(new Slide('Badminton App', 'http://smash.cologne', 5000));
collection.addSlide(new Slide('Apple Webseite', 'http://apple.de', 5000));

var slideController = new SlideController(collection, document.getElementById('slide-container'))
slideController.init();

// Binding click events
document.getElementById('play').addEventListener('click', function() {slideController.play(); document.getElementById('play').style.display = 'none'; document.getElementById('stop').style.display = 'inline'}, false);
document.getElementById('stop').addEventListener('click', function() {slideController.stop(); document.getElementById('stop').style.display = 'none'; document.getElementById('play').style.display = 'inline'}, false);
document.getElementById('rewind').addEventListener('click', function() {slideController.rewind()}, false);
document.getElementById('forward').addEventListener('click', function() {slideController.forward()}, false);
