import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const ArtCreationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError('请输入创作提示词。');
      return;
    }
    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await fetch('/api/v1/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`服务请求失败，状态码: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.content) {
        setImageUrl(result.content);
      } else {
        throw new Error('未能获取到图片地址。');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发生未知错误';
      console.error('生成图片时出错:', errorMessage);
      setError(`生成图片失败: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8"
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">甲骨工坊</CardTitle>
          <CardDescription>在这里输入你的灵感，创作独一无二的甲骨文风格艺术作品。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="prompt">创作提示词</Label>
            <Textarea
              id="prompt"
              placeholder="例如：一只金色的猫，带有商代青铜纹样"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
          </div>
          <Button onClick={handleGenerateImage} disabled={isLoading} className="w-full">
            {isLoading ? '正在创作中...' : '开始创作'}
          </Button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          {isLoading && (
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="text-muted-foreground">AI正在挥洒创意，请稍候...</p>
            </div>
          )}
          {imageUrl && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <img src={imageUrl} alt="生成的艺术作品" className="rounded-lg shadow-lg w-full" />
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ArtCreationPage;