import { gql } from "apollo-boost"

const githubIssues = gql`
  query Issues($date: DateTime!, $total: Int = 50) {
    viewer {
      name
      issues(
        first: $total
        orderBy: { field: UPDATED_AT, direction: ASC }
        filterBy: { since: $date }
      ) {
        edges {
          node {
            id
            url
            repository {
              name
              url
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
            comments(first: $total) {
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