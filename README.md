# Pongo
## About
Ponago is a yomichan/yomitan dictionary generator for Toki Pona!

This allows you to use the popup dictionary yomitan for toki pona.

## Use
1. Install yomitan (https://yomitan.wiki/)
2. Install the dictionary zip from the releases tab
3. Import into yomitan and enjoy!

Alternatively you can build the code yourself.

1. Clone the repo
2. `node ./index.js`
3. Import `./build/pongo.zip` into yomitan


## Sources
Words, definitions:
- http://tokipona.org/nimi_pu.txt
- http://tokipona.org/nimi_pi_pu_ala.txt

Phrases/compounds:
- http://tokipona.org/compounds.txt

## Notices
### Package.json
Ignore `package.json`'s information. I decided to leave it as default (except chaning ISC to MIT) simply because I do not like npm, but yomichan-dict-builder is on npm so my hand is forced.

### Known Issues
- Compound phrases do not work, this may be an issue with how yomitan is configured on my end
- My sources are very limited, they should do for 99% of cases but it would be nice to get some casual language and grammar sources too
