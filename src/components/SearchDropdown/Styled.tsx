import styled, { css } from 'styled-components';
import { ChevronIcon } from '../Icons/ChevronIcon';

const OPTION_HEIGHT = 77;
const MAX_OPTIONS = 2;
const FIELD_WIDTH = 300;

export const StyledDropdownFieldWrapper = styled.div<{ expanded: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;

    ${(props) =>
        props.expanded &&
        css`
            ${StyledChevron} {
                transform: rotate(0deg) translate(-50%, -50%);
            }
        `}
`;

export const StyledLabel = styled.label`
    padding-bottom: ${(props) => `${props.theme.space[2]}px`};
    color: ${(props) => props.theme.colors['dark-gray']};
    font-size: ${(props) => `${props.theme.fontSizes[1]}px`};
`;

export const StyledInputWrapper = styled.div`
    position: relative;
    width: ${FIELD_WIDTH}px;
`;

export const StyledChevron = styled(ChevronIcon)`
    position: absolute;
    width: 20px;
    height: 10px;
    right: 0;
    top: 50%;
    transform: rotate(180deg) translate(11px, 4px);
    fill: ${(props) => props.theme.colors['moon-gray']};
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: ${(props) => `${props.theme.space[2]}px ${props.theme.space[2]}px`};
    box-sizing: border-box;
    border: ${(props) => props.theme.borders[1]} ${(props) => props.theme.colors['moon-gray']};
    border-radius: ${(props) => `${props.theme.radii[2]}px`};
    font-size: ${(props) => `${props.theme.fontSizes[1]}px`};
    font-family: ${(props) => props.theme.fonts.primary};

    &:focus {
        color: ${(props) => props.theme.colors['dark-gray']};
        outline: 0;
        box-shadow: 0 0 1px 2px ${(props) => props.theme.colors['brand-secondary']};

        + ${StyledChevron} {
            fill: ${(props) => props.theme.colors['silver']};
        }
    }
`;

export const StyledOption = styled.li`
    line-height: 22px;
    list-style: none;
    outline: 0;
    margin: 0;
    margin: ${(props) => `0 ${props.theme.space[3]}px`};
    padding: ${(props) => `${props.theme.space[3]}px ${props.theme.space[2]}px`};
    border-bottom: 1px solid ${(props) => props.theme.colors['moon-gray']};
    display: flex;

    &[aria-selected='true'] * {
        color: ${(props) => props.theme.colors['brand-primary']};
    }
`;

export const StyledOptionsList = styled.ul`
    width: ${FIELD_WIDTH}px;
    max-height: ${OPTION_HEIGHT * MAX_OPTIONS}px;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors['dark-gray']};
    background: ${(props) => props.theme.colors.white};
    margin-top: ${(props) => `${props.theme.space[1]}px`};
    overflow-y: auto;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    border: ${(props) => props.theme.borders[1]} ${(props) => props.theme.colors['moon-gray']};
    border-radius: ${(props) => `${props.theme.radii[2]}px`};

    ${StyledOption}:last-child {
        border: ${(props) => props.theme.borders[0]};
    }
`;

export const StyledOptionIcon = styled.span`
    background: ${(props) => props.theme.colors.mint};
    color: ${(props) => props.theme.colors.white};
    border-radius: ${(props) => `${props.theme.radii[2]}px`};
    align-self: center;
    height: 40px;
    width: 40px;
    line-height: 40px;
    box-sizing: border-box;
    text-align: center;
`;

export const StyledOptionValue = styled.span`
    display: flex;
    flex-direction: column;
    margin-left: ${(props) => `${props.theme.space[2]}px`};
`;

export const StyledOptionValueSub = styled.span`
    color: ${(props) => props.theme.colors['silver']};
    font-size: ${(props) => `${props.theme.fontSizes[1]}px`};
`;

export const StyledVisuallyHidden = styled.div`
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    margin-bottom: -1px;
    margin-right: -1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;
