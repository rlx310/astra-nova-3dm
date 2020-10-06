import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { clearStudentChoices, updateStudentChoice } from '../logic'

const Students = ({ library, students, setStudents, score }) => {
  return (
    <StyledStudents>
      <h2>Students</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr className="titles">
              <th></th>
              {library.map(({ shortName, id, color }) => (
                <StyledTitle key={`table-${id}`} color={color}>
                  {shortName}
                </StyledTitle>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(({ name, books, choice }, studentIndex) => (
              <tr key={name}>
                <th className="student-name">{name}</th>
                {books.map((bookScore, choiceIndex) => (
                  <StyledSelection
                    className="points"
                    key={name + bookScore}
                    color={library[choiceIndex].color}
                    index={studentIndex}
                    active={choiceIndex === choice}
                    onClick={() => {
                      setStudents(
                        updateStudentChoice(
                          students,
                          studentIndex,
                          choiceIndex,
                          library
                        )
                      )
                    }}
                  >
                    {bookScore}
                  </StyledSelection>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="score-wrapper">Score: {score}</div>
      <div className="button-wrapper">
        <Button onClick={() => setStudents(clearStudentChoices(students))}>
          Clear All
        </Button>
      </div>
    </StyledStudents>
  )
}

const StyledStudents = styled.div`
  margin: auto;
  max-width: 664px;

  h2 {
    text-align: center;
  }

  .table-wrapper {
    margin: auto;
    margin-bottom: 20px;
  }

  table {
    margin: auto;
    border-collapse: collapse;
  }

  td {
    text-align: center;
    font-weight: 700;
  }

  tr:nth-child(odd) .student-name {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .student-name {
    text-transform: uppercase;
    padding-left: 15px;
    padding-right: 25px;
    text-align: right;
  }

  .score-wrapper {
    text-align: right;
    padding-right: 6px;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
  }
`

const StyledTitle = styled.th`
  color: white;
  padding: 2px 8px;
  text-transform: uppercase;
  min-width: 88px;
  background-color: ${({ color }) => `rgb(${color})` || 'transparent'};
`

const StyledSelection = styled.td`
  cursor: pointer;
  background-color: ${({ active, color, index }) => {
    let alpha = 0
    index % 2 === 0 ? (alpha = 0.2) : (alpha = 0.1)
    active ? (alpha = 0.5) : null
    return `rgba(${color}, ${alpha})`
  }};
`

export default Students
