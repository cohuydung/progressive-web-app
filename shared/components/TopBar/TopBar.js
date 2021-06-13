import Link from "next/link";
import styled from "styled-components";

const Navigation = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const NavigationLabel = styled.a`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.15em;

  display: inline-block;
  padding: 5px 20px;
  position: relative;
  cursor: pointer;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #fff;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover&:after {
    width: 100%;
    left: 0;
  }
`;

const Logo = styled.img`
  height: 100%;
  width: auto;
`;

const LogoWrapper = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: fixed;
  position: relative;
  z-index: 1;
  background-image: url("https://wallpaperaccess.com/full/17520.jpg");
  border-bottom: 1px solid #dbdbdb;
`;

const TopBar = () => {
  return (
    <ContentWrapper>
      <Content>
        <Link href="/">
          <LogoWrapper>
            <Logo src="/logos/spacex-logo.png" />
          </LogoWrapper>
        </Link>
        <Navigation>
          <Link href="/">
            <NavigationLabel>Home</NavigationLabel>
          </Link>
          <Link href="/favorites">
            <NavigationLabel>Favorites</NavigationLabel>
          </Link>
        </Navigation>
      </Content>
    </ContentWrapper>
  );
};

export default TopBar;
