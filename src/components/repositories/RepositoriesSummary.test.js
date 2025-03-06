import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';
import { hasUncaughtExceptionCaptureCallback } from 'process';

test('displays the primary language of the repo', () => {
  const repository = {
    language: 'javascript',
    stargazers_count: 5,
    forks: 3333,
    open_issues: 4444,
  };

  render(<RepositoriesSummary repository={repository} />);

  const lang = screen.getByText('javascript');

  expect(lang).toBeInTheDocument();
});
