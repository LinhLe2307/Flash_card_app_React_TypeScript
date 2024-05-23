import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query findUsersByName($searchInput: String) {
    getUsers(searchInput: $searchInput) {
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
          name
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
  }
}
`

export const GET_COUNTRIES = gql`
  query {
    getCountries {
      name {
        common
      }
    }
  }
`

export const UPLOAD_IMAGE = gql`
mutation UploadImage($file: Upload!, $description: String!) {
  uploadImage(file: $file, description: $description) {
    url
  }
}
`;