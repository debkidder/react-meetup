import { useState, useEffect } from "react";
// import { response } from "express";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
];

function AllMeetupsPage() {
  // component function
  const [isLoading, setIsLoading] = useState(true);
  // useState will always return array of these two elements:
  // isLoading is current state snapshot; setIsLoading is function for updating the state
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // side effects that shouldn't run in some situations
    setIsLoading(true);
    fetch(
      "https://react-meetup-firebase-default-rtdb.firebaseio.com/meetups/-NBZvtVLQxvCcSXYasuZ"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // need to transform data that it's fetching (stored as object, but 'map' needs an array)
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          // helper meetups array
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(data);
        // will cause infinite loop if we forget to use the "useEffect" hook
      });
  }, []);
  // checks the dependencies array to see if it should execute the function (ours is empty because there are no external dependencies)

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
      {/* <MeetupList meetups={DUMMY_DATA} /> */}
    </section>
  );
}

export default AllMeetupsPage;
