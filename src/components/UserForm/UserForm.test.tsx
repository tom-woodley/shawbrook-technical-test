import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import StoreProvider from '../../hooks/useStore';
import UserForm from './UserForm';

describe('App', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <UserForm />
        </StoreProvider>
      </MemoryRouter>
    );
  });

  it('Has first name input', async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <UserForm />
        </StoreProvider>
      </MemoryRouter>
    );
    const input = await screen.findByLabelText(/First Name/);
    expect(input).not.toBeNull();
  });

  it('Has last name input', async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <UserForm />
        </StoreProvider>
      </MemoryRouter>
    );
    const input = await screen.findByLabelText(/Last Name/);
    expect(input).not.toBeNull();
  });

  it('Has topic select', async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <UserForm />
        </StoreProvider>
      </MemoryRouter>
    );
    const select = await screen.findByLabelText(/Topic/);
    expect(select).not.toBeNull();
  });

  it('Shows Other text field when required', async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <UserForm />
        </StoreProvider>
      </MemoryRouter>
    );
    const select = await screen.findByLabelText(/Topic/);

    fireEvent.change(select, { target: { value: 'Other' } });

    const topicOtherInput = await screen.findByLabelText(/Other /);

    expect(topicOtherInput).not.toBeNull();
  });

  it('Allows inputs to be updated', async () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <UserForm />
        </StoreProvider>
      </MemoryRouter>
    );

    const firstNameInput = await screen.findByLabelText(/First Name/);
    fireEvent.change(firstNameInput, { target: { value: 'Tom' } });
    await screen.getByDisplayValue('Tom');

    const lastNameInput = await screen.findByLabelText(/Last Name/);
    fireEvent.change(lastNameInput, { target: { value: 'Woodley' } });
    await screen.getByDisplayValue('Woodley');

    const select = await screen.findByLabelText(/Topic/);

    fireEvent.change(select, { target: { value: 'Other' } });
    await screen.getByDisplayValue('Other');

    const topicOtherInput = await screen.findByLabelText(/Other /);
    expect(topicOtherInput).not.toBeNull();

    fireEvent.change(topicOtherInput, { target: { value: 'Swimming' } });
    await screen.getByDisplayValue('Swimming');
  });
});
