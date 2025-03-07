import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import HomeRoute from './HomeRoute';
import { MemoryRouter } from 'react-router';

const handlers = [
  rest.get('/api/repositories', (req, res, ctx) => {
    const language = req.url.searchParams.get('q').split('language:')[1];
    console.log(language);

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test('renders 2 links for each table(language)', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  screen.findByRole();

  screen.debug();
});
