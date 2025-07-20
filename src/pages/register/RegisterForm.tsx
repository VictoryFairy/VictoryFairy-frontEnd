import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Game, GameResultType } from "@/types/Game";
import { postRegisterGame } from "@/api/register/register";
import { usePopup } from "@/hooks/usePopup";
import GameListItem from "@/components/common/GameListItem";
import styled from "styled-components";
import { uploadImg } from "@/utils/uploadImg";
import RegisterFormFields from "@/components/register/RegisterFormFields";
import { sendGaEvent } from "@/utils/sendGaEvent";
import { isCanceledGame } from "@/utils/isCanceledGame";

/**
 * 직관 기록 등록 폼 컴포넌트
 * 일반 경기와 더블헤더 경기 모두 지원
 * 더블헤더의 경우 첫 번째 경기 완료 후 두 번째 경기로 자동 이동
 */
const RegisterForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openPopup, renderPopup, closePopup } = usePopup();

  // location.state에서 경기 정보 추출
  const {
    match,
    doubleHeader,
    currentGameIndex = 0,
    totalGames = 1,
  } = (location.state as {
    match: Game;
    doubleHeader?: Game[];
    currentGameIndex?: number;
    totalGames?: number;
  }) || {};

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  // 더블헤더 여부 확인
  const isDoubleHeader = doubleHeader && doubleHeader.length > 1;

  // 현재 경기가 마지막 경기인지 확인
  const isLastGame = currentGameIndex === totalGames - 1;

  /**
   * 직관 기록 등록 mutation
   */
  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!match) {
        throw new Error("경기 정보가 없습니다.");
      }

      // 구글 애널리틱스 이벤트 전송
      sendGaEvent(
        "직관 기록 페이지",
        "직관 기록 하기 완료",
        "직관 기록 하기 버튼",
      );

      // 폼에서 입력받은 데이터 추출
      const { img, seat, review, cheeringTeamId } = data;

      // 이미지가 있으면 서버에 업로드, 없으면 null
      const image = img ? await uploadImg(img, "registered-game") : null;

      // 서버에 보낼 데이터 구성
      const registerData = {
        gameId: match.id, // 경기 ID
        image, // 업로드된 이미지 URL
        seat, // 좌석 정보
        review, // 직관 후기
        cheeringTeamId, // 응원한 팀 ID
      };

      // 서버에 직관 기록 저장
      return await postRegisterGame(registerData);
    },
    onSuccess: () => {
      /**
       * 등록 완료 후 처리 로직
       * - 더블헤더이고 첫 번째 경기인 경우: 두 번째 경기로 이동
       * - 그 외의 경우: 홈으로 이동
       */
      if (isDoubleHeader && !isLastGame) {
        // 더블헤더의 첫 번째 경기 완료 시
        openPopup({
          title: "직관 기록 완료",
          message: "직관 기록이 성공적으로 완료되었습니다.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: () => {
                closePopup(); // 팝업 닫기
                reset(); // 폼의 모든 입력값 초기화 (다음 경기를 위해)

                // 다음 경기(두 번째 경기)로 이동
                navigate("/register", {
                  state: {
                    match: doubleHeader![currentGameIndex + 1], // 다음 경기 정보
                    doubleHeader, // 전체 더블헤더 정보 유지
                    currentGameIndex: currentGameIndex + 1, // 인덱스 증가
                    totalGames, // 총 경기 수 유지
                  },
                });
              },
            },
          ],
        });
      } else {
        // 일반 경기이거나 더블헤더의 마지막 경기 완료 시
        openPopup({
          title: "직관 기록 완료",
          message: "직관 기록이 성공적으로 완료되었습니다.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: () => {
                window.location.href = "/home"; // 홈페이지로 이동
              },
            },
          ],
        });
      }
    },
    onError: (error: Error) => {
      openPopup({
        title: "직관 기록 실패",
        message: error.message || "알 수 없는 오류가 발생했습니다.",
        buttons: [{ label: "확인", variant: "confirm", onClick: closePopup }],
      });
    },
  });

  if (!match) {
    return <div>경기 정보가 없습니다.</div>;
  }

  const matchId = match.id;

  /**
   * 폼 제출 시 실행되는 함수
   */
  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };

  /**
   * 사용자가 선택한 응원팀과 경기 결과를 바탕으로 승/무/패 결과를 계산하는 함수
   * @returns "Win" | "Lose" | "Tie" | "No game" | null
   */
  const getResult = (): GameResultType => {
    // 응원팀을 선택하지 않았는지 확인
    const isCheeringTeamNotSelected = () => {
      return watch("cheeringTeamId") === undefined;
    };

    // 경기가 무승부인지 확인
    const isScoreTie = () => {
      return match.homeTeamScore === match.awayTeamScore;
    };

    // 경기가 취소되었거나 우천취소인 경우
    if (isCanceledGame(match.status)) {
      return "No game";
    }

    // 응원팀을 아직 선택하지 않은 경우
    if (isCheeringTeamNotSelected()) {
      if (isScoreTie()) {
        return "Tie"; // 무승부면 Tie 표시
      }
      return null; // 승부가 나지 않았으면 null
    }

    // 경기 상태에 따른 결과 판단
    switch (match.status) {
      case "경기전":
      case "경기중":
        return null; // 아직 경기가 끝나지 않음

      case "경기종료":
        // 승리팀이 정해진 경우
        if (match.winningTeam) {
          return match.winningTeam.id === watch("cheeringTeamId")
            ? "Win" // 내가 응원한 팀이 이김
            : "Lose"; // 내가 응원한 팀이 짐
        }

        // 점수가 없는 경우 (경기 취소 등)
        if (!match.homeTeamScore && !match.awayTeamScore) {
          return "No game";
        }

        // 무승부인 경우
        if (isScoreTie()) {
          return "Tie";
        }

        return null;

      default:
        return null;
    }
  };

  return (
    <RegisterFormContainer>
      <GameListItem
        result={getResult() || null}
        status={match.status}
        isWinningTeam={match.winningTeam}
        homeTeam={match.homeTeam}
        homeTeamScore={match.homeTeamScore}
        awayTeam={match.awayTeam}
        awayTeamScore={match.awayTeamScore}
        date={match.date}
        time={match.time}
        stadium={match.stadium}
      />
      <hr className='divider' />
      <RegisterFormFields
        onSubmit={handleSubmit(onSubmit)}
        watch={watch}
        register={register}
        setValue={setValue}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        isReviewValid={!!formState.errors.review}
        clearErrors={clearErrors}
        matchId={matchId}
        isPending={registerMutation.isPending}
      />

      {renderPopup()}
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = styled.div`
  padding-bottom: 80px;
  .match {
    border: none;
  }

  .divider {
    height: 16px;
    margin: 0px -20px;
    background-color: #efefef;
    border: none;
  }
`;

export default RegisterForm;
