import React from 'react';
import PropTypes from 'prop-types';
import { Table, Box, Markdown, H5 } from '@honda-canada/design-system-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading } from '../../utils/markdown';
import safelyParseJSON from '../../utils/safelyParseJSON';

import Cell from './Cell';
import CellWithIcon from './CellWithIcon';

const TableJSS = ({ fields, rendering }) => {
  if (!fields) return null;

  const { titleAlignment, tableValue, anchorId, gtmTitle, gtmCategory } = wrapJSSFields(fields);
  const data = safelyParseJSON(tableValue?.value);

  if (Object.keys(data).length === 0) return null;

  const columns = data?.columns.map((column, i) => (
    <Markdown key={i.toString()}>{stripMarkdownHeading(column)}</Markdown>
  ));

  const rows =
    columns &&
    data?.rows.map((cells = []) =>
      cells.map((cell, index) =>
        typeof cell === 'string' ? (
          <Cell key={cell + index.toString()} label={cell} />
        ) : (
          <CellWithIcon
            key={cell.url ? cell.url + index.toString() : index.toString()}
            label={cell?.label}
            url={cell?.url}
            iconName={cell?.iconName}
            gtmComponentType={rendering?.componentName}
          />
        ),
      ),
    );

  return (
    <Box data-gtm-title={gtmTitle?.value} data-gtm-category={mapGTMCategory(gtmCategory)} width="100%">
      <Table
        anchorId={anchorId?.value}
        isFirstColBold={columns.length > 2}
        caption={
          data.title && (
            <H5 textAlign={titleAlignment?.value === 'Left' ? 'left' : 'center'}>{stripMarkdownHeading(data.title)}</H5>
          )
        }
        columns={columns}
        rows={rows}
        justifyRight
      />
    </Box>
  );
};

TableJSS.propTypes = {
  fields: PropTypes.shape({
    anchorId: PropTypes.shape({
      value: PropTypes.string,
    }),
    gtmTitle: PropTypes.shape({
      value: PropTypes.string,
    }),
    tableValue: PropTypes.shape({
      value: PropTypes.string,
    }),
    titleAlignment: PropTypes.shape({
      value: PropTypes.string,
    }),
    gtmCategory: PropTypes.string,
  }),
};
export default TableJSS;
