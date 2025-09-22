import { render, screen, act } from '@testing-library/react';
import Notifications from '../Notifications';
import { http } from '../../services/http';

jest.mock('../../services/http', () => ({ http: { get: jest.fn() } }));

const mockGet = http.get as jest.Mock;

beforeEach(() => {
  mockGet.mockReset();
});

test('shows a loading state and fetches notifications', async () => {
  mockGet.mockReturnValue(new Promise(() => {}));

  await act(async () => {
    render(<Notifications />);
  });

  expect(screen.getByText(/loading notifications/i)).toBeInTheDocument();
  expect(mockGet).toHaveBeenCalledWith('/notifications');
});

test('renders notification details once loaded', async () => {
  mockGet.mockResolvedValueOnce({
    data: {
      now: '2025-09-19',
      location: 'HQ',
      cards: [
        { type: 'now', title: 'Current Time', message: 'Standup in 10 minutes' },
      ],
    },
  });

  await act(async () => {
    render(<Notifications />);
  });

  expect(await screen.findByRole('heading', { name: /today: 2025-09-19/i })).toBeInTheDocument();
  expect(await screen.findByText('Standup in 10 minutes')).toBeInTheDocument();
});
