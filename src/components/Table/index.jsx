import React, { useEffect, useState } from 'react';
import { Box, Dropdown, H5, Markdown, ResponsiveTable } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { getGtmTagValue } from '../../utils/gtmEvents';

const getDropdownOptions = items => {
  if (!items || items.length === 0) return [];

  return items?.map(item => ({
    text: item?.fields?.title?.value,
    value: item?.fields?.title?.value,
  }));
};

const Table = ({ fields }) => {
  const [selected, updateSelected] = useState(null);
  const [rows, updateRows] = useState([]);

  useEffect(() => {
    if (!fields?.items) return;

    updateSelected(fields?.items[0].fields?.title?.value);
  }, [fields]);

  useEffect(() => {
    if (!selected || !fields.items) return;

    const item = fields?.items?.find(i => i.fields?.title?.value === selected);

    if (!item || !item.fields.items) {
      console.warn('Selected ToggleOption has no TableRows');
      updateRows([]);
      return;
    }

    updateRows(
      item.fields?.items.map(i => {
        const rowFields = wrapJSSFields(i.fields);

        return [
          rowFields?.textColumn1?.value && <Markdown>{rowFields.textColumn1?.value}</Markdown>,
          rowFields?.textColumn2?.value && <Markdown>{rowFields.textColumn2?.value}</Markdown>,
          rowFields?.textColumn3?.value && <Markdown>{rowFields.textColumn3?.value}</Markdown>,
        ]?.filter(value => !!value);
      }),
    );
  }, [selected]);

  if (!fields || !fields.items) return null;

  const {
    title,
    titleColumn1,
    titleColumn2,
    titleColumn3,
    contentAlignment,
    footnote,
    anchorId,
    gtmTitle,
    gtmCategory,
  } = wrapJSSFields(fields);

  const columns = [
    titleColumn1?.value && <Markdown>{titleColumn1?.value}</Markdown>,
    titleColumn2?.value && <Markdown>{titleColumn2?.value}</Markdown>,
    titleColumn3?.value && <Markdown>{titleColumn3?.value}</Markdown>,
  ]?.filter(value => !!value);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Caption = () => {
    const dropdownItems = getDropdownOptions(fields?.items);
    const TitleComponent = getTitleComponent(title?.value, H5);

    return (
      <>
        <TitleComponent>{compiler(stripMarkdownHeading(title?.value))}</TitleComponent>
        {dropdownItems.length > 1 && (
          <Dropdown
            maxWidth={['100%', '400px']}
            mx="auto"
            mt="default"
            placeholderText=""
            styling="secondary"
            inputProps={{ style: { textAlign: 'left' } }}
            ariaLabel={selected}
            value={selected}
            options={dropdownItems}
            onChange={value => updateSelected(value)}
          />
        )}
      </>
    );
  };

  return (
    <Box data-gtm-title={getGtmTagValue(gtmTitle?.value)} data-gtm-category={mapGTMCategory(gtmCategory)} width="100%">
      <ResponsiveTable
        anchorId={anchorId?.value}
        isFirstColBold={columns.length > 2}
        columns={columns}
        rows={rows}
        caption={<Caption />}
        justifyRight={contentAlignment?.value === 'Right'}
        footnote={footnote?.value && <Markdown size="small">{footnote?.value}</Markdown>}
      />
    </Box>
  );
};

export default Table;
