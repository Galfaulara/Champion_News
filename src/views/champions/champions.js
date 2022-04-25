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
import { cilDelete, cilNoteAdd, cilPencil, cilTrash, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'

import Axios from 'axios'
import CIcon from '@coreui/icons-react'

const Champions = () => {
  const deleteGamefollow = useSelector((state) => state.deleteGamefollow)

  const [championName, setChampionName] = useState('')

  const [riotGameToFollow, setRiotGame] = useState([])

  const [followedChampionsDisplay, setFollowedChampionsDisplay] = useState([])

  const [gamesArray, setGamesArray] = useState([
    'League of Legends',
    'Legends of Runeterra',
    'Teamfight Tactics',
    'General Lore',
  ])

  const dispatch = useDispatch()

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
    const gamesFilter = (games) => {
      return games !== newElement
    }

    if (riotGameToFollow.includes(newElement)) {
      setRiotGame(riotGameToFollow.filter(gamesFilter))
    } else {
      setRiotGame((riotGameToFollow) => [...riotGameToFollow, newElement])
    }
  }

  const deleteFollow = async (championName) => {
    await Axios.delete(`http://localhost:3000/champions/delete/${championName}`)
  }

  const editFollow = async (championName) => {
    dispatch({ type: 'set', deleteGamefollow: !deleteGamefollow })
    console.log(championName, deleteGamefollow)
  }

  const eliminateGame = async (game, championName) => {
    await Axios.put('http://localhost:3000/champions/updateEliminate', {
      champion: championName,
      game: game,
    })
  }

  const addGame = async (game, championName) => {
    await Axios.put('http://localhost:3000/champions/updateAdd', {
      champion: championName,
      game: game,
    })
  }

  useEffect(() => {
    console.log(riotGameToFollow, 'riotGamestoFollow')
    console.log(championName)
  }, [riotGameToFollow, championName])

  useEffect(() => {
    setGamesArray([
      'League of Legends',
      'Legends of Runeterra',
      'Teamfight Tactics',
      'General Lore',
    ])
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
                <CButton
                  color="primary"
                  id="editButton"
                  className="px-3 m-2"
                  role="button"
                  onClick={() => {
                    editFollow(championName)
                  }}
                >
                  Edit <CIcon icon={cilPencil} />
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
          <CCard className="p-1" color="light" key={i + champion}>
            <CCardBody>
              <h1 id="championName">{championName}</h1>
              <div id="gamesFollowed">
                {champion.games.map((game, i) => (
                  <>
                    <p id="eachGame">
                      <>
                        {game}
                        {deleteGamefollow && (
                          <CIcon
                            icon={cilDelete}
                            onClick={() => {
                              eliminateGame(game, championName)
                            }}
                          />
                        )}
                      </>
                    </p>
                  </>
                ))}
                {deleteGamefollow && (
                  <>
                    {gamesArray
                      .filter((game) => !champion.games.includes(game))
                      .map((item, i) => (
                        <>
                          <p id="eachGame2">
                            <>
                              {item}
                              <CIcon
                                icon={cilNoteAdd}
                                onClick={() => {
                                  addGame(item, championName)
                                }}
                              />
                            </>
                          </p>
                        </>
                      ))}
                  </>
                )}
              </div>
              <div id="cardButtons">
                <CButton
                  color="primary"
                  id="deleteButton"
                  className="px-3 m-2"
                  role="button"
                  onClick={() => {
                    deleteFollow(championName)
                  }}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        )
      })}
    </>
  )
}

export default Champions
