const { resolve } = require("path");

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const templatePath = "src-app/storybook/templates";
  const indexTemplate = resolve(`${templatePath}/storybook-index.tsx`);
  const groupTemplate = resolve(`${templatePath}/storybook-group.tsx`);

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              group
              module
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const storybooks = result.data.allMdx.edges;

  const storybookMap = storybooks.reduce((prev, { node }) => {
    const { group, module, title } = node.frontmatter;

    if (prev.has(group)) {
      const groupValue = prev.get(group);
      prev.set(group, {
        ...groupValue,
        [module]: groupValue[module] ? [...groupValue[module], title] : [title],
      });
    } else {
      prev.set(group, { [module]: [title] });
    }

    return prev;
  }, new Map());

  const groups = Array.from(storybookMap.keys());

  groups.map(group => {
    createPage({
      path: group,
      component: groupTemplate,
      context: {
        group,
        groups,
        modules: storybookMap.get(group),
      },
    });
  });

  createPage({
    path: "/",
    component: indexTemplate,
    context: {
      groups,
    },
  });
};
