import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import PaginationBar from '../components/paginationbar'
import { graphql } from 'gatsby'

const postList = (props) => {
    const posts = props.data.allMarkdownRemark.edges
    const { currentPage, numberOfPages } = props.pageContext

    return (
        <Layout pageTitle={`Page: ${currentPage}`}>
            {posts.map(data => (
                <Post key={data.node.id} node={data.node} slug={data.node.fields.slug} />
            ))}
            <PaginationBar currentPage={currentPage} pageTotal={numberOfPages} />
        </Layout>
    )
}

export const postListQuery = graphql`
    query postListQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC}
            limit: $limit
            skip: $skip
        ) {
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
                                fluid(maxWidth: 650, maxHeight: 371) {
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

export default postList