import React from 'react'
import {Link} from 'gatsby'
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap'


const Post = (props) => {
    console.log(props)
    const {title, author, path, date} = props.node.frontmatter
    const excerpt = props.node.excerpt
    return (
        <Card>
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