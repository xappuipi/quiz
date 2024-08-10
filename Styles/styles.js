import react from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        color: 'white',
        alignItems: 'center',
        justifyContent: 'top',
        margin: '10',
        paddingTop: 50,
      },
      textWhite: {
        color: 'white',
        fontSize: "18px",
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