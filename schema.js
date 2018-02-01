const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const spells = [{
    id: 1,
    name: "Word of Recall (OLD)",
    icon: "trade_engineering",
    description: "",
    powerCost: "10 Mana",
    castTime: "10 sec cast"
  },
  {
    id: 3,
    name: "Word of Mass Recall (OLD)",
    icon: "trade_engineering",
    description: "",
    powerCost: "10 Mana",
    castTime: "20 sec cast"
  },
  {
    id: 4,
    name: "Word of Recall Other",
    icon: "trade_engineering",
    description: "",
    powerCost: "10 Mana",
    castTime: "Instant"
  },
  {
    id: 5,
    name: "Death Touch",
    icon: "inv_misc_bone_humanskull_01",
    description: "Instantly Kills the target.  I hope you feel good about yourself now.....",
    range: "50,000 yd range",
    castTime: "Instant"
  },
  {
    id: 7,
    name: "Suicide",
    icon: "spell_shadow_lifedrain",
    description: "The caster commits suicide, instantly killing themself.",
    castTime: "Instant"
  }
]

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
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        for(let i = 0;i < spells.length;i++){
            if(spells[i].id === args.id){
                return spells[i];
            }
        }        
        return null
      }
    },
    spells: {
      type: new GraphQLList(SpellType),
      resolve(parentValue, args) {
        return spells
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
