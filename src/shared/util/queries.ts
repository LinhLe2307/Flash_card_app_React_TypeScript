import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query {
    getUsers {
      id
      firstName
      lastName
      aboutMe
      country
      email
      phone
      language
      x
      linkedIn
      instagram
      github
      website
      image
      cards {
        id
        title
        description
        tags {
          id
          name
        }
      }
  }
}
`
export const SINGLE_USER = gql`
  query findUserById($userId: ID!) {
    getUserDetail(userId: $userId) {
      id
      firstName
      lastName
      aboutMe
      country
      email
      phone
      language
      x
      linkedIn
      instagram
      github
      website
      image
      cards {
        id
        title
        description
        tags {
          id
          name
        }
        subcards {
          id
          term
          definition
        }
      }
    }
  }
`
export const LOGIN_USER = gql`
  mutation loginMutation($email: String!, $password: String!) {
    loginAuth(email: $email, password: $password) {
      userId
      token
      email
      image
  }
}
`
export const SIGN_UP_USER = gql`
  mutation signUpMutation(
    $firstName: String!
    $lastName: String!
    $aboutMe: String
    $country: String!
    $password: String!
    $email: String!
    $image: Upload!
    $phone: String
    $language: String
    $x: String
    $linkedIn: String
    $instagram: String
    $github: String
    $website: String
  ) {
    signUpAuth(
      firstName: $firstName
      lastName: $lastName
      aboutMe: $aboutMe
      country: $country
      email: $email
      password: $password
      phone: $phone
      language: $language
      image: $image
      x: $x
      linkedIn: $linkedIn
      instagram: $instagram
      github: $github
      website: $website) {
      userId
      token
      email
      image
  }
}
`
export const GET_COUNTRIES_AND_LANGUAGES = gql`
  query {
    getCountriesAndLanguages {
      countries {
        id
        country
      }
      languages {
        id
        name
      }
    }
  }
`

export const DELETE_USER = gql`
mutation deleteUserMutation ($userId: ID!){
  deleteUser(userId: $userId)
}
`

export const UPDATE_USER = gql`
  mutation updateUserMutation(
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $aboutMe: String
    $country: String!
    $email: String!
    $image: ImageInput!
    $phone: String
    $language: String
    $x: String
    $linkedIn: String
    $instagram: String
    $github: String
    $website: String
  ) {
    updateUser(
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      aboutMe: $aboutMe
      country: $country
      email: $email
      phone: $phone
      language: $language
      image: $image
      x: $x
      linkedIn: $linkedIn
      instagram: $instagram
      github: $github
      website: $website) {
        id
        firstName
        lastName
        aboutMe
        country
        email
        phone
        language
        x
        linkedIn
        instagram
        github
        website
        image
  }
  }
`

export const GET_CARD_BY_ID = gql`
  query findCardById($cardId: ID!) {
    getCardById(cardId: $cardId)
  }
`

export const CREATE_CARD = gql`
mutation createCardMutation ($input: JSON!){
  createCard(input: $input)
}
`

export const UPDATE_CARD = gql`
mutation updateCardMutation ($input: JSON!){
  updateCard(input: $input)
}
`

export const DELETE_CARD = gql`
mutation deleteCardMutation (
  $cardId: ID!
  $userId: ID!
){
  deleteCard(
    cardId: $cardId
    userId: $userId
  )
}
`

export const GET_SINGLE_USER_BY_EMAIL = gql`
  mutation getSingleUserByEmail($email: String!) {
    getSingleUserByEmail(email: $email) 
  }
` 

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword(
    $password: String!
    $userId: ID!
  ) {
    forgotPassword(
      password: $password
      userId: $userId
    ) 

  }
`