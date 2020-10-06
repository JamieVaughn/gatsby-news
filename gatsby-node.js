/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {slugify} = require('./src/utils/utils')
const path = require('path')
const authors = require('./src/utils/authors.js')
const _ = require('lodash')
const { template } = require('lodash')

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
    const templates = {
        details: path.resolve('src/templates/details.js'),
        tags: path.resolve('src/templates/tags.js'),
        tagPosts: path.resolve('src/templates/tagPost.js'),
        postList: path.resolve('src/templates/postList.js'),
        authorDetail: path.resolve('src/templates/authorDetail.js'),
    }
    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            author
                            tags
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
        //Create Detais page
        posts.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: templates.details,
                context: {
                    error: res.errors,
                    //Pass in slug for template to use to get post
                    slug: node.fields.slug,
                    // find author image url from authors.js and pass it to details component
                    imageUrl: authors.find(a => a.name === node.frontmatter.author).imageUrl
                }
            })
        })

        //Get all the tags
        let tags = []
        _.each(posts, edge => {
            if(_.get(edge, 'node.frontmatter.tags')) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
       let tagPostCounts = {}
       tags.forEach(tag => {
           tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
       })

       tags = _.uniq(tags)
       // Create Tags page
       createPage({
           path: `/tags`,
           component: templates.tags,
           context: {
               tags,
               tagPostCounts
           }
       })
       // creat tagPosts pages
       tags.forEach(tag => {
           createPage({
               path: `/tag/${slugify(tag)}`,
               component: templates.tagPosts,
               context: {
                   tag
               }
           })
       })

       const postsPerPage = 2
       const numberOfPages = Math.ceil(posts.length / postsPerPage)
       Array.from({length: numberOfPages}).forEach((_, index) => {
            const isFirstPage = index === 0
            const currentPage = index + 1

            if(isFirstPage) return

            createPage({
                path: `/page/${currentPage}`,
                component: templates.postList,
                context: {
                    limit: postsPerPage,
                    skip: index * postsPerPage,
                    currentPage,
                    numberOfPages
                }
            })
       })

       authors.forEach(author => {
           createPage({
               path: `/author/${slugify(author.name)}`,
               component: templates.authorDetail,
               context: {
                   authorName: author.name,
                   imageUrl: author.imageUrl
               }
           })
       })
    })
}