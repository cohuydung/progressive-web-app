import { gql } from "@apollo/client";

export const LAUCHES_PAST_QUERY = gql`
  query launchesPast($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      details
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      links {
        article_link
        flickr_images
        mission_patch_small
      }
      rocket {
        rocket_name
      }
    }
  }
`;

export const LAUNCH_PAST_QUERY = gql`
  query launchesPast($id: ID!) {
    launchesPast(find: { id: $id }) {
      id
      details
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      links {
        article_link
        flickr_images
        mission_patch_small
      }
      rocket {
        rocket_name
      }
    }
  }
`;
