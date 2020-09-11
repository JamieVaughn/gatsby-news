/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from 'reactstrap'

import Header from "./header"
import Sidebar from './Sidebar'
import Footer from './Footer'
import '../styles/index.scss'

const Layout = ({ children, pageTitle}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        id='content'
        className='container'
      >
        <h1>{pageTitle}</h1>
        <Row>
          <Col xs="12" md="9">
            {children}
          </Col>
          <Col md="3">
            <Sidebar />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
