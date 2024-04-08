import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardDisplay from './CardDisplay';
import StoreProvider from '../../hooks/useStore';
import { StoreContext } from '../../hooks/useStore/StoreContext';

describe('CardDisplay', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <CardDisplay />
        </StoreProvider>
      </MemoryRouter>
    );
  });

  it('Displays the card data', async () => {
    render(
      <MemoryRouter>
        <StoreContext.Provider
          value={{
            user: {
              firstName: 'Tom',
              lastName: 'Woodley',
              topic: 'Wildlife',
            },
            image: {
              url: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgyMjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTI1ODk1MTB8&ixlib=rb-4.0.3&q=80&w=1080',
              alt: 'brown lion on green grass field',
            },
            setUser: () => {},
            setUserValue: () => {},
            setImage: () => {},
          }}
        >
          <CardDisplay />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    const firstName = await screen.findByText(/Tom/);
    expect(firstName).not.toBeNull();

    const lastName = await screen.findByText(/Woodley/);
    expect(lastName).not.toBeNull();

    const image = screen.findAllByAltText('brown lion on green grass field');
    expect(image).not.toBeNull();
  });
});
