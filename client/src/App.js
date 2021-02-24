import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // main-content, extra-part - side components
  return (
    <div className="container">
      <div className="header">
        <div className="header-logo">MORDOR</div>
        <div className="header-app">
          <ul style={{ marginTop: "5px" }}>
            <li className="btn header-lang">En/Ru</li>
            <li className="btn header-theme">Dark/Light</li>
            <li className="btn btn-header">Login/Register</li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="all-fictions">
          <div className="popular-fictions">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Popular fictions</h5>
                <p class="card-text">
                  The most popular fictions will be placed here
                </p>
                <div className="card">
                  <div className="card-body">
                    <p className="One of the popular fictions">
                      Once upon at midnight dreary...
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <p className="One of the popular fictions">
                      Once upon at midnight dreary...
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <p className="One of the popular fictions">
                      Once upon at midnight dreary...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="updated-fictions">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Recently updated</h5>
                <p class="card-text">All recently updated posts will be here</p>
                <div className="card">
                  <div className="card-body">
                    <p className="One of the popular fictions">
                      Once upon at midnight dreary...
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <p className="One of the popular fictions">
                      Once upon at midnight dreary...
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <p className="One of the popular fictions">
                      Once upon at midnight dreary...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra-part">
          <div className="ft-search">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Search</div>
                <form>
                  <input></input>
                  <button style={{ marginLeft: "6px" }}>Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div class="card" style={{ marginTop: "1rem" }}>
            <div class="card-body">
              <h5 class="card-title">Tag cloud</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Here will be tag cloud
              </h6>
              <p class="card-text">Tag Tag Tag Tag Tag</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
