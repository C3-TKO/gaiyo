class Collection {
  constructor(slides) {
    this.slides = slides;
    this.current = 0;
  }

  addSlide(slide) {
    this.slides.push(slide);
  }

  current() {
    return this.slides[this.current]
  }

  next() {

    if(this.current >= this.slides.length) {

    }
    else {
    return this.slides[this.current];
  }

    return
      ++this.current >= this.slides.length
      ? this.slides[0]
      : this.slides[this.current]
  }

  previous() {
    return
      --this.current < 0
      ? this.slides[this.slides.length]
      : this.slides[this.current]
  }
}
