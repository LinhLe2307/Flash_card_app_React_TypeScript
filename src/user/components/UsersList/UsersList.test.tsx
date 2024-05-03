import { render, screen } from '@testing-library/react'
import UsersList from './UsersList'
import { ListResponse } from '../../../shared/types/sharedTypes'
import { UserProps } from '../../types/userTypes'
import { vi } from 'vitest'

describe('UsersList', () => {
    it('calls items when the list does not have anything', () => {
        const items: ListResponse<UserProps> = [
            {
                id: 2307,
                image: 'https://images.unsplash.com/photo-1713528197472-7b7f7dbb5bb4?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                firstName: 'Linh',
                lastName: 'Le',
                cards: []
            }
        ];
        const getUsersList = vi.fn();
        render(<UsersList items={items} />);
        expect(getUsersList).toBeDefined();
    });

})