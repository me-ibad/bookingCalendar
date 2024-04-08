// eslint-disable-next-line no-use-before-define
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../screens/Dashboard';

describe('Dashboard', () => {
  test('renders Dashboard component without crashing', async () => {
    const mockData = {
      data: {
        id: '1',
        name: 'Station 1',
        bookings: [],
      },
    };
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockData);

    await act(async () => {
      React.useEffect = jest.fn((f) => f());
      render(
        <Router>
          <Dashboard />
        </Router>
      );
    });
  });
});
