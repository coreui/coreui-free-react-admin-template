/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import RunMatch from './RunMatch'
import Mail from './Mail'
const Matching = () => {
  const [sdata, setSdata] = useState([1])
  const [jdata, setJdata] = useState([1])
  const [result, setResult] = useState(null)
  const [hasMatched, setHasMatched] = useState(false)
  return (
    <div className="matching  p-5 rounded bg-white text-black w-50 mx-auto mt-5">
      {hasMatched ? (
        <Mail setHasMatched={setHasMatched} />
      ) : (
        <RunMatch sdata={sdata} jdata={jdata} result={result} setHasMatched={setHasMatched} />
      )}
    </div>
  )
}

export default Matching
