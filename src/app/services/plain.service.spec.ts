import {PlainService} from './plain.service';

describe(`${PlainService.name} | Service without dependencies:`, () => {
  // region TestSetup
  let service: PlainService;

  beforeEach(() => {
    service = new PlainService();
  });
  // endregion

  it('service should be created', () => {
    expect(service).toBeDefined();
  });
});
