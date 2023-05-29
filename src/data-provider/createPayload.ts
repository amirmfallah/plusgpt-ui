import type { TSubmission } from `./types`;

export default function createPayload(submission: TSubmission) {
  const { conversation, message, endpointOption } = submission;
  const { conversationId } = conversation;
  const { endpoint } = endpointOption;

  const endpointUrlMap = {
    azureOpenAI: `${import.meta.env.VITE_SERVER_URL}/api/ask/azureOpenAI`,
    openAI: `${import.meta.env.VITE_SERVER_URL}/api/ask/openAI`,
    google: `${import.meta.env.VITE_SERVER_URL}/api/ask/google`,
    bingAI: `${import.meta.env.VITE_SERVER_URL}/api/ask/bingAI`,
    chatGPTBrowser: `${import.meta.env.VITE_SERVER_URL}/api/ask/chatGPTBrowser`
  };

  const server = endpointUrlMap[endpoint];

  let payload = {
    ...message,
    ...endpointOption,
    conversationId
  };

  return { server, payload };
}
