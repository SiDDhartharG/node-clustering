import express from "express";
const app = express();
const port = 3000; // You can choose any port you prefer

// Define your API endpoint
app.get('/', (req, res) => {
    // Introduce a 5-second delay using setTimeout
    setTimeout(() => {
        res.json({ message: 'Delayed API response after 5 seconds' });
    }, 5000); // 5000 milliseconds = 5 seconds
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
