const getDateValidation = (currentDate: any) => {
  if (selectStation && selectStation.name) {
    for (let j = 0; j < selectStation?.bookings.length; j++) {
      if (
        moment(selectStation?.bookings[j].startDate).format(DATE_FORMAT) ==
        currentDate.format(DATE_FORMAT)
      ) {
        return true;
      }

      if (
        moment(selectStation?.bookings[j].endDate).format(DATE_FORMAT) ==
        currentDate.format(DATE_FORMAT)
      ) {
        return true;
      }
    }
  }
  return false;
};
