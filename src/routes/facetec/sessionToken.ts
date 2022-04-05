import axios from "axios";

const { FACETEC_URL, FACETEC_DEVICE_KEY } = process.env;

interface SessionTokenResponse {
  error: boolean;
  sessionToken: string;
  success: boolean;
}

export default async (userAgent: string) => {
  const sessionTokenResponse = await axios.get<SessionTokenResponse>(
    `${FACETEC_URL}${"/session-token"}`,
    {
      headers: {
        "User-Agent": userAgent,
        "X-Device-Key": String(FACETEC_DEVICE_KEY),
      },
    }
  );

  return sessionTokenResponse.data;
};
