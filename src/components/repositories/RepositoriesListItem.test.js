import { render, screen } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';

// Creating a mock funtion that replaces the File Icon Component to avoid rendering that component and messing up the test
// jest.mock('../tree/Fileicon', () => {
//   return () => {
//     return 'File Icon Component';
//   };
// });

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'javascript',
    description: 'A js library',
    owner: { login: 'facebook' },
    name: 'react',
    html_url: 'https://www.github.com/facebook-react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />;
    </MemoryRouter>
  );

  return { repository };
}

test('displays a link to the github repo', async () => {
  const { repository } = renderComponent();

  await screen.findByRole('img', { name: /javascript/i });

  const link = screen.getByRole('link', { name: /github repo/i });
  expect(link).toHaveAttribute('href', repository.html_url);
});

// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };

test('displays a file icon with appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', { name: /javascript/i });

  expect(icon).toHaveClass('js-icon');
});

test('shows heading link to code editor page', async () => {
  const { repository } = renderComponent();

  await screen.findByRole('img', { name: /javascript/i });

  const link = await screen.getByRole('link', {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});
