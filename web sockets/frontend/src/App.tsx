import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  // eslint-disable-next-line
  const [messages, setMessages] = useState<string[]>([]);
  // eslint-disable-next-line
  const [latestMessage, setLatestMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };

    socket.onmessage = (event: MessageEvent) => {
      const messageData = event.data;
      console.log("message: ", messageData);
      console.log(`Message received: ${messageData}`);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setLatestMessage(messageData);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" placeholder="type something" />
        <button>Send</button>
      </form>
      <p>{latestMessage}</p>
      {messages.map((msg) => (
        <p>msg</p>
      ))}
    </div>
  );
}

export default App;
