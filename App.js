import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import axios from 'axios';

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


export default function App() {
  const [typed, setTyped] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [pytania, setPytania] = useState([]);

  useEffect(() => {
    // Zastąp 'http://your-server-ip:3000' adresem twojego serwera
    axios.get('http://192.168.100.188:3000/test')
      .then(response => {
        tmp = response.data;
        const pytania2 = [];
        tmp.forEach(element => {
          pytania2[pytania2.length] = Pytanie.create(element.pytanie, element.odpowiedz);
        });
        setPytania(pytania2);
        setAnswers("10");
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const sprawdz2 = () => {
    let poprawnosc = 0;
    for (let i = 0; i < pytania.length; i++) {
      if (pytania[i].ans.toUpperCase() === pytania[i].odp.toUpperCase()) {
        poprawnosc++;
      }
    }

    return (poprawnosc / pytania.length) * 100;
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

  useEffect(() => {
    if (currentQuestionIndex >= pytania.length) {
      // All questions have been answered, you can handle the end of the quiz here
      console.log("All questions answered:", answers);
    }
  }, [currentQuestionIndex]);

  const image_result = {uri: 'https://image.emojipng.com/8/12276008.jpg'}

  if (currentQuestionIndex >= pytania.length) {
    return (
      <View style={styles.container}>
        <ImageBackground source={image}  resizeMode="cover" style={styles.image}>
          <Image></Image>
          <Text style={styles.question}>Twoja dokładność: {sprawdz2()}%</Text>
          {/* sprawdz2() */}
        </ImageBackground>
      </View>
    );
  }

  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'}

  // JSX
  return (
    <View style={styles.container}>
      <ImageBackground source={image}  resizeMode="cover" style={styles.image}>
        <View style={styles.textView}>
          <Text style={styles.question}>{pytania[currentQuestionIndex].text}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  textView: {
    flex: 1,
    width: '100%',
    
    alignItems: 'center',
    justifyContent: 'top',
    margin: '10',
    paddingTop: 50,
  },
  inputView: {
    flex: 2, // Reduced flex value
    alignItems: 'center',
    justifyContent: 'flex-start',
         // Align content to the start
     // Added margin to move content down
    
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#2697B6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    overflow: 'hidden',
    color: '#fff',
    fontSize: 12,
  },
  question: {
    borderColor: 'black',
    backgroundColor: '#2697B6',
    borderRadius: 10,
    padding: 30,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  },
});
