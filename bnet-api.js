import blizzard from 'blizzard.js'

const DEFAUT_ORIGIN = 'us'
const DEFAUT_LOCALE = 'en_US'
const api = blizzard.initialize({ apikey: process.env.BNET_ID, origin: DEFAUT_ORIGIN, locale: DEFAUT_LOCALE });

export const getSpell = (args) => {
  return new Promise((resolve, reject) => {
    api.wow.spell(args).then(res => {
      const data = assignAPIOptions(res.data, args)      
      return resolve(data)
    }).catch(err => {
      return reject(err)
    })    
  })  
}

// TODO refactory
const assignAPIOptions = (data, args) => {
  const apiOptions = {
    origin: DEFAUT_ORIGIN,
    locale: DEFAUT_LOCALE,
  }

  if(args.origin) apiOptions.origin = args.origin  
  if(args.locale) apiOptions.locale = args.locale

  return Object.assign(data, {apiOptions})
}
