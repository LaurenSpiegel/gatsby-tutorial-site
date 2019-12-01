import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

const Products = ({ data: { allContentfulProduct } }) => {
  return (
    <Layout>
      <div>
        {/* { Products List} */}
        {allContentfulProduct.edges.map(({ node }) => {
          return (
            <div key={node.id}>
              <h2>Garb Products</h2>
              <Link
                to={`/products/${node.slug}`}
                style={{ color: "#551a8b", textDecoration: "none" }}
              >
                <h3>
                  {node.name}{" "}
                  <span
                    style={{
                      color: "#f60",
                      fontSize: "1.2rem",
                      fontWeight: "300",
                    }}
                  >
                    ${node.price}
                  </span>
                </h3>
              </Link>
              <Img style={{ maxWidth: 400 }} fluid={node.image.fluid} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Products
