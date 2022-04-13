import './champions.css'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { cilCommentBubble, cilDelete, cilPencil, cilTrash, cilUser } from '@coreui/icons'

import Axios from 'axios'
import CIcon from '@coreui/icons-react'

const Champions = () => {
  const [championName, setChampionName] = useState('')
  const [riotGameToFollow, setRiotGame] = useState([])
  const [followedChampionsDisplay, setFollowedChampionsDisplay] = useState([])

  const submitSend = async (req, res) => {
    let loggedUser = localStorage.getItem('user')
    await Axios.post('http://localhost:3000/champions/follow', {
      user: loggedUser,
      champion: championName.toLocaleLowerCase(),
      games: riotGameToFollow,
    })
    getFollowedChampions()
  }

  const onChampionChange = (event) => {
    setChampionName(event.target.value)
  }

  const getFollowedChampions = async () => {
    const followedChampions = await Axios.get('http://localhost:3000/champions/get')
    setFollowedChampionsDisplay(followedChampions.data)
  }
  const handleRiotGamesArray = (check) => {
    let newElement = check.target.value
    let currentArray = riotGameToFollow
    const gamesFilter = (games) => {
      return games !== newElement
    }

    if (riotGameToFollow.includes(newElement)) {
      let indexToRemove = currentArray.indexOf(newElement)
      setRiotGame(riotGameToFollow.filter(gamesFilter))
      console.log('newState', indexToRemove)
    } else {
      setRiotGame((riotGameToFollow) => [...riotGameToFollow, newElement])
    }
  }

  const deleteFollow = async (championName) => {
    await Axios.delete(`http://localhost:3000/champions/delete/${championName}`)
  }

  const editFollow = async (championName) => {
    // await Axios.delete('http://localhost:3000/champions/delete', card)
    console.log(championName, 'edit')
  }
  useEffect(() => {
    console.log(riotGameToFollow, 'riotGamestoFollow')
    console.log(championName)
  }, [riotGameToFollow, championName])

  useEffect(() => {
    getFollowedChampions()
  }, [followedChampionsDisplay])

  useEffect(() => {
    getFollowedChampions()
  }, [])

  return (
    <>
      <CCard className="p-1" color="light">
        <CCardBody>
          <CForm>
            <h1>Follow a champion</h1>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Champion Name"
                autoComplete="username"
                onChange={onChampionChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-1">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="League of Legends"
                  onChange={handleRiotGamesArray}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  League of Legends
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Legends of Runeterra"
                  value="Legends of Runeterra"
                  onChange={handleRiotGamesArray}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Legends of Runeterra
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="Teamfight Tactics"
                  onChange={handleRiotGamesArray}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox3">
                  Teamfight Tactics
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox4"
                  value="General Lore"
                  onChange={handleRiotGamesArray}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox3">
                  General Lore
                </label>
              </div>
            </CInputGroup>
            <CRow>
              <CCol xs={6}>
                <CButton color="primary" className="px-4" role="button" onClick={submitSend}>
                  Add Champion
                </CButton>
              </CCol>
              <CCol xs={6} className="text-right"></CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      {followedChampionsDisplay.map((champion, i) => {
        let championName = champion.champion[0].toUpperCase() + champion.champion.slice(1)
        return (
          <CCard className="p-1" color="light" key={i}>
            <CCardBody>
              <h1>{championName}</h1>
              <div>
                {champion.games.map((game, i) => (
                  <p key={i}>
                    {game}
                    <CIcon icon={cilDelete} />
                  </p>
                ))}
              </div>

              <CButton
                color="primary"
                className="px-3 m-2"
                role="button"
                onClick={() => {
                  deleteFollow(championName)
                }}
              >
                <CIcon icon={cilTrash} />
              </CButton>
              <CButton
                color="primary"
                className="px-3 m-2"
                role="button"
                onClick={() => {
                  editFollow(championName)
                }}
              >
                <CIcon icon={cilPencil} />
              </CButton>
            </CCardBody>
          </CCard>
        )
      })}
    </>
  )
}

export default Champions
