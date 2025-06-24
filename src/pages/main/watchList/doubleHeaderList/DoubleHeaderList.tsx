import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import GameListItem from "@/components/common/GameListItem";
import { MyGame } from "@/types/Game";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text";

const DoubleHeaderList = () => {
  const { doubleHeaderMatches } = useLocation().state;
  const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <div>
          <Icon icon='IcArrowLeft' onClick={() => navigate(-1)} />
        </div>
        <div>
          <Text variant='headline'>{`${doubleHeaderMatches[0].game.date.replace(
            /-/g,
            ".",
          )} 경기`}</Text>
        </div>
        {/* 빈 Div 추가 */}
        <div />
      </Header>
      <DoubleHeaderListContainer>
        <GameList>
          {doubleHeaderMatches.map((match: MyGame) => (
            <GameListItem
              key={match.id}
              result={match.status}
              onClick={() => navigate(`/detail/${match.id}`)}
              isWinningTeam={match.game.winningTeam}
              homeTeam={match.game.homeTeam}
              homeTeamScore={match.game.homeTeamScore}
              awayTeam={match.game.awayTeam}
              awayTeamScore={match.game.awayTeamScore}
              date={match.game.date}
              stadium={match.game.stadium}
              status={match.game.status}
              time={match.game.time}
            />
          ))}
        </GameList>
      </DoubleHeaderListContainer>
    </Layout>
  );
};
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  position: relative;
  padding: 20px;
`;
const DoubleHeaderListContainer = styled.div``;

const Header = styled.div`
  height: 64px;
  top: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  z-index: 1;
`;

const GameList = styled.ul`
  width: 100%;
  margin: 0;
`;
export default DoubleHeaderList;
