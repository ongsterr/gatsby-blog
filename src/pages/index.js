import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/Layout'
import PostList from '../components/PostList'

const getPosts = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            slug
            author
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            date(formatString: "Do MMM YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default () => {
  const {
    allMdx: { edges },
  } = useStaticQuery(getPosts)

  return (
    <Layout>
      <PostList posts={edges} />
    </Layout>
  )
}
