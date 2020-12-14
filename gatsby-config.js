module.exports = {
	pathPrefix: "/todo",
	siteMetadata: {
		title: `Todo App`,
		description: `Todo App from the future`,
		author: `KMA Badshah`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-preload-fonts`,
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
			resolve: `gatsby-plugin-layout`,
			options: {
				component: require.resolve(`./src/components/wrapper.js`),
			},
		},

		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true, // Print removed selectors and processed file names
				//develop: true, // Enable while using `gatsby develop`
			},
		},
	],
}
