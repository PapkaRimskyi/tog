import HeaderController from './header-controller.js';
import FooterController from './footer-controller.js';

export default class MainController {
  constructor() {
    this.headerController = new HeaderController();
    this.footerController = new FooterController();
  }

  render() {
    this.headerController.render();
    this.footerController.render();
  }
}
