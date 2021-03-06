// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    const posts = addCollection("BlogPost");
    const tags = addCollection("Tag");
    posts.addReference("tags", "Tag");
    const listOfTags = [
      {
        id: "story",
        shortTitle: "story",
        title: "Stories I wrote!"
      },
      {
        id: "creative",
        shortTitle: "creative",
        title: "Creative work"
      }
    ];
    for (const tag of listOfTags) {
      tags.addNode(tag);
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
