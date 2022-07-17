import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const savingsSlice = createSlice({
  name: 'savings',
  initialState: [],
  reducers: {
    initSavings: (state = initialState, action) => {
      for (const element of action.payload) {
        const newSaving = {
          category: element.category,
          amount: element.amount,
          concept: element.concept,
          currency: element.currency,
        }
        
        state.push(newSaving)
      }
    },
    addSaving: (state = initialState, action) => {
      const newSaving = {
        category: action.payload.newCategory,
        amount: action.payload.newAmount,
        concept: action.payload.newConcept,
        currency: action.payload.newCurrency,
      }

      state.push(newSaving)
    },
  },
})

export const { initSavings, addSaving } = savingsSlice.actions
export default savingsSlice.reducer
