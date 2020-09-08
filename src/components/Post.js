import React from 'react'
import {Link} from 'gatsby'
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap'
import Img from 'gatsby-image'


const Post = (props) => {
    console.log(props)
    const {title, author, path, date, image} = props.node.frontmatter
    const excerpt = props.node.excerpt
    const fluid = image.childImageSharp.fluid
    return (
        <Card>
            <Link to={path}>
                <Img className='card-image-top' fluid={fluid} />
            </Link>
            <CardBody>
                <CardTitle>
                    <Link to={path}>{title}</Link>
                </CardTitle>
                <CardSubtitle>
                    <span className='text-info'>{date} </span> by 
                    <span className='text-info'> {author}</span>
                </CardSubtitle>
                <CardText>
                    {excerpt}
                </CardText>
                <Link to={path} className='btn btn-outline-primary float-right'>Read More</Link>
            </CardBody>
        </Card>
    )
}

export default Post