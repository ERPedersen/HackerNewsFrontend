import { HackernewsPage } from './app.po';

describe('hackernews App', () => {
  let page: HackernewsPage;

  beforeEach(() => {
    page = new HackernewsPage();
  });

  it('should display title saying Hacker News', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hacker News');
  });
});
