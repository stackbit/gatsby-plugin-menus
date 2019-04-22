
const { loadDynamicMenusFromNodes } = require(`../dynamic-menu`)

const getNode = nodeId => {
    return {
        "1df5ee36-fe96-5088-b7e8-d24465d09040": {
            name: "index"
        },
        "c069bead-22b5-5d14-ba06-560bcc876a9b": {
            name: "page-1"
        },
        "7a1fcff7-5b93-5568-b9c3-f93b0928647e": {
            name: "page-2"
        }
    }[nodeId]
}

const remarkNodes = [
    {
      "id": "291a199c-8e35-5582-b55a-841132496ee3",
      "children": [],
      "parent": "1df5ee36-fe96-5088-b7e8-d24465d09040",
      "internal": {
        "content": "\nThis is home page\n\nGo to [page 1](/page-1)\n\nGo to [page 2](/page-1)",
        "type": "MarkdownRemark",
        "contentDigest": "8f6bdc90d4c2456b8170c57f541f00a4",
        "owner": "gatsby-transformer-remark",
        "fieldOwners": {
          "url": "default-site-plugin"
        }
      },
      "frontmatter": {
        "title": "Hello World",
        "menus": {
          "main": {
            "title": "Home",
            "weight": 1
          },
          "submenu": {
            "title": "Submenu Item 2"
          }
        },
        "_PARENT": "1df5ee36-fe96-5088-b7e8-d24465d09040"
      },
      "excerpt": "",
      "rawMarkdownBody": "\nThis is home page\n\nGo to [page 1](/page-1)\n\nGo to [page 2](/page-1)",
      "fields": {
        "url": "/"
      }
    },
    {
      "id": "e63376ed-7d76-5566-a5e4-98cb64b5479f",
      "children": [],
      "parent": "c069bead-22b5-5d14-ba06-560bcc876a9b",
      "internal": {
        "content": "\nThis is page 1\n\nGo [home](/)",
        "type": "MarkdownRemark",
        "contentDigest": "127badaedba8c682fa0eca470f86d471",
        "owner": "gatsby-transformer-remark",
        "fieldOwners": {
          "url": "default-site-plugin"
        }
      },
      "frontmatter": {
        "title": "Page 1 Title",
        "mood": ":)",
        "menus": {
          "main": {
            "title": "Page 1",
            "weight": 2
          },
          "footer": {
            "weight": 2
          }
        },
        "_PARENT": "c069bead-22b5-5d14-ba06-560bcc876a9b"
      },
      "excerpt": "",
      "rawMarkdownBody": "\nThis is page 1\n\nGo [home](/)",
      "fields": {
        "url": "/page-1/"
      }
    },
    {
      "id": "fac6dcf6-72a1-56f4-991a-a5d2d354f599",
      "children": [],
      "parent": "7a1fcff7-5b93-5568-b9c3-f93b0928647e",
      "internal": {
        "content": "\nThis is page 2\n\nGo [home](/)",
        "type": "MarkdownRemark",
        "contentDigest": "63afb62ebd0818308e185a8503fa8965",
        "owner": "gatsby-transformer-remark",
        "fieldOwners": {
          "url": "default-site-plugin"
        }
      },
      "frontmatter": {
        "title": "Page 2",
        "menus": {
          "main": {
            "title": "Page 2",
            "weight": 4
          },
          "footer": {
            "title": "Boom",
            "weight": 1
          }
        },
        "_PARENT": "7a1fcff7-5b93-5568-b9c3-f93b0928647e"
      },
      "excerpt": "",
      "rawMarkdownBody": "\nThis is page 2\n\nGo [home](/)",
      "fields": {
        "url": "/page-2/"
      }
    }
  ]

describe("dynamic menu loader", () => {

    it("correctly extracts menus from remark nodes", () => {

        const getNodesByType = jest.fn()
        getNodesByType.mockReturnValue(remarkNodes)

          expect(loadDynamicMenusFromNodes(`MarkdownRemark`, `frontmatter`, `fields.url`)({ getNodesByType, getNode })).toMatchSnapshot()
    })
})

exports.remarkNodes = remarkNodes
exports.getNode = getNode