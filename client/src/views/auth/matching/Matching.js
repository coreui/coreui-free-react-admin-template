/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import RunMatch from './RunMatch'
import Mail from './Mail'
const Matching = () => {
  const [hasMatched, setHasMatched] = useState(false)
  const [hasSent, setHasSent] = useState(false)

  return (
    <div className="matching  p-5 rounded bg-white text-black w-50 mx-auto mt-5">
      {hasMatched ? (
        <Mail hasSent={hasSent} setHasSent={setHasSent} setHasMatched={setHasMatched} />
      ) : (
        <RunMatch
          hasSent={hasSent}
          setHasSent={setHasSent}
          hasMatched={hasMatched}
          setHasMatched={setHasMatched}
        />
      )}
    </div>
  )
}

export default Matching
