import { getSpell } from './bnet-api'

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const APIOptionsType = new GraphQLObjectType({
  name: 'APIOptions',
  description: 'API Options',
  fields: () => ({
    origin: {
      type: GraphQLString
    },
    locale: {
      type: GraphQLString
    },    
  })
})

// Spell Type
const SpellType = new GraphQLObjectType({
  name: 'Spell',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    icon: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    range: {
      type: GraphQLString
    },
    castTime: {
      type: GraphQLString
    },
    apiOptions: {
      type: APIOptionsType
    }
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    spell: {
      type: SpellType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        origin: {
          type: GraphQLString
        },
        locale: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {          
        return getSpell(args)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
