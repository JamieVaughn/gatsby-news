import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'
import { node } from "prop-types"
import { Row, Col} from 'reactstrap'

const IndexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id 
          frontmatter{
            title
            date(formatString: "MM DD YYYY")
            author
            path
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['MMT', 'Monetary', 'Money', 'Cricut', 'Investing', 'Economics', 'Modern Monetary Theory', 'Money Circuit']}/>
    <h1>Home Page</h1>
    <Row>
      <Col xs="12" md="9">
      <StaticQuery query={IndexQuery} render={data=> {
        return (
          <div>
            {data.allMarkdownRemark.edges.map((data) => (
              <Post key={data.node.id} node={data.node}/>
            ))}
          </div>
        )
      }} />
      </Col>
      <Col md="3" style={{background: '#ddd'}}>
        Sidebar
      </Col>
    </Row>
  </Layout>
)

export default IndexPage
