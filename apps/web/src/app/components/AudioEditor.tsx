"use client"
import { useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'

export const AudioEditor = () => {
  const containerRef = useRef(null)

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: '/my-server/audio.ogg',
    waveColor: 'purple',
    height: 100,
  })

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  return (
    <>
      <div ref={containerRef} />

      <button onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </>
  )
}