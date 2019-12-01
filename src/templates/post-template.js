import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data: post }) => {
  return (
    <Layout>
      <h1>{post.markdownRemark.frontmatter.title}</h1>
      <h4>
        {post.markdownRemark.timeToRead}{" "}
        {post.markdownRemark.timeToRead > 1 ? "minutes" : "minute"}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }}></div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`
