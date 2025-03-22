import { useEffect, useState } from "react";
import ErrorPage from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(
          { message: error.message } ||
            "Something went wrong! Please try again later."
        );
        setIsFetching(false);
      }

      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }
}
