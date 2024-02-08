import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { eventRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import NavbarComponent from '../components/Navbar';

function EventList() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
    location: ''
  });
  console.log("yoyo");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(eventRoute);
        setEvents(response.data.events);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post(eventRoute, newEvent);
      console.log("something");
    //   setEvents(prevState => [...prevState, response.data.event]);
    async function fetchData() {
        try {
          const response = await axios.get(eventRoute);
          setEvents(response.data.events);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
      console.log(events)
      setNewEvent({
        name: '',
        date: '',
        time: '',
        description: '',
        location: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><NavbarComponent> </NavbarComponent>
    <FormContainer>
      <div className='scroll-Container'>
      
      <form onSubmit={handleSubmit}>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h1>Add New Event</h1>
      </div>

        <label>
          Title:
          <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={newEvent.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Event</button>
      </form>
    </div>
    </FormContainer>
    </div>
     /* <ToastContainer/>   */
  );
}
const FormContainer = styled.div`
.scroll-container {
  scroll-behavior: smooth;
  overflow-y: scroll;
  height:90vh;
}
  min-height: 100vh;
  display: flex;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  padding-top: 0.25rem;
  padding-right: 1.5rem;
  padding-bottom: 3.5rem;
  padding-left: 1.5rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background-color: white;
    border-radius: 2rem;
    padding: 1.5rem;
    margin-top: 0rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  ul {
    max-height: calc(100vh - 15rem);
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 1rem;

      h2 {
        margin: 0;
        font-size: 2rem;
      }

      p {
        margin: 0.5rem 0;
        font-size: 1.2rem;
      }
    }
  }
`;

export default EventList;