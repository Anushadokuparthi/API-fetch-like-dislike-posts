import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";

export default function App() {
  const [activityStatus, setActivityStatus] = useState(null);
  const [data, setData] = useState();

  const likedActivity = (e) => {
    setActivityStatus("liked");
  };

  const dislikedActivity = (e) => {
    setActivityStatus("disliked");
  };

  useEffect(() => {
    axios("https://www.boredapi.com/api/activity")
      .then((response) => {
        console.log(response.data.activity);
        setData(response.data.activity);
      })
      .catch((error) => {
        console.log("Error...");
      });
  }, []);

  return (
    <div className="App">
      <div className="container mt-3">
        <h4>Click on like or dislike to see the change</h4>
        <div
          className={
            activityStatus === null
              ? "card"
              : activityStatus === "liked"
              ? "card liked"
              : "card disliked mb-3"
          }
        >
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5>{data}</h5>
              </div>
              <div className="col">
                <div className="button-group">
                  <button
                    className={
                      activityStatus === null
                        ? "btn btn-light mr-2"
                        : activityStatus === "liked"
                        ? "btn liked mr-2"
                        : "btn disliked mr-2"
                    }
                    onClick={dislikedActivity}
                  >
                    Dislike
                  </button>
                  <button className="btn btn-light" onClick={likedActivity}>
                    Like
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
