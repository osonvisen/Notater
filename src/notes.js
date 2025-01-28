const notes = [];

// Funksjon for å opprette grensesnittet
function setupUI() {
    const container = document.createElement("div");
    container.className = "container";

    // Overskrift
    const heading = document.createElement("h1");
    heading.textContent = "Notater";
    container.appendChild(heading);

    // Tekstområde for å legge notatene vi lager
    const noteInput = document.createElement("textarea");
    noteInput.id = "note-input";
    noteInput.placeholder = "Skriv et nytt notat...";
    container.appendChild(noteInput);

    // Legg til-knapp
    const addNoteButton = document.createElement("button");
    addNoteButton.textContent = "Legg til notat";
    addNoteButton.addEventListener("click", () => {
        const text = noteInput.value.trim();
        if (text) {
            addNote(text);
            noteInput.value = "";
            renderNotes();
        } else {
            alert("Notatet kan ikke være tomt!");
        }
    });
    container.appendChild(addNoteButton);

    // Container for å vise alle notater
    const notesContainer = document.createElement("div");
    notesContainer.id = "notes-container";
    container.appendChild(notesContainer);

    document.body.appendChild(container);
}

// Funksjon for å legge til et notat
function addNote(text) {
    const note = {
        identifikator: notes.length,
        text,
    };
    notes.push(note);
}

// Funksjon for å redigere et notat
function editNote(id, newText) {
    const note = notes.find((note) => note.id === id); // Finn notatet med riktig ID
    if (!note) {
        throw new Error("Notat med gitt ID finnes ikke");
    }

    // Hvis newText ikke er definert, bruk prompt
    if (!newText) {
        newText = prompt("Rediger notatet:", note.text); // Be brukeren om ny tekst
    }

    if (!newText || typeof newText !== "string") {
        throw new Error("Ny tekst må være en gyldig streng");
    }

    note.text = newText; // Oppdater teksten
    return note; // Returner det oppdaterte notatet
}

// Funksjon for å fjerne et notat
function removeNote(id) {
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        renderNotes();
    }
}

// Funksjon for å vise notater
function renderNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = ""; // Tøm containeren

    notes.forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const noteText = document.createElement("span");
        noteText.textContent = note.text;

        const editButton = document.createElement("button");
        editButton.textContent = "Rediger";
        editButton.addEventListener("click", () => editNote(note.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Slett";
        deleteButton.addEventListener("click", () => removeNote(note.id));

        noteDiv.append(noteText, editButton, deleteButton);
        notesContainer.appendChild(noteDiv);
    });
}

// Start applikasjonen
setupUI();

module.exports = { addNote, editNote, notes };
// editNote, removeNote,
