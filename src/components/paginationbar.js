import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PaginationBar = (props) => {
    const { currentPage, pageTotal } = props
    const isFirst = currentPage === 1
    const isLast = currentPage === pageTotal
    const previousPage = currentPage - 1 === 1 ? '/' : '/page/' + String(currentPage - 1)
    const nextPage = '/page/' + String(currentPage + 1)
    return (
        <Pagination aria-label="Page naviagtion example">
            <PaginationItem disabled={isFirst}>
                <PaginationLink previous href={isFirst ? '/' : previousPage}></PaginationLink>
            </PaginationItem>

            {Array.from(
                { length: pageTotal}, 
                (_, i) => (
                        <PaginationItem active={currentPage === i + 1} key={`page-number-${i + 1}`}>
                            <PaginationLink href={`/${i === 0 ? '' : 'page/'+(i + 1)}`}>{i + 1}</PaginationLink>
                        </PaginationItem>
                    )
            )}

            <PaginationItem disabled={isLast}>
                <PaginationLink next href={nextPage}/>
            </PaginationItem> 
        </Pagination>
    )
}

export default PaginationBar