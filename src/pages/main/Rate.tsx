import styled from "styled-components";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";
import { useMemo, useRef, useState } from "react";
import { getUserInfo } from "@/api/home/home.api";
import { useQuery } from "@tanstack/react-query";
import DonutChart from "@/components/main/DonutChart";
import { Record } from "@/types/Record";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { getFairyImg } from "@/utils/getFairyImg";
import saveAs from "file-saver";
import { toPng } from "html-to-image";
import { sendGaEvent } from "@/utils/sendGaEvent";
import { usePopup } from "@/hooks/usePopup";

const Rate = () => {
  const rateRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [imgChange, setImgChange] = useState<boolean>(true);
  const { teamId } = useAuthStore();
  const { data } = useQuery<Record>({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });
  const { renderPopup, openPopup, closePopup } = usePopup();

  const winPercentage = useMemo(() => {
    if (data && data.total > 0) {
      return ((data.win / data.total) * 100).toFixed(2);
    }
    return "0.00";
  }, [data]);
  const cancelPopup = () => {
    openPopup({
      title: "실패",
      message: "이미지 저장 및 공유에 실패했습니다.",
      buttons: [
        {
          label: "확인",
          variant: "cancel",
          onClick: closePopup,
        },
      ],
    });
  };
  const cancelPopup2 = () => {
    openPopup({
      title: "실패",
      message: "이미지 저장 및 공유에 실패했습니다.2",
      buttons: [
        {
          label: "확인",
          variant: "cancel",
          onClick: closePopup,
        },
      ],
    });
  };
  const cancelPopup3 = () => {
    openPopup({
      title: "실패",
      message: "이미지 저장 및 공유에 실패했습니다.3",
      buttons: [
        {
          label: "확인",
          variant: "cancel",
          onClick: closePopup,
        },
      ],
    });
  };
  const handleShare = async () => {
    sendGaEvent("승률페이지", "이미지 저장 버튼 클릭", "이미지 저장 버튼");

    if (!rateRef.current) return;

    try {
      let dataUrl = "";
      let i = 0;
      const maxAttempts = 10;
      let isValidImage = false;

      while (i < maxAttempts) {
        dataUrl = await toPng(rateRef.current, {
          cacheBust: true,
          backgroundColor: "white",
          style: { margin: "0", padding: "0" },
          filter: (node) => {
            if (node.classList?.contains("button-group")) return false;
            if (node.tagName === "svg") return false;
            return true;
          },
        });

        // Blob으로 변환 후 크기 확인
        const blob = await (await fetch(dataUrl)).blob();
        if (blob.size >= 200 * 1024) {
          isValidImage = true;

          // ✅ 인스타그램 공유 기능 추가
          const file = new File([blob], "instagram-story.png", {
            type: "image/png",
          });

          if (navigator.share) {
            try {
              await navigator.share({
                title: "인스타그램에 공유하기",
                text: "이미지를 공유합니다!",
                files: [file],
              });
              return;
            } catch (shareError) {
              console.error("이미지 공유 실패:", shareError);
            }
          }

          break;
        }

        i += 1;
      }

      if (!isValidImage) {
        console.error("이미지 크기가 너무 작아서 저장되지 않았습니다.");
        cancelPopup();
      }
    } catch (error) {
      console.error("이미지 저장 및 공유에 실패했습니다.", error);
      cancelPopup();
    }
  };
  const handleDownload = async () => {
    sendGaEvent("승률페이지", "이미지 저장 버튼 클릭", "이미지 저장 버튼");

    if (!rateRef.current) return;

    try {
      let dataUrl = "";
      let i = 0;
      const maxAttempts = 10;
      let isValidImage = false;

      while (i < maxAttempts) {
        dataUrl = await toPng(rateRef.current, {
          cacheBust: true,
          backgroundColor: "white",
          style: { margin: "0", padding: "0" },
          filter: (node) => {
            if (node.classList?.contains("button-group")) return false;
            if (node.tagName === "svg") return false;
            return true;
          },
        });

        // Blob으로 변환 후 크기 확인
        const blob = await (await fetch(dataUrl)).blob();
        if (blob.size >= 200 * 1024) {
          isValidImage = true;

          // ✅ 파일 다운로드 기능 추가
          saveAs(blob, "rate-image.png");

          break;
        }

        i += 1;
      }

      if (!isValidImage) {
        console.error("이미지 크기가 너무 작아서 저장되지 않았습니다.");
        cancelPopup2();
      }
    } catch (error) {
      console.error("이미지 저장에 실패했습니다.", error);
      cancelPopup3();
    }
  };
  const handleKakaoShare = async () => {
    if (!rateRef.current) {
      return;
    }
    sendGaEvent("승률페이지", "카카오톡 공유 버튼 클릭", "카카오톡 공유 버튼");
    try {
      Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "승리요정",
          description: `나의 승률: ${winPercentage}%`,
          imageUrl: getFairyImg(parseInt(winPercentage, 10), teamId, "png"),
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "앱에서 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } catch (error) {
      console.error("카카오톡 공유에 실패했습니다.", error);
    }
  };

  return (
    <RateContainer ref={rateRef}>
      {renderPopup()}
      <div>
        <MyRate>
          <MyRateButton
            type='button'
            className='my-rate-button'
            onClick={() => {
              sendGaEvent("승률페이지", "내 승률 버튼 클릭", "내 승률 버튼");
              navigate("/DetailRate", { state: { datas: data } });
            }}>
            <Text variant='title_02'>내 승률</Text>
            <Icon icon='IcArrowRight' fill='var(--gray-900)' />
          </MyRateButton>
          <div
            role='button'
            tabIndex={0}
            onClick={() => {
              sendGaEvent("승률페이지", "스위치 버튼 클릭", "스위치 버튼");
              setImgChange(!imgChange);
            }}>
            <Text variant='display'>
              {winPercentage}
              <Text variant='headline'>%</Text>
            </Text>
            <Icon icon='IcSwitch' fill='var(--gray-900)' />
          </div>
          <Text variant='subtitle_03'>
            {data?.total}전 {data?.win}승 {data?.lose}패 {data?.tie}무
          </Text>
        </MyRate>
        <hr />
        {imgChange ? (
          <div className='img'>
            <img
              className='fairy-img'
              alt='요정'
              src={getFairyImg(parseInt(winPercentage, 10), teamId, "webp")}
              crossOrigin='anonymous'
            />
          </div>
        ) : data ? (
          <DonutChart record={data} />
        ) : (
          <p>No data available</p>
        )}
      </div>
      <ButtonGroup className='button-group'>
        <button
          type='button'
          onClick={handleDownload}
          style={{ cursor: "pointer" }}>
          <Icon icon='IcDownload' fill='var(--gray-900)' />
          <Text variant='title_01'>이미지 저장</Text>
        </button>
        <button
          type='button'
          onClick={handleShare}
          style={{ cursor: "pointer" }}>
          <Icon icon='IcShare' fill='var(--gray-900)' />
          <Text variant='title_01'>공유하기</Text>
        </button>
      </ButtonGroup>
    </RateContainer>
  );
};
const RateContainer = styled.div`
  background-image: url("/ticket.webp");
  background-size: 330px 494px;
  background-color: white;
  width: 330px;
  height: 494px;
  margin: 0 auto;
  box-sizing: border-box;

  .img {
    border: none;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 8px;
    margin-top: 10px;
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  hr {
    margin-top: 10px;
    width: 80%;
    border: 1px dashed var(--gray-200);
  }
`;

const MyRate = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 8px;
  padding-top: 24px;

  > div {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
  }
  :nth-child(3) {
    padding: 0 12px;
  }
`;
const MyRateButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: var(--white);
  padding: 0 12px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  margin-top: 4px;
  padding: 0px 20px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    background-color: var(--white);

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export default Rate;
