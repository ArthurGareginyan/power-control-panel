// Power Control Panel API calls
document.addEventListener("DOMContentLoaded", function() {

    // Common function to handle fetch API
    async function fetchData(url, method) {
        try {
            let response = await fetch(url, {method: method});
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.statusText}`);
            }
            let data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`An error occurred: ${error}`);
        }
    }

    // Common function to update status message with styling
    function updateStatusMessage(message, type) {
        let prefix = type === 'status' ? '<span class="status-label">status:</span> ' : '<span class="error-label">Error:</span> ';
        document.getElementById("status-message").innerHTML = prefix + message;
    }

    // Power off
    document.getElementById("power-off").addEventListener("click", async function() {
        try {
            updateStatusMessage("Processing...", 'status');
            const data = await fetchData('/api/power/poweroff', 'POST');
            updateStatusMessage(`${data.status}`, 'status');
        } catch (error) {
            updateStatusMessage(`${error.message}`, 'error');
        }
    });

    // Restart
    document.getElementById("power-restart").addEventListener("click", async function() {
        try {
            updateStatusMessage("Processing...", 'status');
            const data = await fetchData('/api/power/restart', 'POST');
            updateStatusMessage(`${data.status}`, 'status');
        } catch (error) {
            updateStatusMessage(`${error.message}`, 'error');
        }
    });

    // Function to check the status
    async function checkStatus() {
        try {
            const data = await fetchData('/api/power/status', 'GET');
            updateStatusMessage(`${data.status}`, 'status');
        } catch (error) {
            updateStatusMessage(`${error.message}`, 'error');
        }
    }

    // Check the status when the page loads and refresh status every 5 seconds
    checkStatus(); // Check the status initially when the page loads
    setInterval(checkStatus, 3000); // Refresh status every 5 seconds

});
