import AbstractClass from '../../support-classes/abstract-class.js';

const footerMarkup = () => `<footer class="tog-footer">
<section class="copyright">
  <h2 class="visually-hidden">Остальная информация</h2>
  <p class="copyright__text">Придумано компанией ЛГД в 2019 году. Все права защищены &#169;.</p>
</section>
</footer>
`;

export default class Footer extends AbstractClass {
  constructor() {
    super();
  }

  getTemplate() {
    return footerMarkup();
  }
}
