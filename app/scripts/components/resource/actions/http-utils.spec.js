import HttpUtils, { getNextPageUrl } from './http-utils';

describe('getNextPageUrl', () => {
  const fakeResponse = links => ({
    headers: () => links
  });
  it('parses links header and returns next URL', () => {
    const links = '<https://example.com/api/customers/>; rel="first", ' +
                  '<https://example.com/api/customers/?page=2>; rel="next", ' +
                  '<https://example.com/api/customers/?page=13>; rel="last"';
    expect(getNextPageUrl(fakeResponse(links))).toBe('https://example.com/api/customers/?page=2');
  });

  it('returns null if header does not contain links', () => {
    expect(getNextPageUrl(fakeResponse(null))).toBe(null);
  });

  it('returns null if headers link do not contain next url', () => {
    const links = '<https://example.com/api/customers/>; rel="first"';
    expect(getNextPageUrl(fakeResponse(links))).toBe(null);
  });
});

describe('HttpUtils', () => {
  let $httpBackend, httpUtils;

  beforeEach(inject((_$http_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    httpUtils = new HttpUtils(_$http_);
  }));

  it('fetches and merges all pages in correct order using header links', () => {
    let result;
    httpUtils.getAll('https://example.com/api/customers/').then(data => result = data);

    $httpBackend
      .when('GET', 'https://example.com/api/customers/')
      .respond(200, [
        {name: 'Customer 1'},
        {name: 'Customer 2'},
      ], {
        link: '<https://example.com/api/customers/?page=2>; rel="next"'
      });

    $httpBackend
      .when('GET', 'https://example.com/api/customers/?page=2')
      .respond(200, [
        {name: 'Customer 3'},
        {name: 'Customer 4'},
      ]);

    $httpBackend.flush();

    expect(result).toEqual([
      {name: 'Customer 1'},
      {name: 'Customer 2'},
      {name: 'Customer 3'},
      {name: 'Customer 4'},
    ]);
  });
});
