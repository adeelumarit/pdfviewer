export const validateCredentials = (username, password, callback) => {
    // let loginURL = process.env.API_BASE_URL
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username,
        password,
    });

    fetch("http://127.0.0.1:5000/auth", {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    })
        .then((response) => {
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(response.statusText || `HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
            callback(null, result); // Call the callback with the result on success
        })
        .catch((error) => {
            // Handle errors that are not HTTP errors
            let errorMessage;

            switch (error.message) {
                case 'Bad Request':
                    errorMessage = 'Bad Request: The server could not understand the request.';
                    break;
                case 'Unauthorized':
                    errorMessage = 'Unauthorized: Access is denied due to invalid credentials.';
                    break;
                case 'Forbidden':
                    errorMessage = 'Forbidden: You do not have the necessary permissions to access this resource.';
                    break;
                case 'Not Found':
                    errorMessage = 'Not Found: The requested resource could not be found.';
                    break;
                case 'Internal Server Error':
                    errorMessage = 'Internal Server Error: An error occurred on the server.';
                    break;
                case 'Service Unavailable':
                    errorMessage = 'Service Unavailable: The server is currently unable to handle the request.';
                    break;
                default:
                    errorMessage = `An error occurred: ${error.message}`;
            }

            callback(errorMessage, null); // Call the callback with the error message
        });
};
