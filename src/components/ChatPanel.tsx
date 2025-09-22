import { useState } from "react";
import { Card, Input, List, Typography, Button, Space, Spin } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { http } from "../services/http";
import type { AskRequest, AskResponse } from "../types";

const { Text } = Typography;

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const question = q.trim();
    if (!question || loading) {
      return;
    }

    setQ("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);

    try {
      const { data } = await http.post<AskResponse>("/ask", {
        question,
      } as AskRequest);
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Ask your assistant">
      <List
        dataSource={messages}
        renderItem={(m) => (
          <List.Item style={{ alignItems: "flex-start" }}>
            <Space align="start">
              <Text strong>{m.role === "user" ? "You:" : "AI:"}</Text>
              {m.role === "assistant" ? (
                <div style={{ whiteSpace: "pre-wrap", maxWidth: 600 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <Text style={{ whiteSpace: "pre-wrap" }}>{m.text}</Text>
              )}
            </Space>
          </List.Item>
        )}
      />
      {loading ? (
        <div
          style={{
            paddingBottom: 16,
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Space direction="vertical" align="center">
            <Spin />
            <Text type="secondary">Waiting for response...</Text>
          </Space>
        </div>
      ) : null}
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="e.g., What’s my next meeting?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onPressEnter={send}
          disabled={loading}
        />
        <Button type="primary" onClick={send} loading={loading}>
          Send
        </Button>
      </Space.Compact>
    </Card>
  );
}
