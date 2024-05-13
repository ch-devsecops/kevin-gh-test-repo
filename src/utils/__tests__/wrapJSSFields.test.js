import { wrapJSSFields } from '../wrapJSSFields';

const fields = {
  items: [
    {
      fields: [
        {
          key: 'value',
        },
      ],
    },
  ],
};

describe('wrapJSSFields', () => {
  it('returns an array of items with JSSFields', () => {
    const wrappedFields = wrapJSSFields(fields);

    expect(wrappedFields.items[0].fields[0].constructor.name).toEqual('JSSField');
  });

  it('does not mutate fields provided', () => {
    wrapJSSFields(fields);

    expect(fields.items[0].fields[0].constructor.name).toEqual('Object');
  });
});
