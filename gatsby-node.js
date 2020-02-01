exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const {
    data: {
      allMdx: { edges: posts },
    },
  } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  posts.forEach(({ node }, i) => {
    const { slug } = node.frontmatter

    createPage({
      path: slug,
      component: require.resolve('./src/templates/post-template.js'),
      context: {
        slug,
      },
    })
  })
}
