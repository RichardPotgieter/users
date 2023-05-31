import React, { useEffect, useState } from "react";

const Home = () => {
  const [returnedData, setReturnedData] = useState([`Hi There`]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetch("/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json());

      setReturnedData(newData);
    };

    fetchData();
  }, []);

  useEffect(() => {}, [returnedData]);

  console.log(returnedData);

  return <>Table</>;
};

export default Home;
