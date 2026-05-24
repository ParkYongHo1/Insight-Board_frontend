import { useState, useEffect } from "react";
import { authClient } from "@/app/shared/api/axios/client";

export const useSlackConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await authClient.get("/api/user/slack/status");
        setIsConnected(res.data.connected);
      } catch {
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };
    void checkStatus();
  }, []);

  const handleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI ?? "",
    );
    window.location.href = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write,im:write&redirect_uri=${redirectUri}&user_scope=openid,email,profile`;
  };

  const handleDisconnect = async () => {
    await authClient.delete("/api/user/slack/disconnect");
    setIsConnected(false);
  };

  return { isConnected, isLoading, handleConnect, handleDisconnect };
};
