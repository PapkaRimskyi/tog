import Copyright from '../../components/footer-components/footer.js';

import { renderMarkup } from '../../utils.js';

export default class FooterController {
  constructor() {
    this.footerTag = document.querySelector(`.tog-footer`);
    this.copyrightComponent = new Copyright();
  }

  //Render

  render() {
    renderMarkup(this.footerTag, this.copyrightComponent, `beforeend`);
  }
}
