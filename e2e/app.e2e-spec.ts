import { AngularGetStartedPage } from './app.po';

describe('angular-get-started App', () => {
  let page: AngularGetStartedPage;

  beforeEach(() => {
    page = new AngularGetStartedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
