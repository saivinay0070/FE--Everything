import ChatPanel from "./components/ChatPanel";
import Notifications from "./components/Notifications";

export default function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Notifications />
      <div style={{ marginTop: 24 }}>
        <ChatPanel />
      </div>
    </div>
  );
}
