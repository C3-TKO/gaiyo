class SlideController {
  constructor(slideCollection, container) {
    this.slideCollection = slideCollection;
    this.container = container;
  }

  play() {
    this.container.setAttribute('src', this.slideCollection.slides[0].url);
  }
}
