const path = require("path");
const Promise = require("bluebird");
const { each } = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                  tag
                  date(formatString: "YYYY-MM-DD")
                  original
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        // Create Index Page
        createPage({
          path: "/",
          component: path.resolve("posts/index.tsx"),
        });

        // Create blog posts pages
        const posts = result.data.allMarkdownRemark.edges;
        each(posts, post => {
          const {
            node: {
              fields: { slug },
            },
          } = post;

          createPage({
            path: slug,
            component: path.resolve("src-app/blog/templates/blog-post.tsx"),
            context: {
              slug,
            },
          });
        });
      }),
    );
  });
};

// Add custom url pathname for blog posts
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });

    // Creates new query'able field with name of 'slug'
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

// Add custom webpack config
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const config = getConfig();

  const newConfig = {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [...config.resolve.modules, "."],
    },
  };
  actions.replaceWebpackConfig(newConfig);
};
