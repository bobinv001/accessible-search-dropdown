import React from 'react';
import { act, fireEvent, getByTestId, render, wait, waitFor } from '@testing-library/react';
import { SearchDropdown } from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const DUMMY_OPTIONS = [
    { id: 1, title: 'Iron Man', description: 'iron.man@avengers.com' },
    { id: 2, title: 'Spider Man', description: 'spider.man@avengers.com' },
    { id: 3, title: 'Super Man', description: 'super.man@avengers.com' },
];

const DEFAULT_PROPS = {
    fieldId: 'manager-list',
    fieldLabel: 'Manager',
    options: DUMMY_OPTIONS,
};

const renderComponent = (props: any = DEFAULT_PROPS) =>
    render(
        <ThemeProvider theme={theme}>
            <SearchDropdown {...props} />
        </ThemeProvider>
    );

describe('<SearchDropdown />', () => {
    describe('basic usage', () => {
        test('renders an input with correct attributes', () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            expect(inputNode).toHaveAttribute('aria-expanded', 'false');
            expect(inputNode).toHaveAttribute('aria-owns', 'manager-list__listbox');
            expect(inputNode).toHaveAttribute('aria-autocomplete', 'list');
            expect(inputNode).toHaveAttribute('id', 'manager-list');
        });

        test('renders an optional placeholder when passed through', () => {
            const component = renderComponent({ ...DEFAULT_PROPS, placeholder: 'Choose Manager' });
            const inputNode = component.getByRole('combobox');

            expect(inputNode).toHaveAttribute('placeholder', 'Choose Manager');
        });

        test('renders an optional placeholder when passed through', () => {
            const component = renderComponent();
            const labelNode = component.getByLabelText('Manager');

            expect(labelNode).toBeInTheDocument();
        });
    });

    describe('behaviours', () => {
        test('can enter value', () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.change(inputNode, { target: { value: 'Alice' } });
            expect(inputNode.value).toBe('Alice');
        });

        test('clicking opens menu', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.click(inputNode);

            await waitFor(() => {
                const list = component.getByRole('listbox');
                expect(inputNode).toHaveAttribute('aria-expanded', 'true');
                expect(list).toBeInTheDocument();

                expect(component.getAllByRole('option')).toHaveLength(DUMMY_OPTIONS.length);
            });
        });

        test('pressing escape closes menu', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.click(inputNode);

            const list = component.getByRole('listbox');
            expect(list).toBeInTheDocument();

            fireEvent.keyUp(inputNode, { key: 'Escape', keyCode: 27 });

            await waitFor(() => {
                expect(list).not.toBeInTheDocument();
            });
        });

        test('pressing down arrow opens menu', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.keyUp(inputNode, { key: 'ArrowDown', keyCode: 40 });

            const list = component.getByRole('listbox');
            expect(inputNode).toHaveAttribute('aria-expanded', 'true');
            expect(list).toBeInTheDocument();
            const options = component.getAllByRole('option');

            expect(component.getAllByRole('option')).toHaveLength(DUMMY_OPTIONS.length);
        });

        test('pressing down arrow again selects the first option', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.keyUp(inputNode, { key: 'ArrowDown', keyCode: 40 });

            await waitFor(() => {
                fireEvent.keyUp(inputNode, { key: 'ArrowDown', keyCode: 40 });
                const [firstOption] = component.getAllByRole('option');
                expect(firstOption).toHaveAttribute('aria-selected', 'true');
            });
        });

        test('pressing up arrow opens menu and selects the last item', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.keyUp(inputNode, { key: 'ArrowUp', keyCode: 38 });

            const options = component.getAllByRole('option');
            const lastOption = [...options].pop();
            expect(lastOption).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('typing', () => {
        test('searches for options', async () => {
            const props = {
                fieldId: 'manager-list',
                fieldLabel: 'Manager',
                options: [
                    {
                        id: 1,
                        title: 'Harriet Mckinney',
                        description: 'test',
                    },
                    {
                        id: 2,
                        title: 'Alice in blunderland',
                        description: 'test',
                    },
                ],
            };
            const component = renderComponent(props);
            const inputNode = component.getByRole('combobox');

            fireEvent.change(inputNode, { target: { value: 'tMc' } });
            fireEvent.keyUp(inputNode, { key: 'ArrowDown' });
            const options = component.getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent('Harriet Mckinney');
            const list = component.getByRole('listbox');

            fireEvent.keyUp(inputNode, { key: 'Enter', keyCode: 13 });

            expect(list).not.toBeInTheDocument();
            expect(inputNode.value).toBe('Harriet Mckinney');

            fireEvent.click(inputNode);
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent('Harriet Mckinney');
        });

        test('can filter by firstname', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.change(inputNode, { target: { value: 'spider' } });
            fireEvent.keyUp(inputNode, { key: 'ArrowDown' });
            const options = component.getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent('Spider Man');
        });

        test('can filter by lastname', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.change(inputNode, { target: { value: 'Man' } });
            fireEvent.keyUp(inputNode, { key: 'ArrowDown' });
            const options = component.getAllByRole('option');
            expect(options).toHaveLength(3);
        });

        test('search value filter results case insensitively', async () => {
            const component = renderComponent();
            const inputNode = component.getByRole('combobox');

            fireEvent.change(inputNode, { target: { value: 'man' } });
            fireEvent.keyUp(inputNode, { key: 'ArrowDown' });
            const options = component.getAllByRole('option');
            expect(options).toHaveLength(3);
        });
    });
});
