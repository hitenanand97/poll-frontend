// src/App.js
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';

const App = () => {
  const [name, setName] = useState('');
  const [choice, setChoice] = useState('');
  const [date, setDate] = useState('');
  const [pollData, setPollData] = useState([]);

  /*useEffect(() => {
    const fetchPollData = async () => {
      const response = await fetch('http://localhost:3001/get-poll-data');
      const data = await response.json();
      setPollData(data);
    };

    fetchPollData();
  }, []);*/

  /*const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/submit-poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, choice, date }),
    });*/

    /*if (response.ok) {
      console.log('Poll submitted successfully');
      setName('');
      setChoice('');
      setDate('');
      // Refresh poll data after submission
      const updatedData = await (await fetch('http://localhost:3001/get-poll-data')).json();
      setPollData(updatedData);
    } else {
      console.error('Error submitting poll');
    }
  };*/

  const dates = pollData.map((entry) => entry.date);
  const yesVotes = pollData.filter((entry) => entry.choice === 'yes').length;
  const noVotes = pollData.filter((entry) => entry.choice === 'no').length;

  const lineChartData = {
    //labels: dates,
    datasets: [
      {
        label: 'Yes',
        data: pollData.filter((entry) => entry.choice === 'yes').map(() => 1),
        borderColor: 'green',
      },
      {
        label: 'No',
        data: pollData.filter((entry) => entry.choice === 'no').map(() => 1),
        borderColor: 'red',
      },
    ],
  };

  const barChartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Overall Votes',
        //data: [yesVotes, noVotes],
        backgroundColor: ['green', 'red'],
      },
    ],
  };

  return (
    <div>
      <Typography variant="h4">Poll Station</Typography>
      <form>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Choice"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button variant="contained" color="primary"  >
          Submit Poll
  </Button>
  {/*onClick={handleSubmit}*/}
      </form>

      {/*<Typography variant="h4">Trend Analysis</Typography>
      <Line data={lineChartData} />
      <Bar data={barChartData} />*/}
    </div>
  );
};

export default App;
