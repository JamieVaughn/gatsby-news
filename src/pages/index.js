import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'

export const IndexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
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

const IndexPage = () => (
  <Layout pageTitle="Money Circuit">
    <SEO title="Home" keywords={['MMT', 'Monetary', 'Money', 'Cricut', 'Investing', 'Economics', 'Modern Monetary Theory', 'Money Circuit']}/>
      <StaticQuery query={IndexQuery} render={data=> {
        return (
          <div>
            {data.allMarkdownRemark.edges.map((data) => (
              <Post key={data.node.id} node={data.node} slug={data.node.fields.slug}/>
            ))}
          </div>
        )
      }} />
  </Layout>
)

export default IndexPage
