const { readYaml } = require('@favware/yarmlreader');
// supports default import for ES6: import readYaml from '@favware/yarmlreader'

readYaml('/path/to/some/yaml/file');
// => JavaScript object with the keys from the yaml
// => Using the YAML file as shown here procudes the following JSON:

/**
 {
    Bulbasaur:
    {
        types: [ 'Grass', 'Poison' ],
        genderRatio: { M: 0.875, F: 0.125 },
        baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },
        abilities: { '0': 'Overgrow', H: 'Chlorophyll' },
        heightm: 0.7,
        weightkg: 6.9,
        color: 'Green',
        evos: [ 'ivysaur' ],
        eggGroups: [ 'Monster', 'Grass' ]
    }
  }
 */