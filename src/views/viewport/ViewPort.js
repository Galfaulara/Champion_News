import './ViewPort.css'

import { CCard } from '@coreui/react'
import React from 'react'

const ViewPort = () => {
  return (
    <div>
      <CCard className="Main">
        <section className="glass">
          <div className="ViewPort">
            <div className="user">
              <img src={'GA.png'} className="userImg" alt="null" />
              <h3>Gabriel Alfau</h3>
              <p>Me</p>
            </div>
            <div className="links">
              <div className="link">
                <img src={'twitch.png'} alt="null" />
                <h2>Twitch</h2>
              </div>
              <div className="link">
                <img src={'steam.png'} alt="null" />
                <h2>Steam</h2>
              </div>
              <div className="link">
                <img src={'upcoming.png'} alt="null" />
                <h2>Games</h2>
              </div>
              <div className="link">
                <img src={'library.png'} alt="null" />
                <h2>Library</h2>
              </div>
              <div className="joinBtn">
                <h2>See what I do</h2>
                <img src={'controller.png'} alt="null" />
              </div>
            </div>
          </div>
          <div className="Articles">
            <div className="status">
              <h1>Active Games</h1>
              <input type="text" />
            </div>
            <div className="cards">
              <div className="card">
                <img src={'LOL_Logo.png'} className="cardImage" alt="null" />
                <div className="card-info">
                  <h2>League of Legends</h2>
                  <p>Console version</p>
                  <div className="progress"></div>
                </div>
                <h2 className="percentae">40%</h2>
              </div>
              <div className="card">
                <img src={'LOR_Logo.png'} className="cardImage" alt="null" />
                <div className="card-info">
                  <h2>Legends of Runeterra</h2>
                  <p>Console version</p>
                  <div className="progress"></div>
                </div>
                <h2 className="percentae">40%</h2>
              </div>
              <div className="card">
                <img src={'TFT_Logo.png'} className="cardImage" alt="null" />
                <div className="card-info">
                  <h2>TeamFight Tactics</h2>
                  <p>Console version</p>
                  <div className="progress"></div>
                </div>
                <h2 className="percentae">40%</h2>
              </div>
            </div>
          </div>
        </section>
      </CCard>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  )
}

export default ViewPort
