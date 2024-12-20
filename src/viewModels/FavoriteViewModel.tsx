import React from 'react';
import FavoriteScreen from '../views/favorite/FavoriteScreen';
import {useAppDispatch, useAppSelector} from '../hooks/useAppHooks';
import {removeFavorite} from '../redux/slice/userSlice';

const FavoriteViewModel = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state?.favorites?.favorites);

  const handleRemoveFromFavorites = (item: any) => {
    dispatch(removeFavorite(item));
  };

  return <FavoriteScreen {...{favorites, handleRemoveFromFavorites}} />;
};

export default FavoriteViewModel;
