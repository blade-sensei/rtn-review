import { gql } from "apollo-boost"

const githubIssues = gql`
  query {
    viewer {
      name
      issues(
        first: 5
        orderBy: { field: UPDATED_AT, direction: ASC }
        filterBy: { since: "2020-04-19T00:00:00Z" }
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