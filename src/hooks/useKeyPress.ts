import { useState, useEffect } from "react"

const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState<string | null>()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== keyPressed) {
        setKeyPressed(event.key)
      }
    }

    const handleKeyUp = () => {
      setKeyPressed(null)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return keyPressed
}

export default useKeyPress