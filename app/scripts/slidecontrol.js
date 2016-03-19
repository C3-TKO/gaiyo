class SlideController {
  constructor(slideCollection, container) {
    this.slideCollection = slideCollection;
    this.container = container;
    this.currentSlideIndex = 0;
  }

  play() {
    this.container.setAttribute('src', this.getNextSlide().url);
  }

  getCurrentSlide() {
    return this.slideCollection.slides[this.currentSlideIndex]
  }

  getNextSlide() {
    return
      ++this.currentSlideIndex >= this.slideCollection.length
      ? this.slideCollection.slides[0]
      : this.slideCollection.slides[this.currentSlideIndex]
  }

  getPreviousSlide() {
    return
      --this.currentSlideIndex < 0
      ? this.slideCollection.slides[this.slideCollection.length]
      : this.slideCollection.slides[this.currentSlideIndex]
  }
}
