module.exports = {
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/kchoen\.github\.io\/ReminderApp\/.*/,
			handler: "networkFirst",
		},
	],
};
