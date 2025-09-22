import { useEffect, useState } from "react";
import { Card, List, Space, Typography, Tag, Spin } from "antd";
import { http } from "../services/http.ts";
import type { NotificationsResponse } from "../types.ts";

const { Title, Text } = Typography;

export default function Notifications() {
  const [data, setData] = useState<NotificationsResponse>({
    now: "",
    location: "",
    cards: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    http
      .get<NotificationsResponse>("/notifications")
      .then(({ data }) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Title level={4} style={{ marginBottom: 0 }}>
          Today: {data.now}
        </Title>
      </Card>

      <Card title="Notifications">
        <Spin spinning={loading} tip="Loading notifications...">
          <List
            dataSource={data.cards}
            renderItem={(c) => (
              <List.Item>
                <Space direction="vertical" size={0} style={{ width: "100%" }}>
                  <Text>
                    <Tag color="blue">{c.message}</Tag>
                  </Text>
                </Space>
              </List.Item>
            )}
          />
        </Spin>
      </Card>
    </Space>
  );
}
