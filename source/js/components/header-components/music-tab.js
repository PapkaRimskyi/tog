import AbstractClass from '../../support-classes/abstract-class.js';

const musicMarkup = () => `<section class="music">
  <h2 class="visually-hidden">Раздел с музыкой</h2>
  <audio class="music__audio" src="assets/music/fort-boyard.mp3" controls></audio>
</section>
`;

export default class Music extends AbstractClass {
  constructor() {
    super();
  }

  //Template

  getTemplate() {
    return musicMarkup();
  }
}
