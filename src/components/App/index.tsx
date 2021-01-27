import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { loadManagers } from '../../store/managers/managers.actions';
import { getManagers } from '../../store/managers/managers.selectors';
import { FetchStatus } from '../../store/managers/types';
import { theme } from '../../styles/theme';
import { BrandLogo } from '../Icons/BrandLogo';
import { SearchDropdown } from '../SearchDropdown';
import { StyledOptionIcon } from '../SearchDropdown/Styled';
import { StyledHeader, StyledLogoContainer, StyledMain } from './Styled';

enum PageStatus {
    LOADED,
    ERROR,
    LOADING,
}

const App: React.FC = () => {
    const [pageStatus, setPageStatus] = React.useState<PageStatus>(PageStatus.LOADING);
    const dispatch = useDispatch();
    const managers = useSelector(getManagers);

    React.useEffect(() => {
        dispatch(loadManagers());
    }, [dispatch]);

    React.useEffect(() => {
        if (managers.list.length) {
            setPageStatus(PageStatus.LOADED);
        } else if (managers.status === FetchStatus.ERROR) {
            setPageStatus(PageStatus.ERROR);
        }
    }, [managers]);

    const memoedOptions = React.useMemo(
        () =>
            managers.list.map((manager) => ({
                id: manager.id,
                title: manager.name,
                description: manager.email,
                icon: <StyledOptionIcon>{manager.initials}</StyledOptionIcon>,
            })),
        [managers]
    );

    return (
        <ThemeProvider theme={theme}>
            <StyledHeader data-testid="header">
                <StyledLogoContainer>
                    <BrandLogo />
                </StyledLogoContainer>
            </StyledHeader>
            <StyledMain>
                {pageStatus === PageStatus.LOADING && 'Loading'}
                {pageStatus === PageStatus.ERROR && 'Something happened'}
                {pageStatus === PageStatus.LOADED && (
                    <SearchDropdown fieldId="manager-list" fieldLabel="Manager" placeholder="Choose Manager" options={memoedOptions} />
                )}
            </StyledMain>
        </ThemeProvider>
    );
};

export default App;
