import React from "react"
import { useMatches } from "react-router-dom"
import { Link } from "react-router-dom"

function Breadcrumbs() {
  let matches = useMatches()

  return (
    <>
      <ol className="flex flex-row gap-1 text-lg font-semibold text-on-light">
        {matches.map((match, index) => (
          <li key={index} className={match !== matches[matches.length - 1] ? 'hover:border-b-2 text-n40 hover:text-on-light' : ''}>
            {match !== matches[matches.length - 1] ? (
              <Link to={match.pathname}>
                {match.handle?.title}
                {" >"}
              </Link>
            ) : (
              match.handle.title
            )}
          </li>
        ))}
      </ol>
    </>
  )
}

export default Breadcrumbs
