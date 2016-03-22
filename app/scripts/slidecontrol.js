'use strict';

class SlideController {
  constructor(slideCollection, container) {
    this.slideCollection = slideCollection;
    this.container = container;
    this.timeout;
  }

  init() {
    this.play(this.slideCollection.getCurrent());
  }

  play(slide) {
    this.stop();
    let context = this;
    console.log(typeof slide);
    if (typeof slide == 'undefined') {
      slide = this.slideCollection.getNext();
    }
    this.container.setAttribute('src', slide.url);
    this.timeout = setTimeout(
      function() {
        context.play();
      },
    slide.timeout);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  rewind() {
    this.stop();
    this.play(this.slideCollection.getPrevious());
  }

  forward() {
    this.stop();
    this.play(this.slideCollection.getNext());
  }

}
