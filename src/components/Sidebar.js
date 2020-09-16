import React from 'react'
import { Card, CardTitle, CardBody, CardText, FormGroup, Input } from 'reactstrap'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

export const sidebarQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 3) {
      edges {
        node {
          id 
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
              slug
          }
        }
      }
    }
  }
`

const Sidebar = ({author, authorImage}) => {

    return (
        <div>
            {author && (
                <Card>
                    <Img className='card-image-top' fluid={authorImage}/>
                    <CardBody>
                        <CardTitle className="text-center text-uppercase mb-3">{author.name}</CardTitle>
                        <CardText>{author.bio}</CardText>
                    </CardBody>
                    <div className="author-social-links text-center">
                        <ul>
                            <li>
                                <a href={author.facebook} target='_blank' rel='noopener noreferrer' className="facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                                </a>
                            </li>
                            <li>
                                <a href={author.twitter} target='_blank' rel='noopener noreferrer' className="twitter">
                                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                                </a>
                            </li>
                            <li>
                                <a href={author.linkedin} target='_blank' rel='noopener noreferrer' className="linkedin">
                                    <FontAwesomeIcon icon={['fab', 'linkedin']} />
                                </a>
                            </li>
                            <li>
                                <a href={author.github} target='_blank' rel='noopener noreferrer' className="github">
                                    <FontAwesomeIcon icon={['fab', 'github']} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </Card>
            )}
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
                                    <Link to={`/${node.node.fields.slug}`}>
                                        <Img className='card-image-top' alt="post thumbnail" fluid={node.node.frontmatter.image.childImageSharp.fluid}/>
                                    </Link>
                                    <CardBody>
                                        <CardTitle>
                                            <Link to={`/${node.node.fields.slug}`}>{node.node.frontmatter.title}</Link>
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