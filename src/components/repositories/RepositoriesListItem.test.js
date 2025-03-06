import { render } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'javascript',
    description: 'A js library',
    owner: 'facebook',
    html_url: 'https://www.github.com/facebook-react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />;
    </MemoryRouter>
  );
}

test('displays a link to the github repo', () => {
  renderComponent();
});
