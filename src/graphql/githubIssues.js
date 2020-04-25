import { gql } from "apollo-boost"

const githubIssues = gql`
  query Issues($total: Int = 50) {
    viewer {
      name
      issues(
        first: 100
        orderBy: { field: UPDATED_AT, direction: ASC }
        filterBy: { since: "2020-01-01T00:00:00.000Z" }
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