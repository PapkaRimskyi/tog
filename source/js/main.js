import './polyfill.js';
import '../sass/style.scss';
import FirstOrderController from './controllers/first-order-controller.js';

const firstOrderController = new FirstOrderController();

firstOrderController.render();
