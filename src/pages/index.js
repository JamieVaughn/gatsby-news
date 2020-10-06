import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'
import PaginationBar from '../components/paginationbar'

export const IndexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC}
      limit: 2
      ) {
      totalCount
      edges {
        node {
          id 
          frontmatter {
            title
            date(formatString: "MM DD YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

const IndexPage = () => {
  const postsPerPage = 2;
  let numberOfPages;
  return (
    <Layout pageTitle="Money Circuit">
      <SEO title="Home" keywords={['MMT', 'Monetary', 'Money', 'Cricut', 'Investing', 'Economics', 'Modern Monetary Theory', 'Money Circuit']}/>
        <StaticQuery query={IndexQuery} render={data=> {
          numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage)
          return (
            <div>
              {data.allMarkdownRemark.edges.map((data) => (
                <Post key={data.node.id} node={data.node} slug={data.node.fields.slug}/>
              ))}
              <PaginationBar currentPage={1} pageTotal={numberOfPages} />
            </div>
          )
        }} />
    </Layout>
  )
}

export default IndexPage
