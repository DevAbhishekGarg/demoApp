import React, {useEffect} from 'react';
import HomeScreen from '../views/home/HomeScreen';
import {fetchUsers} from '../redux/slice/userSlice';
import {addFavorite} from '../redux/slice/userSlice';
import {useAppDispatch, useAppSelector} from '../hooks/useAppHooks';

const HomeViewModel = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state?.users?.users);

  const favorites = useAppSelector(state => state?.favorites?.favorites);

  const isFavorite = (user: {id: {value: any}}) =>
    favorites?.some(
      (fav: {id: {value: any}}) => fav?.id?.value === user?.id?.value,
    );

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchUsers(users.length / 10 + 1));
  };

  const handleRefresh = () => {
    dispatch(fetchUsers(1));
  };

  const handleAdd = (item: any) => {
    dispatch(addFavorite(item));
  };

  return (
    <HomeScreen
      {...{
        users,
        isFavorite,
        handleLoadMore,
        handleRefresh,
        handleAdd,
      }}
    />
  );
};

export default HomeViewModel;
