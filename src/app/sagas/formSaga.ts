import { PayloadAction } from '@reduxjs/toolkit'
import {  put, takeLatest } from 'redux-saga/effects'
import { FetchUpdateDataPayload, FormInputsProps } from '../../shared/types/formTypes'
import { ObjectGenericProps } from '../../shared/types/sharedTypes'
import { setDataFormFailure, setDataFormSucess } from '../actions/form'

function* getUpdateCard(action: PayloadAction<FetchUpdateDataPayload>) {
    try {
        const newData: FormInputsProps = {}
        Object.entries(action.payload.response).map(([key, value]) => {
            if (['title', 'description'].indexOf(key) !== -1) {
                newData[key] = {
                    value: value,
                    isValid : true
                }
            } else if (key === 'tags') {
                if (Array.isArray(value)) {
                    newData['tags'] = {
                        value: value.map(tag => tag.name),
                        isValid : true
                    }
                }
            } else if (key === 'subcards') {
                if (typeof value === 'object' && Array.isArray(value) && value !== null) {
                    (value as ObjectGenericProps<string>[]).forEach((subcard: ObjectGenericProps<string>) => {
                        newData[subcard.id] = {
                            value: {
                                term: {
                                    value: subcard.term,
                                    isValid: true
                                }, definition:  {
                                    value: subcard.definition,
                                    isValid: true
                                }, imageUrl:  {
                                    value: subcard.imageUrl ? subcard.imageUrl : '',
                                    isValid: true
                                }
                            },
                            isValid: true
                        }
                    })
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