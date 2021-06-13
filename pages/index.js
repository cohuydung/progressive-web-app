import Head from "next/head";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import Launch from "../shared/components/Launch";
import Spinner from "../shared/components/Spinner";
import { LAUCHES_PAST_QUERY } from "../shared/graphql/queries";
import TopBar from "../shared/components/TopBar";

const Content = styled.div`
  /* width: 100%; */
  height: 100%;
  padding: 50px;
  min-height: 100vh;
  /* background: #fafafa; */
  display: fixed;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-image: url("https://wallpaperaccess.com/full/17520.jpg");
  background-attachment: fixed;
  /* flex-direction: column; */
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

let offset = 1;

const launches = () => {
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const { loading, error, data, fetchMore } = useQuery(LAUCHES_PAST_QUERY, {
    variables: { limit: 12, offset: 0 },
  });

  useEffect(() => {
    let isMounted = true;
    const fetchMoreData = async () => {
      try {
        await fetchMore({
          variables: {
            limit: 3,
            offset: offset * 12,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!isMounted) return;
            setHasMore(!!fetchMoreResult.launchesPast.length);
            return {
              ...prev,
              launchesPast: [
                ...prev.launchesPast,
                ...fetchMoreResult.launchesPast,
              ],
            };
          },
        });
        offset += 1;
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoreData();
    return () => {
      isMounted = false;
    };
  }, [inView]);

  if (error) {
    return <Spinner />;
  }
  if (loading) {
    return <Spinner />;
  }

  const { launchesPast } = data;

  return (
    <>
      {[...launchesPast].map((rocket) => {
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
          />
        );
      })}
      {hasMore && <Spinner ref={ref} />}
    </>
  );
};

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Wrapper>
        <TopBar />
        <Content>{launches()}</Content>
      </Wrapper>
    </>
  );
};
export default Home;
