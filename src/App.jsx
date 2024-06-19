import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [deleteData, setDeleteData] = useState([]);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Error Occured!");
        }
        const result = await response.json();
        setPages(result.total_pages);
        setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [page]);

  console.log(data);

  const deleteHandler = (id) => {
    const newData = [...data.filter((item) => item.id !== id)];
    setData(newData);
  };

  const nextPage = () => {
    if (page < pages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <h1>UOLO USER LIST</h1>
      {/* <table style={{ width: "100%" }} border={1}>
        <tr>
          <th style={{ width: "30%", border: "none" }}>profile pic</th>
          <th style={{ width: "30%", border: "none" }}>name</th>
          <th style={{ width: "30%", border: "none" }}>email</th>
          <th style={{ width: "30%", border: "none" }}>delete</th>
        </tr>
        <tbody style={{ borderBottom: "1px solid black" }}>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <th style={{ width: "30%" }}>
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                    src={item.avatar}
                    alt={item.first_name}
                  />
                </th>
                <td style={{ width: "30%" }}>{item.first_name}</td>
                <td style={{ width: "30%" }}>{item.email}</td>
                <td>
                  <button onClick={() => deleteHandler(item.id)}>
                    <img
                      style={{ width: "32px", height: "32px" }}
                      src="https://imgs.search.brave.com/dg8YYcgUK-JuzS6Wb1VvuJzQxJK71SgO-0e1dNerl14/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni83Njk1Lzc2OTU4/MjQucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "12px",
          marginTop: "12px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                border: "1px solid black",
                boxShadow: "2px 2px 10px #000000",
                width: "28%",
                height: "180px",
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ alignSelf: "center" }}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  src={item.avatar}
                  alt={item.first_name}
                />
              </div>
              <p>{item.first_name}</p>
              <p>{item.email}</p>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                }}
                onClick={() => deleteHandler(item.id)}
              >
                <img
                  style={{ width: "20px", height: "20px" }}
                  src="https://imgs.search.brave.com/dg8YYcgUK-JuzS6Wb1VvuJzQxJK71SgO-0e1dNerl14/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni83Njk1Lzc2OTU4/MjQucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
                />
              </button>
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button disabled={page === 1} onClick={prevPage}>
          previous
        </button>
        <button disabled={page === pages} onClick={nextPage}>
          Next
        </button>
      </div>
    </>
  );
}

export default App;
