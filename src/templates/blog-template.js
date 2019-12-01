import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default magicalObject => {
  console.log("magicalObject!!", magicalObject)
  const { data, pageContext } = magicalObject
  const { isFirstPage, isLastPage, currentPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <div>
        <h1 style={{ display: "inlineBlock", borderBottom: "1px solid" }}>
          Gatsby blog
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>
              <Link to={`posts${node.fields.slug}`}>
                {node.frontmatter.title}
              </Link>
              <span style={{ color: "#bbb" }}> - {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}

        {/* { Pageination Links} */}
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            alignItems: "center",
            justifyContent: "space-around",
            maxWidth: 300,
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev Page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => {
            return (
              <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
                {index + 1}
              </Link>
            )
          })}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            date(formatString: "dddd, MMM Do YYYY")
            title
          }
          fields {
            slug
          }
          id
          excerpt(format: PLAIN, pruneLength: 15)
          timeToRead
        }
      }
    }
  }
`
