const tcb = require('@cloudbase/node-sdk');
const Joi = require('joi');
const { callModelScope, callTextToImageModel } = require('./services/modelscope');
const { PROMPTS } = require('./prompts.config');

const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});

// 定义输入的验证 schema
const qaSchema = Joi.object({
  prompt: Joi.string().required(),
});

const imageToTextSchema = Joi.object({
  prompt: Joi.string().optional(),
  imageUrl: Joi.string().uri().required(),
});

const textToImageSchema = Joi.object({
  prompt: Joi.string().required(),
});

exports.main = async (event, context) => {
  const { path, httpMethod, body } = event;

  if (httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const modelScopeApiKey = process.env.MODELSCOPE_API_KEY;
  if (!modelScopeApiKey) {
    console.error('ModelScope API Key not configured.');
    return { statusCode: 500, body: 'AI服务未正确配置' };
  }

  try {
    const requestBody = JSON.parse(body);
    let model, messages, schema, responseData;

    switch (path) {
      case '/api/v1/qa':
        schema = qaSchema;
        model = 'zhipu_glm-4.5-turbo';
        const { error: qaError } = schema.validate(requestBody);
        if (qaError) {
          return { statusCode: 400, body: `输入无效: ${qaError.details[0].message}` };
        }
        messages = [
          { role: 'system', content: PROMPTS.qa },
          { role: 'user', content: requestBody.prompt },
        ];
        responseData = await callModelScope(modelScopeApiKey, model, messages);
        break;

      case '/api/v1/image-to-text':
        schema = imageToTextSchema;
        model = 'qwen-vl-chat-v1';
        const { error: img2txtError } = schema.validate(requestBody);
        if (img2txtError) {
          return { statusCode: 400, body: `输入无效: ${img2txtError.details[0].message}` };
        }
        messages = [
          { role: 'system', content: PROMPTS.imageToText },
          {
            role: 'user',
            content: [
              { type: 'text', text: requestBody.prompt || '请详细解读这张图片中的甲骨文。' },
              { type: 'image_url', image_url: { url: requestBody.imageUrl } },
            ],
          },
        ];
        responseData = await callModelScope(modelScopeApiKey, model, messages);
        break;

      case '/api/v1/text-to-image':
        schema = textToImageSchema;
        model = 'MusePublic/489_ckpt_FLUX_1';
        const { error: txt2imgError } = schema.validate(requestBody);
        if (txt2imgError) {
          return { statusCode: 400, body: `输入无效: ${txt2imgError.details[0].message}` };
        }
        // 对于文生图，我们直接将图片URL作为响应内容
        responseData = await callTextToImageModel(modelScopeApiKey, model, requestBody.prompt);
        break;

      default:
        return { statusCode: 404, body: 'API route not found.' };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ content: responseData }),
    };
  } catch (error) {
    console.error(`处理AI请求时发生错误 (路径: ${path}):`, error.message, '请求体:', body);
    return {
      statusCode: 500,
      body: '处理AI请求失败',
    };
  }
};