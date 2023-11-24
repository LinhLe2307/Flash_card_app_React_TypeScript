import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { filterName } from '../../shared/constants/global'
import { FetchUpdateDataPayload, FormInputsProps } from '../../shared/types/formTypes'
import { ObjectGenericProps } from '../../shared/types/sharedTypes'
import { setDataForm } from '../actions/form'

function* getUpdateCard(action: PayloadAction<FetchUpdateDataPayload>) {
    try {
        const response: ObjectGenericProps<ObjectGenericProps<string>> = yield call(action.payload.sendRequest, 
            `/api/cards/${action.payload.cardId}`, 
            'GET', 
            null, 
            {
            'Content-Type': 'application/json'
        })

        const newData: FormInputsProps = {}
        Object.entries(response.card).map(([key, value]) => {
                if (["title", "description"].indexOf(key) !== -1) {
                    if (typeof value === "string") {
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

        yield put(setDataForm({
            inputs: newData,
            formIsValid: true
        }))

    } catch(error) {
        console.log(error)
    }
}

function* formSaga() {
    yield takeEvery('FETCH_UPDATE_CARD', getUpdateCard)
}

export default formSaga