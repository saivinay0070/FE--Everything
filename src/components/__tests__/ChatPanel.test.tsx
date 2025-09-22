import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatPanel from '../ChatPanel';
import { http } from '../../services/http';

jest.mock('remark-gfm', () => jest.fn());
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('../../services/http', () => ({ http: { post: jest.fn() } }));

const mockPost = http.post as jest.Mock;

beforeEach(() => {
  mockPost.mockReset();
});

test('renders the input and send button', () => {
  render(<ChatPanel />);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
});

test('sends the typed message and shows the reply', async () => {
  mockPost.mockResolvedValueOnce({ data: { answer: 'Sure thing!' } });

  render(<ChatPanel />);

  await userEvent.type(screen.getByRole('textbox'), 'Hello there');
  await userEvent.click(screen.getByRole('button', { name: /send/i }));

  expect(mockPost).toHaveBeenCalledWith('/ask', { question: 'Hello there' });
  expect(screen.getByText('You:')).toBeInTheDocument();
  expect(screen.getByText('Hello there')).toBeInTheDocument();

  expect(await screen.findByText('Sure thing!')).toBeInTheDocument();
});

test('does not send empty messages', async () => {
  render(<ChatPanel />);

  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  expect(mockPost).not.toHaveBeenCalled();
});