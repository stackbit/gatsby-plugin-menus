
const { graphql } = require(`gatsby/graphql`)

const { onPreExtractQueries } = require(`../gatsby-node`)
const { loadDynamicMenusFromNodes } = require(`../dynamic-menu`)

const { remarkNodes, getNode } = require(`./dynamic-menu.test`)


const staticMenus = {
    main: [{
        identifier: `foo`,
        title: `Foo`,
        url: `#`
      }, {
        identifier: `submenu`,
        title: `Submenu`,
        url: `#`,
        weight: 3
      }, {
        identifier: `bar`,
        title: `Bar`,
        url: `#`
      }],
      submenu: [{
        title: `Submenu Item 1`,
        url: `#`
      }]
}

const dynamicMenus = {
    main: [{
        identifier: `home`,
        title: `Home`,
        weight: 1,
        url: `/`
    }, {
        identifier: `page2`,
        title: `Page 2`,
        weight: 4,
        url: `page-2`
    }, {
        identifier: `page1`,
        title: `Page 1`,
        weight: 2,
        url: `page-1`
    }],
    submenu: [{
        identifier: `sub2`,
        title: `Submenu Item 2`,
        weight: undefined,
        url: `/`
    }],
    footer: [{
        identifier: `footer-page1`,
        title: `Page 1 Title`,
        weight: 2,
        url: `page-1`
    }, {
        identifier: `boom`,
        title: `Boom`,
        weight: 1,
        url: `page-2`
    }]
}

describe("static items", () => {

    const createNode = jest.fn()
    const createParentChildLink = jest.fn()
    const actions = { createNode, createParentChildLink }
    const createNodeId = jest.fn()
    createNodeId.mockReturnValue(`uuid-from-gatsby`)
    const createContentDigest = jest.fn().mockReturnValue(`contentDigest`)
    const getNodesByType = jest.fn()
    getNodesByType.mockReturnValue([])
    const getNode = jest.fn()

    it("correctly creates nodes", () => {
        
        const pluginOptions = {
            menus: staticMenus,
            sourceUrlPath: 'fields.url'
        }

        onPreExtractQueries({ 
            createContentDigest, 
            createNodeId, 
            getNodesByType, 
            getNode, 
            actions 
        }, pluginOptions)

        expect(createNode.mock.calls).toMatchSnapshot()
    })
})

describe("dynamic items", () => {

    const createNode = jest.fn()
    const createParentChildLink = jest.fn()
    const actions = { createNode, createParentChildLink }
    const createNodeId = jest.fn()
    createNodeId.mockReturnValue(`uuid-from-gatsby`)
    const createContentDigest = jest.fn().mockReturnValue(`contentDigest`)
    const getNodesByType = jest.fn()
    getNodesByType.mockReturnValue([])
    const getNode = jest.fn()

    it("correctly creates nodes", () => {
        
        const menusLoader = jest.fn()
        menusLoader.mockReturnValue(staticMenus)

        const pluginOptions = {
            menusLoader: menusLoader,
            sourceUrlPath: 'fields.url'
        }

        onPreExtractQueries({ 
            createContentDigest, 
            createNodeId, 
            getNodesByType, 
            getNode, 
            actions 
        }, pluginOptions)

        expect(createNode.mock.calls).toMatchSnapshot()
    })
})

describe("menu merging", () => {

    const createNode = jest.fn()
    const createParentChildLink = jest.fn()
    const actions = { createNode, createParentChildLink }
    const createNodeId = jest.fn()
    createNodeId.mockReturnValue(`uuid-from-gatsby`)
    const createContentDigest = jest.fn().mockReturnValue(`contentDigest`)
    const getNodesByType = jest.fn()
    getNodesByType.mockReturnValue([])

    const reporter = {
        panicOnBuild: jest.fn()
    }

    it("correctly creates nodes", () => {
        const getNode = jest.fn()
        const menusLoader = jest.fn()
        menusLoader.mockReturnValue(dynamicMenus)
    
        const pluginOptions = {
            menusLoader: menusLoader,
            menus: staticMenus,
            sourceUrlPath: 'fields.url'
        }
    
        onPreExtractQueries({ 
            createContentDigest, 
            createNodeId, 
            getNodesByType, 
            getNode, 
            actions 
        }, pluginOptions)

        expect(createNode.mock.calls).toMatchSnapshot()
        expect(reporter.panicOnBuild).not.toBeCalled()
    })

    it("correctly handles end-to-end scenario", () => {
        const getNodesByType = jest.fn()
        getNodesByType.mockReturnValue(remarkNodes)

        const menusLoader = jest.fn()
        menusLoader.mockReturnValue(loadDynamicMenusFromNodes(`MarkdownRemark`, `frontmatter`, `fields.url`)({ getNodesByType, getNode }))
    
        const pluginOptions = {
            menusLoader: menusLoader,
            menus: staticMenus,
            sourceUrlPath: 'fields.url'
        }
    
        onPreExtractQueries({ 
            createContentDigest, 
            createNodeId, 
            getNodesByType, 
            getNode, 
            actions 
        }, pluginOptions)

        expect(createNode.mock.calls).toMatchSnapshot()
        expect(reporter.panicOnBuild).not.toBeCalled()
    })

    it("correctly detects duplicate ids", () => {

        const getNode = jest.fn()
        const menusLoader = jest.fn()
        menusLoader.mockReturnValue(staticMenus)
    
        const pluginOptions = {
            menusLoader: menusLoader,
            menus: staticMenus,
            sourceUrlPath: 'fields.url'
        }
    
        onPreExtractQueries({ 
            createContentDigest, 
            createNodeId, 
            getNodesByType, 
            getNode, 
            reporter,
            actions 
        }, pluginOptions)

        expect(reporter.panicOnBuild).toBeCalled()
    })
})