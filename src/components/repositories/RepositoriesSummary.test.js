import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';
import { hasUncaughtExceptionCaptureCallback } from 'process';

test('displays the info about the repo', () => {
  const repository = {
    language: 'javascript',
    stargazers_count: 5,
    forks: 3333,
    open_issues: 4444,
  };

  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});
