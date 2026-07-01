import { useState, useEffect } from 'react'

const useFetch = (fetchFn) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const execute = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFn()
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, refetch: execute }
}

export default useFetch
