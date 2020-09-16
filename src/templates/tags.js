import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Badge, Button } from 'reactstrap'
import { slugify } from '../utils/utils'

const Tags = ({pageContext}) => {
    const { tags, tagPostCounts } = pageContext
    return (
        <Layout pageTitle="All Tags">
            <SEO title="All tags" keywords={['tags', 'topics']} />
            <ul className='taglist'>
                {tags.map(tag => (
                    <li key={tag} className='taglist-item'>
                        <Button color='primary' href={`/tag/${slugify(tag)}`}>
                            {tag}
                            <Badge color='light'>{tagPostCounts[tag]}</Badge>
                        </Button>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default Tags
