import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { filterName } from '../../shared/constants/global'
import { FetchUpdateDataPayload, FormInputsProps, FormState } from '../../shared/types/formTypes'
import { ObjectGenericProps } from '../../shared/types/sharedTypes'
import { initialStateForm, setDataFormFailure, setDataFormSucess } from '../actions/form'
import { initialImageState } from '../actions/image'


const initialState: FormState = {
    inputs: {
        // title: {
        //     value: '',
        //     isValid: false
        //   },
        //   description: {
        //     value: '',
        //     isValid: false
        // },
    },
    isValid: false
  }
function* getUpdateCard(action: PayloadAction<FetchUpdateDataPayload>) {
    try {
        yield put(initialStateForm({
            initialState: initialState
        }))

        yield put(initialImageState())

        const response: ObjectGenericProps<ObjectGenericProps<string>> = yield call(action.payload.sendRequest, 
            `/api/cards/${action.payload.cardId}`, 
            'GET', 
            null, 
            {
                'Content-Type': 'application/json'
            })
            
            const newData: FormInputsProps = {}
            Object.entries(response.card).map(([key, value]) => {
                if (['title', 'description'].indexOf(key) !== -1) {
                    if (typeof value === 'string') {
                        newData[key] = {
                            value: value,
                            isValid : true
                        }
                    }
                } else if (filterName.indexOf(key) === -1) {
                    if (typeof value === 'object' && value !== null) {
                        const typedValue = value as ObjectGenericProps<string>
                        newData[key] = {
                            value: {
                                term: {
                                    value: typedValue.term,
                                    isValid: true
                                }, definition:  {
                                    value: typedValue.definition,
                                    isValid: true
                                }, imageUrl:  {
                                    value: typedValue.imageUrl ? typedValue.imageUrl : '',
                                    isValid: true
                                }
                            },
                            isValid: true
                        }
                    }
                }
            })
            
            yield put(setDataFormSucess({
                inputs: newData,
                formIsValid: true
        }))

    } catch(error) {
        yield put(setDataFormFailure())
    }
}

function* formSaga() {
    yield takeLatest('FETCH_UPDATE_CARD', getUpdateCard)
}


export default formSaga