import { useState } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export const useAIChat = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (prompt: string, imageUrl?: string | null) => {
    if (!prompt.trim() && !imageUrl) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt || '请解读这张甲骨文图片',
      timestamp: new Date(),
      imageUrl: imageUrl || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 指向已部署的云函数 URL
      const endpoint = 'https://jiaguwen1-3gsjw2829a8d0ba1-1367886203.ap-shanghai.app.tcloudbase.com/ai-gateway-handler';
      const body = { prompt: prompt };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('AI 服务响应失败');
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        // 从后端响应中获取 answer 字段
        content: data.answer || '抱歉，我暂时无法回答这个问题。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error("AI 请求失败:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '抱歉，连接AI服务时遇到问题，请稍后再试。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage, setMessages };
};