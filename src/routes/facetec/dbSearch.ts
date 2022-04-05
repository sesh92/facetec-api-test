import axios from "axios";

const { FACETEC_URL, FACETEC_GROUP_NAME = "" } = process.env;

interface DbSearchResponse {
  results: Array<{ identifier: string; matchLevel: number }>;
  success: boolean;
}

export default async (
  externalDatabaseRefID: string,
  groupNamePostfix: string,
  headers: Record<string, string>
) => {
  const dbEnrollResponse = await axios.post<DbSearchResponse>(
    `${FACETEC_URL}/3d-db/search`,
    {
      externalDatabaseRefID,
      groupName: FACETEC_GROUP_NAME + groupNamePostfix,
      minMatchLevel: 15,
    },
    { headers }
  );

  return dbEnrollResponse.data;
};
