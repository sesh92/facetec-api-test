import axios from "axios";

const { FACETEC_URL, FACETEC_GROUP_NAME = "" } = process.env;

interface DbEnrollResponse {
  success: boolean;
}

export default async (
  externalDatabaseRefID: string,
  groupNamePostfix: string,
  headers: Record<string, string>
) => {
  const dbSearchResponse = await axios.post<DbEnrollResponse>(
    `${FACETEC_URL}/3d-db/enroll`,
    {
      externalDatabaseRefID,
      groupName: FACETEC_GROUP_NAME + groupNamePostfix,
      minMatchLevel: 15,
    },
    { headers }
  );

  return dbSearchResponse.data;
};
