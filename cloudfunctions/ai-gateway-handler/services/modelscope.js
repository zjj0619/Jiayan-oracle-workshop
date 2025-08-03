const axios = require('axios');

const CHAT_API_URL = 'https://api-inference.modelscope.cn/v1/chat/completions';
const IMAGE_API_URL = 'https://api-inference.modelscope.cn/v1/images/generations';

/**
 * 调用 ModelScope AI 对话模型
 * @param {string} apiKey - ModelScope API 密钥
 * @param {string} model - 要调用的模型名称
 * @param {Array<object>} messages - 发送给模型的对话消息
 * @returns {Promise<string>} - AI 模型的回复内容
 */
async function callModelScope(apiKey, model, messages) {
  if (!apiKey || !model || !messages) {
    throw new Error('调用 ModelScope 服务所需参数不完整。');
  }

  try {
    const response = await axios.post(
      CHAT_API_URL,
      {
        model: model,
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error('ModelScope API 返回了无效的响应格式。');
    }
  } catch (error) {
    console.error('调用 ModelScope API 时出错:', error.response ? error.response.data : error.message);
    // 重新抛出错误，以便上层可以捕获
    throw new Error('调用 ModelScope API 失败。');
  }
}

/**
 * 调用 ModelScope 文生图模型
 * @param {string} apiKey - ModelScope API 密钥
 * @param {string} model - 要调用的模型名称
 * @param {string} prompt - 生成图片的提示词
 * @returns {Promise<string>} - 生成的图片 URL
 */
async function callTextToImageModel(apiKey, model, prompt) {
  if (!apiKey || !model || !prompt) {
    throw new Error('调用文生图服务所需参数不完整。');
  }

  try {
    const response = await axios.post(
      IMAGE_API_URL,
      {
        model: model,
        prompt: prompt,
        // n: 1, // 如果API支持，可以指定生成图片的数量
        // size: "1024*1024" // 如果API支持，可以指定图片尺寸
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (response.data && response.data.output && response.data.output.images && response.data.output.images.length > 0) {
      return response.data.output.images[0]; // 返回第一张图片的 URL
    } else {
      console.error('ModelScope 文生图 API 返回了无效的响应格式:', response.data);
      throw new Error('ModelScope 文生图 API 返回了无效的响应格式。');
    }
  } catch (error) {
    console.error('调用 ModelScope 文生图 API 时出错:', error.response ? error.response.data : error.message);
    throw new Error('调用 ModelScope 文生图 API 失败。');
  }
}

module.exports = {
  callModelScope,
  callTextToImageModel,
};