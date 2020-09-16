import React from 'react'
import Layout from '../components/layout'
import { Card, CardSubtitle, CardBody, Badge } from 'reactstrap'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { slugify } from '../utils/utils'
import authors from '../utils/authors'

const details = ({data, pageContext}) => {
    console.log(data, pageContext)
    const post = data.markdownRemark.frontmatter
    const author = authors.find(a => a.name === post.author)
    return (
        <Layout pageTitle={post.title} postAuthor={author} authorImage={data.file.childImageSharp.fluid}>
            <SEO title={post.title} />
            <Card>
                <Img className='card-image-top' fluid={post.image.childImageSharp.fluid} />
                <CardBody>
                    <CardSubtitle>
                        <span className='text-info'>{post.date},</span>
                        <span className='text-info'> by {post.author}</span>
                    </CardSubtitle>
                    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html}} />
                    <ul>
                        {post.tags.map((tag, index) => (
                            <li key={index}>
                                <Link to ={`/tag/${slugify(tag)}`}>
                                    <Badge color="primary">{tag}</Badge>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        </Layout>
    )
}

export const detailsQuery = graphql`
    query blogPostBySlug($slug: String, $imageUrl: String) {
        markdownRemark(fields: {slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                author
                date(formatString: "MMM Do YYYY")
                tags
                image {
                    childImageSharp {
                        fluid(maxWidth: 700) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            fields {
                slug
            }
        }
        file(relativePath: { eq: $imageUrl}) {
            childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
        }
    }
`

export default details