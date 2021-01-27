import React from 'react';
import debounce from 'lodash.debounce';
import { supportsScrollIntoViewIfNeeded } from '../../services/utils';
import {
    StyledDropdownFieldWrapper,
    StyledLabel,
    StyledInputWrapper,
    StyledInput,
    StyledChevron,
    StyledOptionsList,
    StyledOption,
    StyledOptionValue,
    StyledOptionValueSub,
    StyledVisuallyHidden,
} from './Styled';

interface IProps {
    fieldId: string;
    fieldLabel: string;
    placeholder?: string;
    options: IOption[];
}

interface IOption {
    id: number | string;
    icon?: JSX.Element;
    title: string;
    description: string;
}

enum KeyCode {
    ARROW_UP = 38,
    ARROW_DOWN = 40,
    SHIFT = 16,
    TAB = 9,
    ENTER = 13,
    ESCAPE = 27,
}

export const SearchDropdown: React.FC<IProps> = ({ fieldId, fieldLabel, placeholder = '', options = [] }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const optionsRef = React.useRef<HTMLLIElement[]>([]);
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
    const [highlighted, setHighlighted] = React.useState<number>(0);
    const [filteredOptions, setFilteredOptions] = React.useState<IOption[]>(options);

    React.useEffect(() => {
        if (menuOpen) {
            const handleClickout = ({ target }: MouseEvent) => {
                if (!menuRef.current?.contains(target as HTMLElement)) {
                    setMenuOpen(false);
                }
            };
            document.addEventListener('mouseup', handleClickout);
            return () => document.removeEventListener('mouseup', handleClickout);
        }
    }, [menuOpen]);

    React.useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    React.useEffect(() => {
        // keeps an updated cache of refs options
        optionsRef.current = optionsRef.current.slice(0, filteredOptions.length);
    }, [filteredOptions]);

    React.useEffect(() => {
        scrollOptionIntoView(optionsRef.current[highlighted]);
    }, [highlighted]);

    const hasValue = (inputValue: string) => !!inputValue.trim().length;

    const scrollOptionIntoView = ($option: HTMLElement) => {
        if ($option) {
            // check browser compatability before usage
            if (supportsScrollIntoViewIfNeeded($option)) {
                $option.scrollIntoViewIfNeeded(false);
            } else {
                $option.scrollIntoView?.(true);
            }
        }
    };

    const filterOptionsBasedOnValue = (value: string) => {
        const parsedValue = value.trim().toLowerCase();
        const matchedOptions = options.filter((option) => {
            const lowerCasedOption = option.title.toLowerCase();
            return lowerCasedOption.includes(parsedValue) || lowerCasedOption.replace(' ', '').includes(parsedValue);
        });
        setFilteredOptions(matchedOptions);
    };

    const handleInputChange = () => {
        const value = inputRef.current?.value ?? '';

        if (hasValue(value)) {
            filterOptionsBasedOnValue(value);
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
            setFilteredOptions(options);
        }
    };

    const handleUpArrow = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (menuOpen) {
            setHighlighted((prevHighlighted) => Math.max(0, prevHighlighted - 1));
        } else {
            setMenuOpen(true);
            setHighlighted(filteredOptions.length - 1);
        }
    };

    const handleDownArrow = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (menuOpen) {
            setHighlighted((prevHighlighted) => Math.min(filteredOptions.length - 1, prevHighlighted + 1));
        } else {
            handleOpen();
        }
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (filteredOptions[highlighted]) {
            const selectedOption = filteredOptions[highlighted];
            handleOptionSelect(selectedOption);
        }
    };

    const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        inputRef.current!.value = '';
        setFilteredOptions(options);
        setMenuOpen(false);
    };

    const handleTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (menuOpen) {
            setMenuOpen(false);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;

        switch (keyCode) {
            case KeyCode.SHIFT:
            case KeyCode.TAB:
                handleTab(e);
                break;
            case KeyCode.ARROW_UP:
                handleUpArrow(e);
                break;
            case KeyCode.ARROW_DOWN:
                handleDownArrow(e);
                break;
            case KeyCode.ENTER:
                handleEnter(e);
                break;
            case KeyCode.ESCAPE:
                handleEscape(e);
                break;
            default:
                handleInputChange();
        }
    };

    const handleOptionSelect = (selectedOption: IOption) => {
        inputRef.current!.value = selectedOption.title;
        filterOptionsBasedOnValue(selectedOption.title);
        setMenuOpen(false);
    };

    const handleOptionClick = (option: IOption) => () => {
        handleOptionSelect(option);
    };

    const handleOpen = () => {
        setMenuOpen(true);
        setHighlighted(0);
    };

    const handleBlur = React.useCallback(
        debounce(() => {
            setMenuOpen(false);
        }, 200),
        [setMenuOpen]
    );

    return (
        <StyledDropdownFieldWrapper expanded={menuOpen}>
            <StyledLabel htmlFor={fieldId}>{fieldLabel}</StyledLabel>
            <StyledInputWrapper>
                <StyledInput
                    aria-expanded={menuOpen}
                    aria-owns={`${fieldId}__listbox`}
                    aria-autocomplete="list"
                    role="combobox"
                    autoComplete="off"
                    id={fieldId}
                    type="text"
                    placeholder={placeholder}
                    onClick={handleOpen}
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur}
                    ref={inputRef}
                />
                <StyledChevron focusable={false} />
            </StyledInputWrapper>
            {menuOpen && (
                <StyledOptionsList id={`${fieldId}__listbox`} role="listbox" ref={menuRef}>
                    {filteredOptions.length ? (
                        filteredOptions.map((option, index) => (
                            <StyledOption
                                key={option.id}
                                id={`${fieldId}__option--${index}`}
                                aria-posinset={index + 1}
                                aria-selected={highlighted === index ? 'true' : 'false'}
                                tabIndex={-1}
                                role="option"
                                onClick={handleOptionClick(option)}
                                // @ts-ignore
                                ref={(el) => (optionsRef.current[index] = el)}
                            >
                                {option.icon}
                                <StyledOptionValue>
                                    {option.title}
                                    <StyledOptionValueSub> {option.description}</StyledOptionValueSub>
                                </StyledOptionValue>
                            </StyledOption>
                        ))
                    ) : (
                        <StyledOption>No results</StyledOption>
                    )}
                </StyledOptionsList>
            )}
            <StyledVisuallyHidden aria-live="polite" role="status">
                {filteredOptions.length} results available.
            </StyledVisuallyHidden>
        </StyledDropdownFieldWrapper>
    );
};
