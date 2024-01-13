import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Time = (props) => {
  const dateString = props.date;
  const timeString = props.time;
  console.log(props.date)
  console.log(props.time)
  if (timeString.includes('PM')) {
    const evngtimeString = timeString;
    console.log(evngtimeString);
    console.log("haiiii")
  }
  // Convert date string to Date object

  // Create a Date object from the given date string
  const dateObject = new Date(dateString);

  // Extract the date in YYYY-MM-DD format
  const formattedDate = dateObject.toISOString().split('T')[0];

  // Concatenate the formatted date with the time
  const isoString = `${formattedDate}T${timeString}`;
  console.log(isoString)
  const resultString = isoString.replace(/\s*(AM|PM)\s*/, "");
  console.log(resultString)

  const passDatetime = ()=>{
    props.setDatetime(resultString)
  }
  

  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8002/api/booking/check-availability/', {
          date_time: resultString,
          mechanic_id: 17,
        });

        // Assuming the response has a status property
        if (response.status === 200) {
          setStatusColor('green');
        } else {
          setStatusColor('red');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setStatusColor('red');
      }
    };

    fetchData();
  }, [props.date]);

  if (!props.date) return null;

  return (
    <div >

      <div style={{color:`${statusColor}`}}  className={`border-1 p-2 cursor-pointer border-${statusColor}-500 hover:bg-gray-200 `}>
        {props.time}
      </div>
    </div>
  );
};

export default Time;
