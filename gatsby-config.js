module.exports = {
  // pathPrefix: "/todo",
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-preload-fonts`,
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     google: {
    //       families: [`Pacifico`, `Almendra`, `Aleo`],
    //     },
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`todoer`],
        // singleTypes: [`home-page`, `contact`],
        loginData: {
          identifier: "adnan@badshah.com",
          password: "adnanbadshah",
        },
      },
    },

    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/wrapper.js`),
      },
    },

    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
      },
    },

    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`autoprefixer`).process(`./src/styles/css/index.css`),
        ],
      },
    },
  ],
};
