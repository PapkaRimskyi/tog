export default class FooterMarkup {
  getFooterMarkup(year) {
    return `<section class="copyright">
    <h2 class="visually-hidden">Остальная информация</h2>
    <p class="copyright__text">Придумано компанией <span class="copyright__participant">Л</span><span class="copyright__participant copyright__participant--green-color">Г</span><span class="copyright__participant copyright__participant--gold-color">Д</span>.</p>
    <p class="copyright__text">Все права защищены 2019-${year}&#169;</p>
  </section>
    `;
  }
}
