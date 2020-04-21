import { gql } from "apollo-boost"

const githubIssues = gql`
  query Issues($date: DateTime!) {
    viewer {
      name
      issues(
        first: 5
        orderBy: { field: UPDATED_AT, direction: ASC }
        filterBy: { since: $date }
      ) {
        edges {
          node {
            id
            url
            repository {
              name
            }
            labels(first: 4) {
              edges {
                node {
                  name
                  color
                }
              }
            }
            number
            title
            createdAt
            updatedAt
            state
            comments(first: 10) {
              edges {
                node {
                  id
                  url
                  body
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    }
  }
`
export { githubIssues };