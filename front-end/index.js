console.table([
    {step: 1, description: "How to provide file input in the browser"},
    {step: 2, description: "How to send a file input over HTTP to a server"},
    {step: 3, description: "How to receive files sent over HTTP requests *Note: I'll use Node.js + Express"},
    {step: 4, description: "How and where to store file data"},
    {step: 5, description: "How and where to store file metadata and reference"},
]);

window.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.querySelector("#the-file-input");

    fileInput.addEventListener("change", (event) => {
        // fileInput === event.target
        const myReader = new FileReader();
        const theFileTheyChose = fileInput.files[0];

        console.log(theFileTheyChose);
        
        // Start reading in the file as a certain representation.
        myReader.readAsDataURL(theFileTheyChose);
        // readAsDataUrl: data url === base64 string

        // Listen for the event that fires when the reader has loaded the file.
        myReader.addEventListener("load", () => {
            // Expect the .result property to exist.
            document.querySelector("#preview-image").src = myReader.result;
            fetch("/base64-file-upload", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileData: myReader.result, meta: { name: theFileTheyChose.name } })
            });
        });
    });

});