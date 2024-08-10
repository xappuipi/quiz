import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { styles } from '../Styles/styles';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'}

function HomeScreen({navigation}) {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.100.188:3000/lessons')  // Użyj swojego adresu IP
          .then(response => {
            setLessons(response.data);  // Ustaw nazwy kolekcji w stanie
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    return (
        <View>
            <FlatList
                data={lessons}  // Przekaż dane do FlatList
                keyExtractor={(item) => item}  // Użyj nazwy kolekcji jako klucz
                renderItem={({ item }) => (
                  <Button onPress={() => navigation.navigate('Quiz', {
                    lesson_name: item
                  })}
                    title = {item}  // Wyświetl nazwę kolekcji
                />
                )}
            />
        </View>
    );
}

export default HomeScreen;