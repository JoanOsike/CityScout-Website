//SelectionPage: links to the LLM.py to send inputs 
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './style/SelectionPage.css';
import citiesData from './cities.json';

const activities = [
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Museum', label: 'Museum' },
  { value: 'Park', label: 'Park' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Games and Activities', label: 'Games and Activities' },
  { value: 'Club', label: 'Club' }
];

const times = [
  { value: 'Morning', label: 'Morning' },
  { value: 'Afternoon', label: 'Afternoon' },
  { value: 'Evening', label: 'Evening' },
];

const SelectionPage = ({ user }) => {
  const navigate = useNavigate();
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
  const handleShowResult = async () => {
    if (!province || !city || !activity || !budget) {
      setError("Please fill all mandatory fields correctly.");
      return;
    }

        if (isNaN(budget) || budget < 0) {
      setError("Budget must be a positive number.");
      return;
    }

    //  minimum budget of $15 for "Restaurant" and "Games and Activities"
    const minBudgetActivities = ["Restaurant", "Games and Activities", "Club"];
    const minBudgetActivitiesCafe = ["Cafe"];
    if(minBudgetActivitiesCafe.includes(activity.value)&& budget <5) {
      setError(`The minimum budget for ${activity.label} is $5.`);
      return
    }
    if (minBudgetActivities.includes(activity.value) && budget < 15) {
      setError(`The minimum budget for ${activity.label} is $15.`);
      return;
    }
  
    const requestData = {
      Category: activity.value,
      City: city,
      Province: province.value,
      Budget: budget,
      Time: time ? time.value : "Any"
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/get_recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
  
      const data = await response.json();
      console.log("✅ Received data from Flask:", data); 
  
      //Navigate to ResultPage with data
      navigate('/results', { state: { recommendations: data } });
  
    } catch (error) {
      console.error(" Error fetching recommendations:", error);
      setError("Failed to fetch recommendations.");
    }
  };
  
  const selectedProvince = citiesData.find(p => p.Province === province?.value);
  const filteredTimes = activity?.value === 'Club' ? times.filter(t => t.value !== 'Morning' && t.value !== 'Afternoon') : times;
  

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
