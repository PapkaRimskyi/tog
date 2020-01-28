import HeaderController from './second-controller-order/header-controller.js';
import MainController from './second-controller-order/main-controller.js';
import FooterController from './second-controller-order/footer-controller.js';

export default class FirstOrderController {
  constructor() {
    this.mainController = new MainController();
    this.headerController = new HeaderController(this.mainController);
    this.footerController = new FooterController();
  }

  render() {
    this.headerController.render();
    this.footerController.render();
  }
}
