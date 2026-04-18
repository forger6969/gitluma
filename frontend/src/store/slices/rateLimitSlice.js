import { createSlice } from "@reduxjs/toolkit"

let rateLimitTimer = null
const initialState = {
  active: false,
  until: null,
  lastClearedAt: null,
}

const rateLimitSlice = createSlice({
  name: "rateLimit",
  initialState,
  reducers: {
    activateRateLimit: (state, action) => {
      const retryAfterMs = Math.max(0, Number(action.payload?.retryAfterMs ?? 0))
      state.active = true
      state.until = Date.now() + retryAfterMs
    },
    clearRateLimit: (state) => {
      state.active = false
      state.until = null
      state.lastClearedAt = Date.now()
    },
  },

}
)

export const { activateRateLimit, clearRateLimit } = rateLimitSlice.actions
export const startRateLimit = ({ retryAfterMs = 30000 } = {}) => (dispatch, getState) => {
  const ms = Math.max(0, Number(retryAfterMs || 0))
  if (rateLimitTimer) {
    clearTimeout(rateLimitTimer)
    rateLimitTimer = null
  }
  dispatch(activateRateLimit({ retryAfterMs: ms }))
  rateLimitTimer = setTimeout(() => {
    const { rateLimit } = getState()
    if (rateLimit?.active) dispatch(clearRateLimit())
  }, ms)
}
export default rateLimitSlice.reducer