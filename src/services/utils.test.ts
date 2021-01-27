import { getInitialsFromName } from './utils';

it('should return initials for a given full name', () => {
    const date = new Date();
    expect(getInitialsFromName('Mark Brown')).toEqual('MB');
});

it('should return only first and last initials for a given full name', () => {
    const date = new Date();
    expect(getInitialsFromName('John Foo Smith')).toEqual('JS');
});
