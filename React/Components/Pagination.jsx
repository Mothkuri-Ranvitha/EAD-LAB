import React, { useState } from 'react'
import Team from './Team'

const teams = [
  { name: 'Ranvitha', role: 'SDE' },
  { name: 'Sathwika', role: 'Web developer' },
  { name: 'Varshini', role: 'Full Stack Developer' },
  { name: 'Kiran', role: 'Designer' },
  { name: 'Anu', role: 'Product Manager' },
  { name: 'Abc', role: 'QA Engineer' },

]

const ITEMS_PER_PAGE = 2

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentTeams = teams.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div>
      {currentTeams.map((team, index) => (
        <Team key={index} name={team.name} role={team.role} />
      ))}

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
