import { createServer } from '../../test/server';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthButtons from './AuthButtons';

function renderComponent() {
  return render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
}

describe('when user is not signed in', () => {
  createServer([
    {
      path: '/api/user',
      res: () => {
        return { user: null };
      },
    },
  ]);

  test('sign in and sign up are visible', async () => {
    renderComponent();

    await screen.findAllByRole('links');
  });

  test('sign out not visible', async () => {
    renderComponent();

    await screen.findAllByRole('links');
  });
});

describe('when user is signed in', () => {
  createServer([
    {
      path: '/api/user',
      res: () => {
        return {
          user: {
            id: 4,
            email: 'test@test.com',
          },
        };
      },
    },
  ]);

  test('sign in and sign up are not visible', async () => {
    renderComponent();

    await screen.findAllByRole('links');
  });

  test('sign out visible', async () => {
    renderComponent();

    await screen.findAllByRole('links');
  });
});
