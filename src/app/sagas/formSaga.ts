import { PayloadAction } from '@reduxjs/toolkit'
import {  put, takeLatest } from 'redux-saga/effects'
import { filterName } from '../../shared/constants/global'
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