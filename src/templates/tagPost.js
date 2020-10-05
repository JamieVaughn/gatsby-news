import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/Post'

const tagPost = ({data, pageContext}) => {
    const {tag} = pageContext
    const { totalCount } = data.allMarkdownRemark
    const pageHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with ${tag}`

    return (
        <Layout pageTitle={pageHeader}>
            {data.allMarkdownRemark.edges.map(data => (
                <Post key={data.node.id} node={data.node} slug={data.node.fields.slug}/>
            ))}
        </Layout>
    )
}
export default tagPost

export const tagQuery = graphql`
    query($tag: String!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] }}}
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "MMM Do YYY")
                        author
                        tags
                        image {
                            childImageSharp {
                                fluid(maxWidth: 650, maxHeight: 370) {
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