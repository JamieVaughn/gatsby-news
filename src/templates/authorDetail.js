import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import { graphql } from 'gatsby'
import authors from '../utils/authors'

export const authorQuery = graphql`
    query($authorName: String!, $imageUrl: String!) {
        allMarkdownRemark (
            sort: {fields: [frontmatter___date], order: DESC}
            filter: { frontmatter: { author: {eq: $authorName}}}
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM Do YYYY")
                        author
                        tags
                        image {
                            childImageSharp {
                                fluid(maxWidth: 650) {
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
        file(relativePath: { eq: $imageUrl }) {
            childImageSharp {
                fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

const authorDetail = (props) => {
    const {data, pageContext} = props
    const { totalCount } = data.allMarkdownRemark
    const author = authors.find(a => a.name === pageContext.authorName)
    const pageHeader = `${totalCount} Posts by ${pageContext.authorName}`
    return (
        <Layout pageTitle={pageHeader} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
            {data.allMarkdownRemark.edges.map(data => (
                <Post key={data.node.id} node={data.node} slug={data.node.fields.slug} />
            ))}
        </Layout>
    )
}

export default authorDetail