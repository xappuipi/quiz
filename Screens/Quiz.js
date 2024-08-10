import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from '../Styles/styles';


class Pytanie {
  constructor(text, odp) {
    this.text = text;
    this.odp = odp;
    this.ans = "";
  }
  static create(text, odp) {
    return new Pytanie(text, odp);
  }

  dodajOdp(ans) {
    this.ans = ans;
  }
}

// const pytania = [Pytanie.create("ile to 2?", "2"), Pytanie.create("ile to 2 + 2?", "4")];


export default function QuizScr({navigation, route}) {
  const {lesson_name} = route.params;

  const [typed, setTyped] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [pytania, setPytania] = useState([]);
  const [poprawnosc, setPoprawnosc] = useState(0.0);
  const [isLoading, setIsLoadnig] = useState(true);

  useEffect(() => {
    // Zastąp 'http://your-server-ip:3000' adresem twojego serwera
    var adress = `http://192.168.100.188:3000/${lesson_name}`;
    axios.get(adress)
      .then(response => {
        // const tmp = response.data;
        // const pytania2 = tmp.map(element => createPytanie(element.pytanie, element.odpowiedz));
        // setPytania(pytania2);

        tmp = response.data;
        const pytania2 = [];
        tmp.forEach(element => {
          pytania2[pytania2.length] = Pytanie.create(element.pytanie, element.odpowiedz);
        });
        setPytania(pytania2);
        setIsLoadnig(false)
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const sprawdz2 = () => {
    let poprawnosc = 0;
    for (let i = 0; i < pytania.length; i++) {
      if (pytania[i].ans.toUpperCase().trim() === pytania[i].odp.toUpperCase().trim()) {
        poprawnosc++;
      }
    }
    setPoprawnosc((poprawnosc / pytania.length) * 100);
    
  };




  const handlePress = () => {
    if (typed.trim() !== '') {
      pytania[currentQuestionIndex].dodajOdp(typed);
      setTyped('');
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      alert('Please enter an answer');
    }
    
  }

  // useEffect(() => {
  //   if (currentQuestionIndex >= pytania.length) {
  //     // All questions have been answered, you can handle the end of the quiz here
  //     console.log("All questions answered:", answers);
  //   }
  // }, [currentQuestionIndex]);

  useEffect(()=>{
    if (!isLoading && currentQuestionIndex >= pytania.length) {
      sprawdz2();
      navigation.navigate('Result', {
        wynik: poprawnosc
      });
    }
  },  [currentQuestionIndex, pytania, navigation, poprawnosc])

  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'}

  // JSX
  return (
    <View style={styles.container}>
      <ImageBackground source={image}  resizeMode="cover" style={styles.image}>
        <View style={styles.textView}>
          {/* <Text style={styles.question}>{pytania[currentQuestionIndex].text}</Text> */}
          {pytania.length > 0 && pytania[currentQuestionIndex] && (
              <Text style={styles.textWhite}>{pytania[currentQuestionIndex].text}</Text>
          )}
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={new_text => setTyped(new_text)}
            value={typed}
           />
          <Button
            title='Kliknij'
            onPress={handlePress}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
