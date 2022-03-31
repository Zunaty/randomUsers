import { useState, useEffect } from 'react';
import './App.css';

// importing mui components
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Typography,
  Avatar,
  Stack,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function userDataFetch() {
    // sending a request for the user data, since the api is limited to a max of 5000 per pull,
    // instead four seperate requests of 2000 to reach the requested amount of 7000
    const [fetchOne, fetchTwo, fetchThree, fetchFour] = await Promise.all([
      fetch('/api/users'),
      fetch('/api/users'),
      fetch('/api/users'),
      fetch('/api/users')
    ]);

    // converting response to json
    const fetch1 = await fetchOne.json();
    const fetch2 = await fetchTwo.json();
    const fetch3 = await fetchThree.json();
    const fetch4 = await fetchFour.json();

    // pulling only results from the responses
    let arr1 = fetch1.results;
    let arr2 = fetch2.results;
    let arr3 = fetch3.results;
    let arr4 = fetch4.results;

    // combining all the responses into one array
    let combinedArray = arr1.concat(arr2, arr3, arr4);

    // moving data into the useState
    setData(combinedArray);
  }

  useEffect(() => {
    userDataFetch()
  }, []);

  // console.log(data);

  return (
    <div>
      <header className="App-header">
        <h1>
          Random User List
        </h1>

        <div>
          {!data.length > 0 ? "Loading..." : <span className='arrow arrowDown'></span>}
        </div>
      </header>

      <div>
        {data.map((user, index) => (
          <Accordion 
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              {/* first and last name */}
              <Typography sx={{width: '33%', flexShrink: 0}}>
                {user.name.first + " " + user.name.last} 
              </Typography>

              {/* email, city, and country */}
              <Typography>
                {user.email + " --- " + user.location.city + ", " + user.location.country}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack 
                direction="row" 
                spacing={4}
              >
                <Avatar
                  alt={user.name.first + " " + user.name.last}
                  src={user.picture.large}
                  sx={{width: 120, height: 120}}
                />
                <Typography>
                  {user.location.street.name + ", " + user.location.postcode + ", " + user.location.city + ", " + user.location.country}
                  <br />
                  {"Cell: " + user.cell}
                  <br />
                  {"Phone: " + user.phone}
                  <br />
                  {"D.O.B. : " + user.dob.date}
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default App;