//import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BookingDetails from '../screens/BookingDetails';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookingDetail', () => {
  test('renders BookingDetail component and makes API call', async () => {
    const mockData = {
      state: {
        selectStation: {
          name: 'Station Name',
        },
        allBookings: [
          {
            customerName: 'John Doe',
            endDate: '2024-04-07T12:00:00Z',
            id: '1',
            pickupReturnStationId: '1',
            startDate: '2024-04-06T12:00:00Z',
          },
        ],
      },
    };

    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/bookings/')) {
        const id = url.split('/').pop();
        const booking = mockData.state.allBookings.find((b) => b.id === id);
        return Promise.resolve({ data: booking });
      }
      return Promise.reject(new Error('Not found'));
    });

    render(
      <Router>
        <BookingDetails />
      </Router>
    );
  });
});
