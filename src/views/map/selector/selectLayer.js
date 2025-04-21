import React, { useState, useRef, useEffect } from 'react';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import './selectLayer.css';

const CheckboxDropdown = ({ options = [], selectedValues = [], onChange }) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };
  
  // Find display names for selected layers to show in the dropdown title
  const getSelectedDisplayNames = () => {
    return selectedValues.map(value => {
      const option = options.find(opt => opt.name === value);
      return option?.displayName || option?.title || value;
    });
  };

  const selectedDisplayNames = getSelectedDisplayNames();
  const displayText = selectedValues.length > 0
    ? `${selectedValues.length} layer${selectedValues.length > 1 ? 's' : ''} selected`
    : "Select layers";

  return (
    <div className="layer-dropdown-wrapper" ref={dropdownRef}>
      <CDropdown className="layer-dropdown" visible={visible} onToggle={() => setVisible(!visible)}>
        <CDropdownToggle className="layer-dropdown-toggle bg-body text-body border-body">
          <span className="layer-dropdown-text">{displayText}</span>
        </CDropdownToggle>

        <CDropdownMenu className="layer-dropdown-menu bg-body border-body">
          {options.length === 0 ? (
            <div className="layer-dropdown-empty text-muted">No layers available</div>
          ) : (
            options.map((option) => (
              <CDropdownItem key={option.id || option.name} className="layer-dropdown-item">
                <label className="layer-checkbox-label">
                  <input
                    type="checkbox"
                    className="layer-checkbox"
                    checked={selectedValues.includes(option.name)}
                    onChange={() => handleCheckboxChange(option.name)}
                  />
                  <span className="layer-option-name ms-2">
                    {option.displayName || option.title || option.name}
                  </span>
                </label>
              </CDropdownItem>
            ))
          )}
        </CDropdownMenu>
      </CDropdown>
    </div>
  );
};

export default CheckboxDropdown;