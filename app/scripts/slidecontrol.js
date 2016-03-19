class SlideController {
  constructor(slideCollection, container) {
    this.slideCollection = slideCollection;
    this.container = container;

    this.timeout;
  }

  play() {
    this.container.setAttribute('src', this.slideCollection.next().url);
    //this.timeout = setTimeout(this.play(), this.getCurrentSlide.timeout);
  }

}
