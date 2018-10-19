import {LocalStorageService} from './localStorage.service';

describe(`${LocalStorageService.name} | local storage service:`, () => {
  // region TestSetup
  let service: LocalStorageService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');

    service = new LocalStorageService();
  });
  // endregion

  it('should save new date into local storage', () => {
    const KEY = 'date';
    const expectedDate = new Date(2015, 2, 2);

    jasmine.clock().install();
    jasmine.clock().mockDate(expectedDate);
    service.setItem(KEY);
    jasmine.clock().uninstall();

    expect(window.localStorage.setItem).toHaveBeenCalledWith(KEY, expectedDate.toISOString());
  });

  it('should get item by key from local storage', () => {
    const KEY = 'date';

    service.getItem(KEY);

    expect(window.localStorage.getItem).toHaveBeenCalledWith(KEY);
  });
});
