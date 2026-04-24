import { useContext } from 'react'
import { CmsContext } from './cmsContext.js'

export function useCms() {
  return useContext(CmsContext)
}
