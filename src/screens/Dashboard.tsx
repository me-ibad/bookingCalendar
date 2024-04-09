import React, { useState } from 'react';
// import './App.css';
import moment, { Moment } from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the Station and Booking interfaces
interface Station {
  name: String;
  id: String;
  bookings: Booking[];
}
interface Booking {
  customerName: string;
  endDate: string;
  id: string;
  pickupReturnStationId: string;
  startDate: string;
}

function Dashboard(): JSX.Element {
  const DATE_FORMAT = 'YYYY-MM-DD';
  const initialStartDate: Moment = moment();
  let navigate = useNavigate();

  const [startDate, setStartDate] = useState<Moment>(initialStartDate);
  const [station, setStation] = useState<any[]>([]);
  const [allStation, setAllStation] = useState<any[]>([]);

  const [selectStation, setSelectStation] = useState<Station | null>(null);

  // Api call to get the station data

  React.useEffect(() => {
    axios
      .get('https://605c94c36d85de00170da8b4.mockapi.io/stations')
      .then((response) => {
        setStation(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to get the previous and next week data

  const preWeek = () => {
    const newStartDate: Moment = moment(startDate).subtract(7, 'days');
    setStartDate(newStartDate);
  };

  const nextWeek = () => {
    const newStartDate: Moment = moment(startDate).add(7, 'days');
    setStartDate(newStartDate);
  };

  // Function to get the station data when clicked on a day

  const getStationData = (currentDate: any) => {
    let allBookings: object[] = [];
    if (selectStation && selectStation.name) {
      // Check if the booking is on the selected date
      for (let j = 0; j < selectStation?.bookings.length; j++) {
        if (
          moment(selectStation?.bookings[j].startDate).format(DATE_FORMAT) ==
          currentDate.format(DATE_FORMAT)
        ) {
          const booking = selectStation?.bookings[j];
          allBookings.push(booking);

          navigate('/details', {
            state: { selectStation, allBookings },
          });
        }

        if (
          moment(selectStation?.bookings[j].endDate).format(DATE_FORMAT) ==
          currentDate.format(DATE_FORMAT)
        ) {
          const booking = selectStation?.bookings[j];
          allBookings.push(booking);

          navigate('/details', {
            state: { selectStation, allBookings },
          });
        }
      }
    }
  };
  // Function to handle the select station
  const onHandleSelect = (e: any) => {
    const selectedStation = JSON.parse(e.target.value);
    setSelectStation(selectedStation);
    setAllStation([...allStation, selectedStation]);
    if (selectedStation && selectedStation.name) {
      setStartDate(moment(selectedStation.bookings[0].startDate));
    }
  };

  // Function to render the days of the week

  const renderDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate: Moment = moment(startDate).add(i, 'days');

      let customerNames: string[] = [];
      let isStartDate = false;
      let isEndDate = false;
      let startTimes: string[] = [];

      if (selectStation && selectStation.bookings) {
        // Check if the booking is on the selected date
        selectStation.bookings.forEach((booking) => {
          if (
            moment(booking.startDate).format(DATE_FORMAT) ==
            currentDate.format(DATE_FORMAT)
          ) {
            isStartDate = true;
            startTimes.push(moment(booking.startDate).format('hh:mm a'));
            customerNames.push(booking.customerName);
          }
          if (
            moment(booking.endDate).format(DATE_FORMAT) ==
            currentDate.format(DATE_FORMAT)
          ) {
            isEndDate = true;
            customerNames.push(booking.customerName);
            startTimes.push(moment(booking.endDate).format('hh:mm a'));
          }
        });
      }
      // Push the days to the array
      days.push(
        <button
          onClick={() => getStationData(currentDate)}
          className={`day ${isStartDate ? 'bg-green-500' : ''}  ${
            isEndDate ? 'bg-red-500' : ''
          }`}
          key={i}
        >
          {currentDate.format('ddd')}
          <br />
          {currentDate.format('D')}
          <br />
          {customerNames.map((name, index) => (
            <div key={index}>
              <div className='text-xs mt-1'>{name}</div>
              <div className='text-xs mt-1'>{startTimes[index]}</div>
            </div>
          ))}
        </button>
      );
    }
    return days;
  };

  return (
    <div className='App' data-testid='dashboard'>
      <div className='my-4'>
        <label className='mb-2'>Choose a Station:</label>
        <br />
        <select
          name='station'
          className='p-2 px-4 mt-2 rounded '
          onChange={onHandleSelect}
          id='station'
          value={selectStation ? JSON.stringify(selectStation) : ''}
        >
          <option disabled value='' hidden>
            Select Option
          </option>

          {Array.isArray(station) &&
            station?.map(
              (item, index) =>
                index !== station.length - 1 && (
                  <option value={JSON.stringify(item)} key={index}>
                    {item.name}
                  </option>
                )
            )}
        </select>
      </div>

      <div className='header '>
        <button onClick={preWeek}>Previous Week</button>
        <h2>
          {startDate.format('MMMM')} {startDate.format('YYYY')}
        </h2>
        <button onClick={nextWeek}>Next Week</button>
      </div>
      <div className='week'>{renderDays()}</div>
    </div>
  );
}

export default Dashboard;
