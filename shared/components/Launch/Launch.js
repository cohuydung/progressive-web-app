import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { FavoriteContext } from "../../contexts/FavoriteContext/FavoriteContext";
import Swal from "sweetalert2";

const ContentWrapper = styled.div`
  flex: 0 0 20%;
  min-height: 500px;
  min-width: 400px;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: row;
  border: 3px solid black;
  border-radius: 15px;
  margin: 25px;
  > * {
    font-weight: bold;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Body = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 50px;
  width: 100%;
  justify-content: center;
  border-bottom: 3px solid black;
  > * {
    padding: 5px 0px;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NameLabel = styled.div`
  padding-left: 5px;
  font-weight: bold;
  font-size: 14px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  border-top: 3px solid black;
  justify-content: center;
  text-align: center;
  > * {
    padding: 5px 5px;
  }
`;

const UserIcon = styled.div`
  align-items: center;
  background-color: black;
  border: 1px solid gray;
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 2rem;
  justify-content: center;
  width: 2rem;
  /* margin-right: 2rem; */
`;

const toLocalTime = (input) => {
  var date = new Date(input);
  return date.toString();
};

const getAllCapitalLetters = (input = "") => {
  let newmsg = input.replace(/[a-z]/g, "").replace(" ", "");
  let old = input.replace(/[A-Z]/g, "");
  return newmsg;
};

const Launch = ({ rocket, imgSrc, rocketName, missonName, detail = false }) => {
  const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

  const updateFavoriteList = (rocket) => {
    if (favoriteList.length >= 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The favorites have reached their limit!",
      });
    } else {
      setFavoriteList((list) => {
        return list.some((r) => r.id === rocket.id)
          ? list.filter((r) => r.id !== rocket.id)
          : [...list, rocket];
      });
    }
  };

  return (
    <>
      <ContentWrapper>
        <Content>
          <Header>
            <Name>
              <UserIcon>
                {getAllCapitalLetters(rocketName).substring(0, 2)}
              </UserIcon>
              <NameLabel>{missonName}</NameLabel>
            </Name>
          </Header>
          <Link href={`/detail/${rocket.id}`}>
            <Body>
              {imgSrc ? (
                <img src={imgSrc} width="85%" />
              ) : (
                <img
                  src={
                    "https://cdn.iconscout.com/icon/free/png-512/nasa-282190.png"
                  }
                  width="90%"
                />
              )}
            </Body>
          </Link>
          <Bottom>
            <FontAwesomeIcon
              size="2x"
              icon={faFireAlt}
              color={
                favoriteList.some((r) => r.id === rocket.id)
                  ? "#e22822"
                  : "#dbdbdb"
              }
              onClick={() => updateFavoriteList(rocket)}
            />
          </Bottom>
        </Content>
      </ContentWrapper>
      {detail && (
        <ContentWrapper>
          <Content>
            <Header>
              <Name>
                <NameLabel>Infomation Detail</NameLabel>
              </Name>
            </Header>
            <Body>
              <p style={{ padding: "25px" }}>
                Rocket Name: {rocket.rocket.rocket_name}
                <br />
                <br />
                Detail: {rocket.details}
              </p>
            </Body>
            <Bottom>
              <p>{toLocalTime(rocket.launch_date_utc)}</p>
            </Bottom>
          </Content>
        </ContentWrapper>
      )}
      {detail &&
        rocket.links.flickr_images.map((imgSrc, index) => {
          return (
            <ContentWrapper>
              <Content>
                <Header>
                  <Name>
                    <NameLabel>Infomation Detail</NameLabel>
                  </Name>
                </Header>
                <Body>
                  <img
                    src={imgSrc}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Body>
                <Bottom>
                  <p>{index + 1}</p>
                </Bottom>
              </Content>
            </ContentWrapper>
          );
        })}
    </>
  );
};

export default Launch;
