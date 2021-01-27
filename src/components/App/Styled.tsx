import styled from 'styled-components';

export const StyledHeader = styled.header`
    background: ${(props) => props.theme.colors['brand-primary']};
    padding: ${(props) => `${props.theme.space[4]}px`};
`;

export const StyledMain = styled.main`
    padding: ${(props) => `${props.theme.space[4]}px`};
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 668px;
`;

export const StyledLogoContainer = styled.div`
    svg {
        fill: ${(props) => props.theme.colors.white};
        width: 100px;
    }
`;
