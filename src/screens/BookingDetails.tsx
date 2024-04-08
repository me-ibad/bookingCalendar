import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

interface Booking {
  customerName: string;
  endDate: string;
  id: string;
  pickupReturnStationId: string;
  startDate: string;
}

type BookingArray = Booking[];

function BookingDetails(): JSX.Element {
  const location = useLocation();
  let navigate = useNavigate();
  const [showBooking, setShowBooking] = useState<BookingArray | null>(null);

  const selectStation = location.state?.selectStation;
  const allBookings = location.state?.allBookings;

  //   console.log('booking=>', booking);

  //   console.log('station=>', allBookings);

  React.useEffect(() => {
    if (allBookings) {
      Promise.all(
        allBookings.map((booking: any) =>
          axios.get(
            `https://605c94c36d85de00170da8b4.mockapi.io/stations/${booking.pickupReturnStationId}/bookings/${booking.id}`
          )
        )
      )
        .then((responses) => {
          const bookingsData = responses.map((response) => response.data);
          setShowBooking(bookingsData);
          console.log(
            'response=>',
            responses.map((response) => response.data)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div data-testid='mockedData'>
      {showBooking ? (
        <div>
          <div className='text-lg font-semibold'>{selectStation?.name}</div>
          <div className='flex flex-wrap gap-4 my-6'>
            {showBooking.map((booking, index) => (
              <div
                key={index}
                className='p-4 rounded shadow-lg border hover:border-blue-500'
              >
                <h2 className='mb-2'>{booking.customerName}</h2>
                <p>
                  Start Date:{' '}
                  <span className='text-green-500'>
                    {moment(booking?.startDate).format('YYYY-MM-DD hh:mm:ss a')}
                  </span>
                </p>
                <p className='my-2'>
                  End Date:{' '}
                  <span className='text-red-500'>
                    {moment(booking?.endDate).format('YYYY-MM-DD hh:mm:ss a')}
                  </span>
                </p>
                {/* Display other booking details as needed */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        'There is No Booking Details available for this station.'
      )}
      <div>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}

export default BookingDetails;
