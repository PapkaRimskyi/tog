import Footer from '../components/footer-components/footer.js';

import { renderMarkup } from '../utils.js';

export default class FooterController {
  constructor() {
    this.footerComponent = new Footer();
    this.body = document.body;
  }
  render() {
    renderMarkup(this.body, this.footerComponent, `beforeend`);
  }
}
