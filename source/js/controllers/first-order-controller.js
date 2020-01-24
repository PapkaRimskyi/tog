import HeaderController from './second-controller-order/header-controller.js';
import MainController from './second-controller-order/main-controller.js';
import FooterController from './second-controller-order/footer-controller.js';

export default class FirstOrderController {
  constructor() {
    this.headerController = new HeaderController();
    this.mainController = new MainController();
    this.footerController = new FooterController();
  }

  render() {
    this.headerController.render();
    this.mainController.render();
    this.footerController.render();
  }
}
