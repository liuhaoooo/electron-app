// preload.ts
// All the Node.js APIs are available in the preload process.
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronApi', {
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
})