import { useCallback } from 'react';
import Input from '../FormElements/Input';
import { searchInputList } from '../../../app/actions/search'
import { useAppDispatch } from '../../../app/hooks';
import { useHttpClient } from '../../hooks/http-hook'
import { InputHandlerProps } from '../../types/formTypes'
import './SearchBar.css';

const SearchBar = () => {
    const { sendRequest } = useHttpClient();
    const dispatch = useAppDispatch();

    const inputHandler: InputHandlerProps = useCallback((value) => {
        const action = searchInputList({
            sendRequest, 
            searchInput: value
        })
        dispatch(action)
    }, [dispatch])

    return (
        <form>
            <div className='search'>
                <span className='search-icon material-symbols-outlined'>search</span>
                <Input 
                    id='search'
                    type='search'
                    placeholder='Search'
                    label=''
                    element='search'
                    validators={[]}
                    errorText=''
                    onInput = {inputHandler}
                    nameId='title'
                    className='search-input'
                />
            </div>
        </form>
  )
}

export default SearchBar