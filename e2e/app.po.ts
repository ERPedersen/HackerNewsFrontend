import { browser, element, by } from 'protractor';

export class HackernewsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.navbar-brand')).getText();
  }
}
