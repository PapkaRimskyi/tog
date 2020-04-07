import FooterMarkup from '../../markup/footer-markup.js';

import Copyright from '../../components/footer-components/footer.js';

import { renderMarkup } from '../../utils.js';

export default class FooterController {
  constructor() {
    this.year = new Date().getFullYear();
    this.footerTag = document.querySelector(`.tog-footer`);

    this.footerMarkupInstance = new FooterMarkup();

    this.copyrightComponent = new Copyright(this.footerMarkupInstance.getFooterMarkup(this.year));
  }

  //Render

  render() {
    renderMarkup(this.footerTag, this.copyrightComponent, `beforeend`);
  }
}
