import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icons from '../assets/icons';

type UserCardProps = {
  user: {
    id: {value: string | null};
    name: {first: string; last: string};
    email: string;
    picture: {thumbnail: string};
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <SafeAreaView style={styles.card}>
      <Image source={{uri: user?.picture?.thumbnail}} style={styles.image} />
      <View style={styles.info}>
        <Text>{`${user?.name.first} ${user?.name?.last}`}</Text>
        <Text>{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={onToggleFavorite}>
        <Image
          source={isFavorite ? Icons.STAR : Icons.FAVORITE}
          style={styles.starImage}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  starImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default UserCard;
