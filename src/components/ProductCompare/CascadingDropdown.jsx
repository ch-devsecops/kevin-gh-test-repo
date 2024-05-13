import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nodeData } from '@lukeaus/plain-tree';
import { Box, Dropdown, Label, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import themeStyles from './styles/CascadingDropdown.styles';
import useConfiguration from './config';

const TransparentDropdown = themeStyles.apply(Dropdown, 'TransparentDropdown');
const DropdownContainer = themeStyles.apply(Box, 'DropdownContainer');
const DropdownLabel = themeStyles.apply(Label, 'DropdownLabel');

// When there are four dropdowns, initial state is [null, null, null, null]
const getInitialState = dropdownArr => Array(dropdownArr.length).fill(null);

const CascadingDropdown = ({ optionsTree, dropdownSchema, filterOptions, onCompleteSelection, nameId, variant }) => {
  const { t } = useTranslation();
  const { showDropdownLabel } = useConfiguration(variant);
  const [selectedOptions, setSelectedOptions] = useState(getInitialState(dropdownSchema));
  if (!Array.isArray(dropdownSchema) || !dropdownSchema.length || !optionsTree) return null;

  const rootNode = optionsTree.root;

  const handleChange = (value, nodes, index) => {
    if (!value || !Array.isArray(nodes)) return;
    const targetNode = nodes.find(node => nodeData(node)?.value === value);
    /*
    update selected node at the position of index and reset all children selected nodes
   */
    setSelectedOptions(prev => [...prev.slice(0, index), targetNode, ...prev.slice(index + 1).fill(null)]);
    if (index === dropdownSchema.length - 1) {
      // when the last level of dropdown is selected, trigger onCompleteSelection callback
      if (onCompleteSelection && typeof onCompleteSelection === 'function') {
        onCompleteSelection(nodeData(targetNode));
        // reset all dropdown
        setSelectedOptions(prev => getInitialState(prev));
      }
    }
  };

  return (
    <DropdownContainer showDropdownLabel={showDropdownLabel}>
      {dropdownSchema.map((dropdown, index) => {
        // index = 0, parent node is the root of tree
        const parentNode = index ? selectedOptions[index - 1] : rootNode;
        let options = [];
        let currentNodes = [];
        if (parentNode) {
          // When parent dropdown has selected node, get current options from children nodes
          currentNodes = parentNode.children || [];
          // pass nodes at current level to filtering callback function

          options = filterOptions(currentNodes, index + 1) || [];
        }
        return (
          <Box width="100%" data-testid={`product-${dropdown.name}-wrapper`} key={dropdown.name}>
            <Optional when={showDropdownLabel}>
              <DropdownLabel isDisabled={!parentNode} data-testid={`product-${dropdown.name}-label`}>
                {t(dropdown.label)}
              </DropdownLabel>
            </Optional>
            <TransparentDropdown
              showDropdownLabel={showDropdownLabel}
              options={options}
              onChange={value => handleChange(value, currentNodes, index)}
              ariaLabel={t(dropdown.ariaLabel)}
              name={`${dropdown.name}-${nameId}`}
              mb="l"
              disabled={!parentNode}
              placeholderText={!showDropdownLabel ? t(dropdown.label) : undefined}
              value={selectedOptions[index]?.data?.value}
            />
          </Box>
        );
      })}
    </DropdownContainer>
  );
};

CascadingDropdown.defaultProps = {
  dropdownSchema: [],
  filterOptions: f => f,
};

CascadingDropdown.propTypes = {
  optionsTree: PropTypes.shape({}).isRequired,
  dropdownSchema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      ariaLabel: PropTypes.string,
    }),
  ),
  // filtering cb for dropdown options
  filterOptions: PropTypes.func,
  onCompleteSelection: PropTypes.func.isRequired,
  nameId: PropTypes.number,
};

export default CascadingDropdown;
