import React, { useCallback, useState } from "react"

const PipButtonComponent = ({ cameraRef }) => {
  const [isPipEnabled, setIsPipEnabled] = useState(false)

  const togglePip = useCallback(async () => {
    if (isPipEnabled) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      }
    } else {
      await cameraRef.current.requestPictureInPicture()
    }
    setIsPipEnabled(!isPipEnabled)
  }, [isPipEnabled, cameraRef])

  return (
    <button onClick={togglePip}>
      {isPipEnabled ? "Disable PiP" : "Enable PiP"}
    </button>
  )
}

export default PipButtonComponent
