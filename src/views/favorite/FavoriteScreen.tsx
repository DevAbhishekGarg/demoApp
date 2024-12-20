import React from 'react';
import {FlatList, Text, View} from 'react-native';
import UserCard from '../../components/UserCard';
import {styles} from './styles';

interface FavoriteScreenProps {
  favorites: any;
  handleRemoveFromFavorites: (item: any) => void;
}

const FavoriteScreen = (props: FavoriteScreenProps) => {
  if (props.favorites?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites added yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={props.favorites}
      keyExtractor={item => item?.id?.value}
      renderItem={({item}) => (
        <UserCard
          user={item}
          isFavorite={true}
          onToggleFavorite={() => props.handleRemoveFromFavorites(item)}
        />
      )}
    />
  );
};

export default FavoriteScreen;
