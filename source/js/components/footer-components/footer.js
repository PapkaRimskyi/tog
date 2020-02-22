import AbstractClass from '../../support-classes/abstract-class.js';

const copyrightMarkup = () => `<section class="copyright">
  <h2 class="visually-hidden">Остальная информация</h2>
  <p class="copyright__text">Придумано компанией ЛГД в 2019 году. Все права защищены &#169;.</p>
</section>
`;

export default class Copyright extends AbstractClass {
  constructor() {
    super();
  }

  //Template

  getTemplate() {
    return copyrightMarkup();
  }
}
