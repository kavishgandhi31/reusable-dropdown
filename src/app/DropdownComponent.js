'use client'

import { useEffect, useRef, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import PropTypes from 'prop-types';

const DropdownComponent = ({ label, options, isMultiSelect, selectedOptions=[], onSelect = () => {} }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectableOptions, setSelectableOptions] = useState([]);
    const dropdownRef = useRef(null);  // Ref to detect click outside

    // function to toggle visibility of the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); 
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Format the options when the dropdown is opened
    useEffect(() => {
        if (isOpen && options) {
            const formattedOptions = options.map((option, index) => {
                if (typeof option === 'string') {
                    return { label: option, value: option, key: index }
                } else if (option.label && option.value) {
                    return { ...option, key: index };
                }
                return null;
            }).filter(option => option !== null); // filter out invalid options

            setSelectableOptions(formattedOptions);
        }
    }, [isOpen, options]);

    // function to handle when an option is selected or deselected
    const handleOptionClick = (option) => {
        if (isMultiSelect) {
            const isSelected = selectedOptions.some(selectedOption => selectedOption.value === option.value);
            
            const newSelectedOptions = isSelected 
            ? selectedOptions.filter(selectedOption => selectedOption.value !== option.value)
            : [...selectedOptions, option];

            onSelect(newSelectedOptions);                
        } else {
            onSelect([option]);
            setIsOpen(false);
        }
    };

    // function to handle selecting/deselecting all options
    const handleSelectAll = () => {
        if (selectedOptions.length === selectableOptions.length) {
            onSelect([]);
        } else {
            onSelect(selectableOptions);
        }
    };

    return (
        <div className="w-64 flex flex-col">
            <div className="text-black mb-1">
                {label}
            </div>
            <div ref={dropdownRef} className={`relative flex flex-row p-4 border-2 rounded-md text-black cursor-pointer ${isOpen ? 'border-blue-500' : 'border-black'}`}>
                <div className="flex-grow min-w-0">
                    { (selectedOptions && selectedOptions.length > 0) ? selectedOptions.map((option) => option.label).join(', ') : "Select an option"}
                </div>
                <div className="flex justify-center items-center cursor-pointer" onClick={toggleDropdown}>
                    <CgChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className="absolute flex flex-col top-full left-0 w-full mt-2 z-10 max-h-60 min-w-max overflow-y-auto rounded-md bg-white drop-shadow-lg">
                        <ul className="space-y-1">
                            {isMultiSelect && (
                                <li
                                    key="selectAll"
                                    className="p-2 cursor-pointer hover:bg-blue-200" 
                                    onClick={handleSelectAll}
                                >
                                    <input
                                        type="checkbox"
                                        id="selectAll"
                                        checked={selectedOptions.length === selectableOptions.length}
                                        readOnly
                                        className="cursor-pointer"
                                    />
                                    <label className="pl-2 cursor-pointer" htmlFor="selectAll" onClick={(e) => e.stopPropagation()}>Select/Deselect All</label>
                                </li>
                            )}
                            {selectableOptions && selectableOptions.map((option) => {
                                const isSelected = selectedOptions && selectedOptions.some(selectedOption => selectedOption.value === option.value);
                                return (
                                    <li 
                                        key={option.key} 
                                        className="p-2 cursor-pointer hover:bg-blue-200" 
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {isMultiSelect ? (
                                            <>
                                                <input 
                                                    type="checkbox" 
                                                    id={option.key} 
                                                    name={option.label} 
                                                    value={option.value} 
                                                    checked={isSelected} 
                                                    readOnly
                                                    className="cursor-pointer"
                                                />
                                                <label 
                                                    className="pl-2 cursor-pointer" 
                                                    htmlFor={option.key}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {option.label}
                                                </label>
                                            </>
                                        ) : (
                                            <>{option.label}</>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export { DropdownComponent };

DropdownComponent.displayName = 'DropdownComponent';

DropdownComponent.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
            })
        ])
    ).isRequired,
    isMultiSelect: PropTypes.bool,
    selectedOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    onSelect: PropTypes.func,
};


