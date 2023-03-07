import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { eventRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.svg";
import NavbarComponent from '../components/Navbar';
import { Carousel } from 'react-bootstrap';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
function MyCarousel() {
  return (
    <div style={{ height: "80vh", width: "100vw" }}>
      <Carousel style={{ height: "100%" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Energy conservation is the key to a sustainable future</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1>Unplug to save the planet</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1>Reduce your carbon footprint, switch to green electricity</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

function EventCard({ event }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleCardClick = () => {
    setShowPopUp(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 3000); // delay in milliseconds, 3000 = 3 seconds
  };

  const handlePopUpClose = () => {
    setShowPopUp(false);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-body">
        <h2 className="card-title" style={{ backgroundColor: "green", color: "black", padding: "10px" }}>{event.title}</h2>
        <p className="card-text">{event.description}</p>
        <p className="card-text">Date: {event.date}</p>
        <p className="card-text">Time: {event.time}</p>
        <p className="card-text">Location: {event.location}</p>
      </div>
      {showPopUp && (
        <div className="pop-up">
          <h2>You are invited to {event.title}!</h2>
        </div>
      )}
    </div>
  );
}


export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_LOCALHOST_KEY);
    async function fetchData() {
      try {
        const response = await axios.get(eventRoute);
        const currentDate = new Date();
        const upcomingEvents = response.data.events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= currentDate;
        });
        setEvents(upcomingEvents);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  }, []);
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Container>
      <div className='scroll-container'>
      <div className="carousel-container">
          <MyCarousel></MyCarousel>
        </div>
        <div className="heading">
            <h1>Upcoming Events</h1>
          </div>
        <div className="event-card-container">
          <div className="card-deck">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          </div>
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
.scroll-container {
  scroll-behavior: smooth;
  overflow-y: scroll;
  height:90vh;
}
  /* reduce the size of the carousel indicators */
  .carousel-indicators li {
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }
  /* reduce the size of the carousel captions */
  .carousel-caption {
    width: 80%;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  /* reduce the size of the carousel images */
  .carousel-item img {
    height: 80vh;
    object-fit: cover;
  }
  .heading {
    display: flex;
    justify-content: center;
    height:100px;
  }
  .event-card-container {
  margin-top: 20px;

  .card-deck {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    margin-bottom:30px;

    .card {
      margin: 20px;
      border:2px solid black;
      flex: 1 0 calc(25% - 20px);

      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
`;