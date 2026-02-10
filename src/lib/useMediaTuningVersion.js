import { useSyncExternalStore } from 'react'
import { getMediaTuningVersion, subscribeMediaTuning } from './mediaTuning.js'

export default function useMediaTuningVersion() {
  useSyncExternalStore(subscribeMediaTuning, getMediaTuningVersion, getMediaTuningVersion)
}

