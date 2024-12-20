import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import UserCard from '../../components/UserCard';

interface HomeScreenProps {
  users: any;
  isFavorite: (user: {
    id: {
      value: any;
    };
  }) => any;
  handleLoadMore: () => void;
  handleRefresh: () => void;
  handleAdd: (item: any) => void;
}

const HomeScreen = (props: HomeScreenProps) => {
  return (
    <FlatList
      data={props.users}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <UserCard
          user={item}
          isFavorite={false}
          onToggleFavorite={() => props.handleAdd(item)}
        />
      )}
      onEndReached={props.handleLoadMore}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={props.handleRefresh} />
      }
    />
  );
};

export default HomeScreen;
