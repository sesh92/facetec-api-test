import axios from "axios";

const { FACETEC_URL } = process.env;

export interface Enrollment3dResponse {
  scanResultBlob: string;
  success: boolean;
  wasProcessed: boolean;
}

export default async (
  body: Record<string, string>,
  externalDatabaseRefID: string,
  headers: Record<string, string>
) => {
  const enrollment3dResponse = await axios.post<Enrollment3dResponse>(
    `${FACETEC_URL}/enrollment-3d`,
    { ...body, externalDatabaseRefID },
    { headers }
  );

  return enrollment3dResponse.data;
};
