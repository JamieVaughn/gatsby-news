/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {slugify} = require('./src/utils/utils')
const path = require('path')
const authors = require('./src/utils/authors.js')

exports.onCreateNode = ({node, actions}) => {
    const { createNodeField } = actions
    if(node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle
        })
    }
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const detailsTemplate = path.resolve('src/templates/details.js')
    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            author
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `).then(res => {
        if(res.errors) return Promise.reject(res.errors)

        const posts = res.data.allMarkdownRemark.edges

        posts.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: detailsTemplate,
                context: {
                    error: res.errors,
                    //Pass in slug for template to use to get post
                    slug: node.fields.slug,
                    // find author image url from authors.js and pass it to details component
                    imageUrl: authors.find(a => a.name === node.frontmatter.author).imageUrl
                }
            })
        })
    })
}