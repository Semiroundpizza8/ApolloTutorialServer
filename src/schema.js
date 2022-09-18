const { gql } = require('apollo-server')



const typeDefs = gql`
    type Query {
        tracksForHome: [Track!]!
        track(id: ID!): Track
        module(id: ID!): Module 
    }

    type Mutation {
        incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
    }

    type IncrementTrackViewsResponse {
        code: Int!
        success: Boolean!
        message: String!
        track: Track
    }

    "A group of modules that teaches about a specific topic"
    type Track {
        id: ID!
        title: String!
        author: Author!
        thumbnail: String
        length: Int @deprecated (reason: "use durationInSeconds instead")
        durationInSeconds: Int
        modulesCount: Int
        description: String
        numberOfViews: Int
        modules: [Module!]!
    }

    type Module {
        id: ID!
        title: String!
        length: Int @deprecated (reason: "use durationInSeconds instead")
        durationInSeconds: Int
        content: String
        videoUrl: String
    }

    type Author {
        id: ID!
        name: String!
        photo: String
    }
`;

module.exports = typeDefs;