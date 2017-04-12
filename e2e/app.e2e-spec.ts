import { NamedRouterOutletsPage } from './app.po';

describe('named-router-outlets App', () => {
  let page: NamedRouterOutletsPage;

  beforeEach(() => {
    page = new NamedRouterOutletsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
