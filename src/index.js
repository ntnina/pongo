const { Dictionary, DictionaryIndex, TermEntry } = require("yomichan-dict-builder");

async function tokiponaorg() {
    // Congregate sources
    let raw = "";

    const nimi_pu = await fetch("http://tokipona.org/nimi_pu.txt");
    raw += await nimi_pu.text();

    const nimi_pi_pu_ala = await fetch("https://tokipona.org/nimi_pi_pu_ala.txt");
    raw += await nimi_pi_pu_ala.text();

    const compounds = await fetch("http://tokipona.org/compounds.txt");
    raw += await compounds.text();

    // Parser
    let terms = []
    const lines = raw.split('\r\n');

    for (line of lines) {                       // Each line contains a full entry
        if (line.charAt(0) === '#' ||           // Filter out comments
            line.charAt(0) === '') {            // Filter out empty lines
            continue;
        }

        // Splitting the term from the list of definitions
        const term_def = line.split(": [");
        const term = term_def[0];

        // Splitting definition list into a list of (word, popularity) pairs
        const defs = term_def[1].slice(0, -1)   // Remove trailing "]"
            .split(", ")                        // Separate each pair from each other
            .map(e => e.split(' '))             // For each pair, split them into [word, popularity]
            .sort((a, b) => b[1] - a[1]);       // Sort by popularity

        // Adding to dictionary
        terms.push(new TermEntry(term) // TODO: sitelen pona
            .setReading(term)
            .addDetailedDefinitions( defs.map(t => t[0]) )
            .build());
    }

    console.log(terms);

    return terms;
}


// Main
(async () => {
    // Init dictionary
    const dictionary = new Dictionary({
        fileName: "pongo.zip",
    });

    // Create index information
    const index = new DictionaryIndex()
        .setTitle("Pongo")
        .setRevision("1.0")
        .setAuthor("jan Nina (󱤾󱤌󱤿󱤃)")
        .setDescription("A dictionary for toki pona. Includes words, phrases, compounds, and sitelen pona!")
        .setAttribution("http://tokipona.org/compounds.txt\nhttp://tokipona.org/nimi_pu.txt\nhttp://tokipona.org/nimi_pi_pu_ala.txt")
        .setUrl("https://github.com/ntnina/pongo")
        .build();

    await dictionary.setIndex(index);

    // Add terms
    const tpo_terms = await tokiponaorg();

    let terms = [...tpo_terms];

    for (term of terms) {
        await dictionary.addTerm(term);
    }

    // Build dictionary
    const stats = await dictionary.export("./build");
    console.table(stats);
})();
