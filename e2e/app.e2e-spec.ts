import { HackernewsPage } from './app.po';

describe('hackernews App', () => {
  let page: HackernewsPage;

  beforeEach(() => {
    page = new HackernewsPage();
  });

  it('should display message saying Hackernews', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hackernews');
  });
});
