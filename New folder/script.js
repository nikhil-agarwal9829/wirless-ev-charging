const socket = new WebSocket("wss://fbcf-122-187-117-178.ngrok-free.app ");  // Replace with your actual ngrok URL

socket.onopen = () => {
    console.log("✅ Connected to WebSocket server");
};

socket.onmessage = (event) => {
    console.log("📩 Received from server:", event.data);
};

socket.onerror = (error) => {
    console.error("❌ WebSocket Error:", error);
};

socket.onclose = () => {
    console.log("⚠ WebSocket connection closed");
};