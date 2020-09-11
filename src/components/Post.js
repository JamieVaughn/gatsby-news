import React from 'react'
import {Link} from 'gatsby'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Badge} from 'reactstrap'
import Img from 'gatsby-image'
import { slugify } from '../utils/utils'

const Post = (props) => {
    const {title, author, date, image, tags} = props.node.frontmatter
    const excerpt = props.node.excerpt
    const fluid = image.childImageSharp.fluid
    const slug = props.node.fields.slug
    return (
        <Card>
            <Link to={slug}>
                <Img className='card-image-top' fluid={fluid} />
            </Link>
            <CardBody>
                <CardTitle>
                    <Link to={slug}>{title}</Link>
                </CardTitle>
                <CardSubtitle>
                    <span className='text-info'>{date} </span> by 
                    <span className='text-info'> {author}</span>
                </CardSubtitle>
                <CardText>
                    {excerpt}
                </CardText>
                <ul className='post-tags'>
                    {tags.map( (tag, index) => (
                        <li key={index}>
                            <Link to={`/tag/${slugify(tag)}`}>
                                <Badge color='primary' className='text-uppercase'>{tag}</Badge>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link to={slug} className='btn btn-outline-primary float-right'>Read More</Link>
            </CardBody>
        </Card>
    )
}

export default Post