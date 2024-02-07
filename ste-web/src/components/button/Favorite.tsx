import React from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../store/configureStore";
import { useFavorite } from "../../store/reducers/favoriteReducer";
import {
  delete_favorite,
  save_favorite,
} from "../../store/apis/users/API_Favorite";
import { useAuthState } from "../../hooks/useAuth";
import LoginVerificationModal from "../modals/LoginVerificationModal";

export type FavoriteIconProps = {
  size?: number;
  symbol?: string;
  verifySign?: boolean;
};

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  symbol,
  verifySign = false,
  size = 25,
}) => {
  const isLogin: boolean = useAuthState();
  const isFavorite: boolean = useFavorite(symbol);
  const dispatch = useAppDispatch();
  const disclosure = useDisclosure();

  const handlerOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!symbol) return;
    if (isLogin) {
      if (isFavorite) {
        dispatch(delete_favorite(symbol.trim()));
      } else {
        dispatch(save_favorite(symbol.trim()));
      }
    } else {
      if (verifySign) disclosure.onOpen();
    }
  };

  return (
    <>
      <IconButton
        variant="unStyled"
        aria-label="favorite"
        onClick={handlerOnClick}
        color={isFavorite ? "StarOn" : "StarOff"}
      >
        <StarIcon w={`${size}px`} h={`${size}px`} opacity={1} />
      </IconButton>
      {verifySign && !isLogin && (
        <LoginVerificationModal disclosure={disclosure} />
      )}
    </>
  );
};
export default FavoriteIcon;
