import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import {
  LAUCHES_PAST_QUERY,
  LAUNCH_PAST_QUERY,
} from "../../../shared/graphql/queries";
import TopBar from "../../../shared/components/TopBar";
import Spinner from "../../../shared/components/Spinner";
import Launch from "../../../shared/components/Launch";

const Content = styled.div`
  height: 100%;
  padding: 50px;
  min-height: 100vh;
  display: fixed;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-image: url("https://wallpaperaccess.com/full/17520.jpg");
  background-attachment: fixed;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const getDetail = (id) => {
  console.log(1111, id);
  if (!id) {
    return <Spinner />;
  }

  //   const { loading, error, data, fetchMore } = useQuery(LAUNCH_PAST_QUERY, {
  //     variables: { id: id },
  //   });

  const { loading, error, data, fetchMore } = useQuery(LAUCHES_PAST_QUERY, {
    variables: { limit: 999, offset: 0 },
  });

  if (error) {
    return <Spinner />;
  }
  if (loading) {
    return <Spinner />;
  }
  const { launchesPast } = data;
  return (
    <>
      {[...launchesPast]
        .filter((rocket) => rocket.id === id)
        .map((rocket) => {
          const {
            id,
            mission_name,
            links: { mission_patch_small },
            rocket: { rocket_name },
          } = rocket;
          return (
            <Launch
              key={id}
              rocket={rocket}
              imgSrc={mission_patch_small}
              rocketName={rocket_name}
              missonName={mission_name}
              detail={true}
            />
          );
        })}
    </>
  );
};

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <Wrapper>
        <TopBar />
        <Content>{getDetail(id)}</Content>
      </Wrapper>
    </>
  );
};
export default Detail;
