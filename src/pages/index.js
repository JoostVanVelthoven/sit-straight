import fetchInject from "fetch-inject"
import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import Footer from "../components/footerComponent"
import Main from "../components/mainComponent"
import canvasCameraDrawer from "../helpers/canvasCameraDrawer"
import { isCorrectPosition$ } from "../helpers/timer"
import trackerBinder from "../helpers/trackerBinder"
import "./index.css"

export default () => {
  const cameraRef = useRef(null)
  const canvasRef = useRef(null)

  const [sliderState, setSliderState] = useState({ y: 50 })
  const [loaded, setLoaded] = useState(false)
  const [headPosition, setHeadPosition] = useState()
  const [isSettingStraight, setIsSettingStraight] = useState(undefined)
  const [setupState, setSetupState] = useState({ hasCamera: false })

  //unfortunately  the webcam current library is not node/npm.
  useEffect(() => {
    fetchInject(["/build/tracking.js"]).then((_) =>
      fetchInject(["/build/data/face.js"]).then((_) => setLoaded(true))
    )
  }, [])

  useEffect(() => {
    if (loaded) {
      trackerBinder(cameraRef, setHeadPosition)
    }
  }, [loaded])

  // new head event

  useEffect(() => {
    if (!headPosition) {
      return
    }
    setSetupState({ ...setupState, hasCamera: true })

    const threshold = sliderState.y * 2.3 // because height is 240

    const currentEyeHeight = headPosition.y + headPosition.height / 2
    const isStraight = threshold > currentEyeHeight

    setIsSettingStraight(isStraight)
    canvasCameraDrawer(
      canvasRef.current,
      headPosition,
      threshold,
      isStraight,
      currentEyeHeight
    )
  }, [headPosition, sliderState])

  useEffect(() => {
    isCorrectPosition$.next(isSettingStraight)
    if (isSettingStraight !== undefined) {
      document.title =
        (isSettingStraight ? "😎" : "😪") +
        " - fix your back posture using camera coaching"
    }
  }, [isSettingStraight])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && cameraRef.current) {
        cameraRef.current.requestPictureInPicture()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [cameraRef])

  const title = "fix your back posture using camera coaching"
  const description =
    "Do you have problems with your posture? This website helps you with the camera and machine learning to sit straight."
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en-US",
        }}
        title={title}
        meta={[
          {
            name: `description`,
            content: description,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
        ]}
      />
      <header>
        Sit straight and move the slider{" "}
        <span role="img">{isSettingStraight ? "😎" : "😪"}</span>
      </header>
      <Main
        cameraRef={cameraRef}
        canvasRef={canvasRef}
        sliderState={sliderState}
        setSliderState={setSliderState}
        setupState={setupState}
        setSetupState={setSetupState}
      />
      <Footer />
    </>
  )
}
