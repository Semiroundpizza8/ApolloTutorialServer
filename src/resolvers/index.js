const resolvers = {
  Query: {
    // returns an array of tracks for populating homepage
    tracksForHome: (
      // Return val of resolver for parent
      parent,
      // Args provided by GraphQL
      args,
      // Object shared across all resolvers
      context,
      // Info about the operations execution state
      info) => {
      const { dataSources } = context;
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    }
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: "Done! Track_ID: " + id,
          track
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        }
      }
    }
  },
  Track: {
    author: ({ authorId }, _, { dataSources }, __) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    }
  }
}

module.exports = resolvers;