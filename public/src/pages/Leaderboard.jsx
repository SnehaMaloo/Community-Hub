import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../assets/logo.svg";
import { SubmissionRoute } from "../utils/APIRoutes"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar"
function SubmissionList() {
    const [submission, setsubmission] = useState([]);
    const navigate = useNavigate();
    const handleclaim=async()=>{
      const today=new Date();
      console.log(today.getDay());
      if(today.getDay()===2)
      {navigate("/Reward");}
      else{
        alert("You can claim the rewards only at the end of the week");
      }
    }
    useEffect(() => {
        axios.get(SubmissionRoute)
            .then(response => {
                const sortedData = response.data.submissions.sort((a, b) => b.likes - a.likes);
                const filteredData = sortedData.filter(item => {
                  const weekStart = new Date();
                  weekStart.setDate(weekStart.getDate() - 7);
                  const itemDate = new Date(item.date);
                  return itemDate.getTime() >= weekStart.getTime();
                });
                setsubmission(filteredData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
      <><NavbarComponent></NavbarComponent>
        <Container >
            <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Leaderboard</h1>
          </div>
            <ul>
            {submission.slice(0,3).map(item => (
                    <li key={item.id}>
                        {item.username} ({item.likes} likes)
                        <button onClick={handleclaim}>Claim Reward</button>
                    </li>
                ))}
                {submission.slice(3,5).map(item => (
                    <li key={item.id}>
                        {item.username} ({item.likes} likes)
                    </li>
                ))}
            </ul>
        </Container>
        </>
    );
}

export default SubmissionList;

const Container = styled.div`

height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
  align-item:top;
      color: white;
      text-transform: uppercase;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    text-align:top;
    display: flex;
    text-transform: uppercase;
    align-items: center;
    justify-content: space-between;
    font-style:border;
    text-font:italic;
    background: white;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    
  }
  
  li:hover {
    transform: scale(1.05);
  }
  
  .author {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .likes {
    font-size: 1.2rem;
  }`;
  