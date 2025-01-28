const { addNote, editNote, notes } = require("../src/notes");

// Vi tømmer notes, sørger for at lengden er 0
beforeEach(() => {
    while (notes.length > 0) {
        notes.pop();
    }
});

// Første test:
test("Legg til notat", () => {
    // Sender en tekst til funksjonen vi vil teste
    console.log("Lengden på notes: ", notes.length);
    addNote("Mariekjeks");
    console.log(
        "Lengden på notes etter at vi har sendt tekst dit: ",
        notes.length,
        "Teksten vi sendte: ",
        notes[0].text
    );
    // Forventer følgende resultater
    // 1. Lengden på arrayet vårt skal være 1 fordi det nå ligger ett element der
    expect(notes.length).toBe(1);
    // 2. id skal ha fått verdien 0 som er lendgen på arrayet før vi legger noe inn i det
    expect(notes[0].identifikator).toBe(0);
    // 3. Teksten vi sendte til funksjonen skal legges som verdi i text.
    expect(notes[0].text).toBe("Mariekjeks");
});
