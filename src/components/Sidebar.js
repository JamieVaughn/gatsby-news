import React from 'react'
import { Card, CardTitle, CardBody, FormGroup, Input } from 'reactstrap'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const sidebarQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 3) {
      edges {
        node {
          id 
          frontmatter {
            title
            path
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

const Sidebar = props => {

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">
                        Newsletter
                    </CardTitle>
                    <form className='text-center'>
                        <FormGroup>
                            <Input type='email' name='email' placeholder='Your Email Address' />
                        </FormGroup>
                        <button className='btn btn-outline-success text-uppercase'>Subscribe!</button>
                    </form>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className='text-center text-uppercase'>
                        Advertisement
                    </CardTitle>
                    <img src="https://via.placeholder.com/320x200" alt="advert" style={{width: '100%'}} />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">Recent Posts</CardTitle>
                    <StaticQuery query={sidebarQuery} render={data => (
                        data.allMarkdownRemark.edges.map(node => {
                            return (
                                <Card key={node.node.id}>
                                    <Link to={node.node.frontmatter.path}>
                                        <Img className='card-image-top' alt="post thumbnail" fluid={node.node.frontmatter.image.childImageSharp.fluid}/>
                                    </Link>
                                    <CardBody>
                                        <CardTitle>
                                            <Link to={node.node.frontmatter.path}>{node.node.frontmatter.title}</Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            )
                        })
                    )} />
                </CardBody>
            </Card>
        </div>
    )
}

export default Sidebar