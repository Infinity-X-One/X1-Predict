'use client'

import { useEffect, useState } from 'react'
import { evaluateTrades } from '@/engine/TradeLogger'

export default function PredictionProofPanel() {
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      const res = await evaluateTrades()
      setResults(res)
    }

    fetchResults()
  }, [])

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">📊 Prediction Proof Panel</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Asset</th>
            <th className="p-2">Buy</th>
            <th className="p-2">Prediction</th>
            <th className="p-2">Current</th>
            <th className="p-2">Result</th>
            <th className="p-2">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r: any, i: number) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.symbol}</td>
              <td className="p-2">${r.buyPrice.toFixed(2)}</td>
              <td className="p-2">${r.prediction.toFixed(2)}</td>
              <td className="p-2">${r.currentPrice.toFixed(2)}</td>
              <td className={`p-2 font-bold ${r.result === 'WIN' ? 'text-green-600' : 'text-red-600'}`}>{r.result}</td>
              <td className="p-2">{(r.confidence * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
