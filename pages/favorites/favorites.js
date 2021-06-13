import Head from "next/head";
import { useContext } from "react";
import styled from "styled-components";
import Launch from "../../shared/components/Launch";

import TopBar from "../../shared/components/TopBar";
import { FavoriteContext } from "../../shared/contexts/FavoriteContext/FavoriteContext";

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

const launches = () => {
  const { favoriteList } = useContext(FavoriteContext);
  return (
    <>
      {[...favoriteList].map((rocket) => {
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
    </>
  );
};
const Favorites = () => {
  return (
    <>
      <Head>
        <title>Favorites</title>
      </Head>
      <Wrapper>
        <TopBar />
        <Content>{launches()}</Content>
      </Wrapper>
    </>
  );
};
export default Favorites;
