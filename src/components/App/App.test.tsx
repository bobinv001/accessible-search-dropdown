import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { initialState, rootReducer } from '../../store/root.reducer';
import App from '.';

jest.mock('../../services/managers');

const renderWithProviders = (ui) => {
    const store = createStore(rootReducer, initialState);
    return render(<Provider store={store}>{ui}</Provider>);
};

describe('<App />', () => {
    test('renders header', () => {
        const container = renderWithProviders(<App />);
        expect(container.getByTestId('header')).toBeInTheDocument();
    });
});
