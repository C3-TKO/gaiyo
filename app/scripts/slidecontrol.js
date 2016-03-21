class SlideController {
  constructor(slideCollection, container) {
    this.slideCollection = slideCollection;
    this.container = container;
    this.timeout;
  }

  init() {
    this.play()
  }

  play() {
    let context = this;
    let slide = this.slideCollection.getNext()
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

}
