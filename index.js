// Replace 'YOUR_API_KEY' with the actual API key
const apiKey = 'VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM';
const apiUrl = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud'; // Replace with the actual API endpoint

function generateComic() {
    // Fetch input values from the form
    const panels = [];
    for (let i = 1; i <= 10; i++) {
        const panelText = document.getElementById(`panel${i}`).value;
        panels.push(panelText);
        console.log(panelText);
    }

    // Prepare data for API request
    const requestData = {
        inputs: panels.join("\n"), // Concatenate the panels with newline characters
    };

    // Send data to the API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'image/png',
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
    })
    .then(imageBlob => {
        // Display generated comic panels
        displayComic(imageBlob);
    })
    .catch(error => {
        console.error('API Request Error:', error);
        // Update UI to display an error message to the user
        alert('An error occurred. Please try again.');
    });
}

function displayComic(imageBlob) {
    // Display the generated comic panel in the designated area
    const comicDisplay = document.getElementById('comicDisplay');
    comicDisplay.innerHTML = '';

    const panelElement = document.createElement('div');
    panelElement.className = 'comic-panel';
    const imageUrl = URL.createObjectURL(imageBlob);
    panelElement.innerHTML = `<img src="${imageUrl}" alt="Generated Comic Panel">`;
    comicDisplay.appendChild(panelElement);
}
