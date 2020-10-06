import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap'

import author from '../utils/authors'
import ManImage from '../images/man.jpg'
import WomanImage from '../images/woman.jpg'
import { slugify } from '../utils/utils'


const TeamPage = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Our Team" keywords={['gatsby', 'blog', 'react']}/>
    <Row className="mb-3">
      <div className="col-md-3">
        <img src={ManImage} style={{maxWidth: '100%'}} alt="Man profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: '100%'}}>
          <CardBody>
            <CardTitle>{author[0].name}</CardTitle>
            <CardText>{author[0].bio}</CardText>
            <Button className="text-uppercase" color="primary" href={`/author/${slugify(author[0].name)}`}>View Posts</Button>
          </CardBody>
        </Card>
      </div>
    </Row>
    <Row className="mb-3">
      <div className="col-md-3">
        <img src={WomanImage} style={{maxWidth: '100%'}} alt="Woman profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: '100%'}}>
          <CardBody>
            <CardTitle>{author[1].name}</CardTitle>
            <CardText>{author[1].bio}</CardText>
            <Button className="text-uppercase" color="primary" href={`/author/${slugify(author[1].name)}`}>View Posts</Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage
