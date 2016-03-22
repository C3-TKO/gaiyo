'use strict';

class Collection {
  constructor(slides) {
    this.slides = slides;
    this.pointer = 0;
  }

  addSlide(slide) {
    this.slides.push(slide);
  }

  getCurrent() {
    return this.slides[this.pointer];
  }

  getNext() {
    if (++this.pointer >= this.slides.length) {
      this.pointer = 0;
    }

    return this.getCurrent();
  }

  getPrevious() {
    if (--this.pointer < 0) {
      this.pointer = this.slides.length - 1;
    }

    return this.getCurrent();
  }
}
