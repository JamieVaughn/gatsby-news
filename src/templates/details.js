import React from 'react'
import Layout from '../components/layout'
import { Card, CardSubtitle, CardBody, Badge } from 'reactstrap'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { slugify } from '../utils/utils'
import authors from '../utils/authors'
import { DiscussionEmbed } from 'disqus-react'
import GitHubButton from 'react-github-btn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

const details = ({data, pageContext}) => {
    console.log(data, pageContext)
    const post = data.markdownRemark.frontmatter
    const author = authors.find(a => a.name === post.author)
    const baseUrl = `https://graphicules.com/`
    const disqusConfig = {
        identifier: 'graphicules' + data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug
    }
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
            <h3 className="text-center">Share this post</h3>
            <div className="text-center social-share-links">
                <ul>
                    <li>
                        <a href={`https://wwww.facebook.com/sharer/sharer.php?u=${baseUrl}${pageContext.slug}`} className="facebook" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={['fab', 'facebook']} className="display-4"/>
                        </a>
                    </li>
                    <li>
                        <a href={`https://twitter.com/share?url=${baseUrl}${pageContext.slug}&text=${post.title}&via=${author.twitter}`} target='_blank' rel='noopener noreferrer' className="twitter">
                            <FontAwesomeIcon icon={['fab', 'twitter']} className="display-4"/>
                        </a>
                    </li>
                    <li>
                        <a href={`https://www.linkedin.com/shareArticle?url=${baseUrl}${pageContext.slug}`} target='_blank' rel='noopener noreferrer' className="linkedin">
                            <FontAwesomeIcon icon={['fab', 'linkedin']} className="display-4"/>
                        </a>
                    </li>
                    <li>
                        <GitHubButton href="https://github.com/JamieVaughn/gatsby-news" data-size="large" data-show-count="true" aria-label="Star JamieVaughn/gatsby-news on GitHub">Star</GitHubButton>
                    </li>
                </ul>
            </div>
            <DiscussionEmbed shortname={'graphicules'} config={disqusConfig} />
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