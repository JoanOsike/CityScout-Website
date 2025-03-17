import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Header from './Header';
import './style/SelectionPage.css';
import citiesData from './cities.json';

const activities = [
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Museum', label: 'Museum' },
  { value: 'Park', label: 'Park' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Games and Activities', label: 'Games and Activities' },
];

const times = [
  { value: 'Morning', label: 'Morning' },
  { value: 'Afternoon', label: 'Afternoon' },
  { value: 'Evening', label: 'Evening' },
];

const SelectionPage = ({ user }) => {
  const provinces = citiesData.map(p => ({ value: p.Province, label: p.Province }));
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [activity, setActivity] = useState(null);
  const [budget, setBudget] = useState('');
  const [time, setTime] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Selection Page";
  }, []);

  const handleShowResult = () => {
    if (!province || !city || !activity || !budget) {
      setError("Please fill all mandatory fields correctly.");
      return;
    }
    if (isNaN(budget) || budget < 0) {
      setError("Budget must be a positive number.");
      return;
    }

    //  minimum budget of $15 for "Restaurant" and "Games and Activities"
    const minBudgetActivities = ["Restaurant", "Games and Activities","Cafe"];
    if (minBudgetActivities.includes(activity.value) && budget < 15) {
      setError(`The minimum budget for ${activity.label} is $15.`);
      return;
    }

    setError('');
    alert(`Selections are valid! Province: ${province.label}, City: ${city}, Activity: ${activity.label}, Budget: $${budget}, ${time ? "Time: " + time.label : "No time selected"}`);
  };

  const selectedProvince = citiesData.find(p => p.Province === province?.value);
  
  // Exclude "Morning" if "Club" is selected
  const filteredTimes = activity?.value === 'Club' ? times.filter(t => t.value !== 'Morning') : times;

  return (
    <>
      <Header user={user} />
        <h1>Selection Page</h1>

      <div className="selection-container">
        {error && <div className="error-msg">{error}</div>}

        <div className="dropdown-container">
          <label>Province (Mandatory)</label>
          <Select
            options={provinces}
            value={province}
            onChange={(selected) => { setProvince(selected); setCity(null); }}
            placeholder="Select Province"
          />
        </div>

        {province && (
        <div className='dropdown-container'>
          <label>City (Mandatory)</label>
          <Select
            value={city ? { value: city, label: city } : null}
            onChange={(selectedOption) => setCity(selectedOption?.value)}
            options={selectedProvince.City.map((c) => ({ value: c, label: c }))}
            placeholder="Select City"
            isSearchable
          />
        </div>
      )}

        <div className="dropdown-container">
          <label>Activity (Mandatory)</label>
          <Select
            options={activities}
            value={activity}
            onChange={setActivity}
            placeholder="Select Activity"
          />
        </div>

        <div className="dropdown-container">
          <label>Budget (Mandatory)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
          />
        </div>

        <div className="dropdown-container">
          <label>Time of the Day (Optional)</label>
          <Select
            options={filteredTimes}
            value={time}
            onChange={setTime}
            placeholder="Select Time (Optional)"
            isClearable
          />
        </div>

        <button className="show-result-btn" onClick={handleShowResult}>Show Result</button>
      </div>
    </>
  );
};

export default SelectionPage;
